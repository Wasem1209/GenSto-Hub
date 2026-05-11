import NextAuth, { DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/User";
import connectDB from "@/lib/mongodb";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            role: string;
            isVerified: boolean;
        } & DefaultSession["user"]
    }
}

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
    },
    callbacks: {
        async signIn({ user }) {
            try {
                await connectDB();
                if (!user?.email) return false;

                const existingUser = await User.findOne({ email: user.email.toLowerCase() });

                if (!existingUser) {
                    await User.create({
                        name: user.name,
                        email: user.email.toLowerCase(),
                        image: user.image,
                        role: "regular",
                        isVerified: true,
                    });
                } else if (!existingUser.isVerified) {
                    existingUser.isVerified = true;
                    await existingUser.save();
                }
                return true;
            } catch (error) {
                console.error("NextAuth SignIn Error:", error);
                return false;
            }
        },

        async jwt({ token, user, trigger, session }) {
            // Initial sign in: Fetch user details from DB
            if (user) {
                try {
                    await connectDB();
                    const dbUser = await User.findOne({ email: user.email?.toLowerCase() });
                    if (dbUser) {
                        token.role = dbUser.role;
                        token.id = dbUser._id.toString();
                        token.isVerified = dbUser.isVerified;
                    }
                } catch (error) {
                    console.error("JWT Initial Signin Error:", error);
                }
            }

            // Handle manual session updates 
            if (trigger === "update" && session?.user) {
                return { ...token, ...session.user };
            }

            // Periodic refresh of verification status if not already verified
            if (token.email && !token.isVerified) {
                try {
                    await connectDB();
                    const dbUser = await User.findOne({ email: (token.email as string).toLowerCase() });
                    if (dbUser?.isVerified) {
                        token.isVerified = true;
                    }
                } catch (e) {
                    console.error("JWT Periodic Check Error:", e);
                }
            }

            return token;
        },

        async session({ session, token }) {
            if (session.user && token) {
                session.user.role = token.role as string;
                session.user.id = token.id as string;
                session.user.isVerified = token.isVerified as boolean;
            }
            return session;
        },

        async redirect({ url, baseUrl }) {
            // If the url is the sign-in page, go to the default dashboard
            if (url.includes("/signin")) return `${baseUrl}/regular/dashboard`;
            // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`;
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url;
            return baseUrl;
        },
    },
    pages: {
        signIn: '/signin',
        error: '/auth/error',
    },
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
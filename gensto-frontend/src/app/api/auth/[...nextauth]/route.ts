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
    },
    callbacks: {
        async signIn({ user }) {
            try {
                await connectDB();
                if (!user?.email) return false;

                const existingUser = await User.findOne({ email: user.email });

                if (!existingUser) {
                    await User.create({
                        name: user.name,
                        email: user.email,
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
            // Initial sign in
            if (user) {
                await connectDB();
                const dbUser = await User.findOne({ email: user.email });
                if (dbUser) {
                    token.role = dbUser.role;
                    token.id = dbUser._id.toString();
                    token.isVerified = dbUser.isVerified;
                }
            }

            // Handle manual session updates 
            if (trigger === "update" && session?.user) {
                return { ...token, ...session.user };
            }

            // Periodic database check to keep verification status fresh
            if (token.email && !token.isVerified) {
                await connectDB();
                const dbUser = await User.findOne({ email: token.email });
                if (dbUser?.isVerified) {
                    token.isVerified = true;
                }
            }

            return token;
        },

        async session({ session, token }) {
            if (session.user) {
                session.user.role = token.role as string;
                session.user.id = token.id as string;
                session.user.isVerified = token.isVerified as boolean;
            }
            return session;
        },
    },
    pages: {
        signIn: '/signin',
        error: '/auth/error',
    },
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
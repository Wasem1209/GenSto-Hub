import NextAuth, { DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/User";
import connectDB from "@/lib/mongodb";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            role: string;
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
    callbacks: {
        // Removed 'account' and 'profile' since they weren't being used
        async signIn({ user }) {
            try {
                await connectDB();

                if (!user?.email) {
                    console.error("SignIn Error: No email provided by Google");
                    return false;
                }

                const existingUser = await User.findOne({ email: user.email });

                if (!existingUser) {
                    await User.create({
                        name: user.name,
                        email: user.email,
                        image: user.image,
                        role: "regular",
                        isVerified: true,
                    });
                    console.log(`New user created: ${user.email}`);
                } else {
                    console.log(`Existing user logged in: ${user.email}`);
                }

                return true;
            } catch (error) {
                console.error("NextAuth SignIn Callback Error:", error);
                return false;
            }
        },

        // Removed 'trigger' and 'session' from the parameters here
        async jwt({ token, user }) {
            if (user) {
                try {
                    await connectDB();
                    const dbUser = await User.findOne({ email: user.email });
                    if (dbUser) {
                        token.role = dbUser.role;
                        token.id = dbUser._id.toString();
                    }
                } catch (error) {
                    console.error("JWT Callback Error:", error);
                }
            }
            return token;
        },

        async session({ session, token }) {
            if (session.user) {
                session.user.role = token.role as string;
                session.user.id = token.id as string;
            }
            return session;
        },
    },
    pages: {
        signIn: '/signin',
        error: '/auth/error',
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === 'development',
});

export { handler as GET, handler as POST };
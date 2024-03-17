import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
            httpOptions: {
                timeout: 10000
            }
        })
    ],
    callbacks: {
        async session({ session, user }) {
            if (user.id && session?.user) {
                session.user.email = user.id;
            }
            console.log(session)
            return session;
        }
    }
};
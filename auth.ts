import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";
import { profile } from "console";

export const config = {
    theme: {
        logo: "https://next-auth.js.org/img/logo/logo-sm.png",
    },
    providers: [
        Github({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        })
    ],
    basePath: "/api/auth",
    callbacks: {
        session({ session, token, user }) {
            session.sessionToken = token.accessToken as string
            // session.userId = user.id
            return session
        },
        authorized({ request, auth }) {
            const { pathname } = request.nextUrl
            if (pathname === "/middleware-example") return !!auth
            return true
        },
        jwt({ token, account, trigger, session }) {
            if (account) {
                token.accessToken = account.access_token
            }
            if (trigger === "update") token.name = session.user.name
            return token
        }
    }
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)
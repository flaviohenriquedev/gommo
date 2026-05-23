import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { apiFetch, setAuthToken } from "@/shared/lib/api.client";

class TokenResponse {
  accessToken!: string;
  refreshToken!: string;
  tokenType!: string;
  expiresInSeconds!: number;
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: "Usuário", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }
        try {
          const data = await apiFetch<TokenResponse>("/api/v1/auth/login", {
            method: "POST",
            body: {
              username: credentials.username,
              password: credentials.password,
            },
          });
          setAuthToken(data.accessToken);
          return {
            id: credentials.username as string,
            name: credentials.username as string,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          };
        } catch {
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLogin = nextUrl.pathname.startsWith("/login");
      if (isLogin) {
        return auth ? Response.redirect(new URL("/dashboard", nextUrl)) : true;
      }
      return !!auth;
    },
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      return session;
    },
  },
  trustHost: true,
});

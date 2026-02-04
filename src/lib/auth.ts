import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import Google from 'next-auth/providers/google'
import { prisma } from './db'

export const authConfig = {
  trustHost: true,
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    session: async ({ session, user }: { session: any; user: any }) => {
      if (session.user) {
        session.user.id = user.id
      }
      return session
    },
  },
  pages: {
    signIn: '/',
  },
}

export const { handlers, auth } = NextAuth(authConfig)

import NextAuth, { type NextAuthOptions, type DefaultSession } from "next-auth";
import Google from "next-auth/providers/google";
import Email from "next-auth/providers/email";
import { Resend } from 'resend';
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Email({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      sendVerificationRequest: async ({ identifier: email, url }) => {
        const resend = new Resend(process.env.RESEND_API_KEY);

        if (process.env.NODE_ENV === 'development') {
          console.log(`Login link for ${email}: ${url}`);
          return;
        }

        try {
          console.log(`Sending verification email to ${email}`);
          await resend.emails.send({
            from: 'The Start Academy <auth@thestart.academy>',
            to: email,
            subject: 'Sign in to The Start Academy',
            html: `<p>Click the magic link to sign in to your account.</p><p><a href="${url}"><b>Sign in</b></a></p>`,
          });
          console.log('Verification email sent successfully.');
        } catch (error) {
          console.error('Failed to send verification email:', error);
          throw new Error('Failed to send verification email.');
        }
      },
    }),
  ],
  session: { strategy: "jwt" as const },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (!user.email) return false;
      
      // Check if the user's email is in the allowed students list
      const isAllowed = await prisma.allowedStudent.findUnique({
        where: { email: user.email.toLowerCase() },
      });

      if (!isAllowed) {
        // Log unauthorized access attempts
        console.warn(`Unauthorized access attempt: ${user.email}`);
        return '/auth/unauthorized';
      }
      
      return true;
    },
    async redirect({ url, baseUrl }) {
      // After successful login, redirect to the external platform
      if (url.startsWith(baseUrl)) {
        // If there's a callback URL, use it
        return url;
      }
      // Default redirect to the external platform
      return 'https://tsa-platform-r129.vercel.app';
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub || '';
      }
      return session;
    },
    async jwt({ token }) {
      return token;
    },
  },
  pages: {
    signIn: '/auth',
    error: '/auth',
  },
  events: {
    async signIn(message) {
      // Log successful sign-ins
      if (message.isNewUser) {
        console.log(`New user signed in: ${message.user.email}`);
      } else {
        console.log(`User signed in: ${message.user.email}`);
      }
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

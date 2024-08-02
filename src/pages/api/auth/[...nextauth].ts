import { getProfile } from '@/common/api';
import NextAuth from 'next-auth';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: 'secret',
  },
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true, // 동일한 이메일을 가진 계정 간에 자동 연결을 허용함
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID!,
      clientSecret: process.env.NAVER_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      const userEmail = `${account?.provider}_${user.email}`;
      const userProfile = await getProfile(userEmail);

      if (userProfile) {
        return true;
      } else {
        const temporaryUserData = {
          email: user.email,
          provider: account?.provider,
          image: user.image,
        };

        // 최초로 로그인한 유저는 로그인을 중단하고 회원가입 페이지로 이동
        return '/signup';
      }
    },
    async jwt({ user, token, account }) {
      try {
        if (user && account) {
          token = { ...token, provider: account.provider };
        }
        return token;
      } catch (e: any) {
        console.error(e);
        throw new Error(e.response.data.msg);
      }
    },

    async session({ session, token }: any) {
      try {
        if (session.user && token) {
          session.user = { ...session.user, provider: token.provider };
        }
        return session;
      } catch (e: any) {
        console.error(e);
        throw new Error(e.response.data.msg);
      }
    },
  },
});

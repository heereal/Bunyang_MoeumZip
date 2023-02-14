import NextAuth from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';
import { db } from '@/common/firebase';
import {
  query,
  getDocs,
  collection,
  where,
} from 'firebase/firestore';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';

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
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID!,
      clientSecret: process.env.NAVER_CLIENT_SECRET!,
    }),
  ],
  //   callbacks: {
  //     async jwt(token, user, account, isNewUser) {
  //         // token = {...token.token.user}
  //         // console.log("token.name",token.name);
  //         return token;
  //     },
  //     async session(session: any, userOrToken: any) {
  //         // session.user.userId = userOrToken.userId;
  //         // session.user.test = userOrToken.test;
  //         return session
  //     }
  // }

  callbacks: {


    async signIn({ user }) {

      console.log(user);

      return true

    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      return baseUrl
    }
  },
  // async redirect({ token, url, baseUrl }: any) {
  //   // Allows relative callback URLs
  //   // if (url.startsWith("/")) return `${baseUrl}${url}`
  //   // // Allows callback URLs on the same origin
  //   // else if (new URL(url).origin === baseUrl) return url
  //   // return baseUrl
  // }


  // async redirect({ url, baseUrl }) {
  //   // Allows relative callback URLs
  //   if (url.startsWith("/")) return '/signUp'
  //   // Allows callback URLs on the same origin

  //   return baseUrl
  // }


},
  // pages: {
  //   signIn: 'signUp',
  //   signOut: '../../signUp',
  //   error: '/auth/error', // Error code passed in query string as ?error=
  //   verifyRequest: '/auth/verify-request', // (used for check email message)
  //   newUser: 'pages/signUp' // New users will be directed here on first sign in (leave the property out if not of interest)
  // }
);


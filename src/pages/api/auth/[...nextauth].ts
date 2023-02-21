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
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID!,
      clientSecret: process.env.NAVER_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
      //   console.log('token:', token);
        console.log('account:', account);
      }
      return { ...token, provider: account?.provider };
    },

    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      // session.provider = token.provider;
    //  console.log('session:', session);
    //  console.log('token:', token);
    return {
      ...session,provider: token.provider
      // user:{...session.user, provider: token.provider}
    };
    },
  },
});

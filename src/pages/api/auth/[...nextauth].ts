import NextAuth from 'next-auth';
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
  ],
  callbacks: {
    async signIn({ user }) {
      console.log(user);
      return true;
    },
    async redirect({ url, baseUrl }) {
      console.log('??:', baseUrl);

      return url;
    },
  },
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

  // callbacks: {
  //   async signIn({ user }) {
  //     const q = query(collection(db, 'Users'), where('id', '==', user.email));
  //     const array: any[] = [];
  //     const querySnapshot = await getDocs(q);
  //     querySnapshot.forEach((doc) =>
  //       array.push({
  //         // id: doc.id,
  //         ...doc.data(),
  //       }),
  //     );
  //     // 이미 가입했다면 바로 로그인됨
  //     if (array.length >= 1) {
  //       return true;
  //       //처음 로그인이라면 회원가입 페이지로 이동-로그인은 안 됨
  //     } else {
  //       return true;
  //     }
  //   },
  // },
});

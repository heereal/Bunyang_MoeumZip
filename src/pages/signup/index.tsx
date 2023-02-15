import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { db } from '@/common/firebase';
import {
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from 'firebase/firestore';
import { useQuery } from "react-query";
import { useRouter } from "next/router";

const SignUp = () => {

  const router = useRouter();

  // 유저의 세션 정보 받아오기
  const { data: session, status } = useSession();  
  console.log("session:", session?.user, status);

  const redirectUser = async () => {
    const array: any[] = [];

      const q = query(
        collection(db, 'Users'),
        where('userId', '==', session?.user.email),
      );
  
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) =>
        array.push({
          ...doc.data(),
        }),
      );

      const newUser = {
        userId: session?.user.email
      }
  
      if (array.length >= 1) {
        console.log('이미 가입한 유저입니다!');
        router.push('/')
      } else {
        console.log('최초 로그인 유저입니다');
        await addDoc(collection(db, 'Users'), newUser);
      }

  };

  
  // const { data: users, isLoading } = useQuery(
    //   "users", getFirestoreUsers
    // );
    // console.log('users:', users);
    
    useEffect(() => {
      if (session) {
        redirectUser()
      }
      console.log("useEffect 실행");
    }, [session])
    
    if (session === undefined) {
      return (<div>로딩 중입니다........</div>)
    }
  return <div>SignUp</div>;
};

export default SignUp;

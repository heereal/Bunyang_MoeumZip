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

const SignUp = () => {
  const [fireUsers, setfireUsers] = useState<any[]>([])

  // 유저의 세션 정보 받아오기
  const { data: session, status } = useSession();  
  console.log("session:", session?.user, status);

  const redirectUser = async (email: string) => {

    console.log("getFirestoreUsers 함수 실행됨");
    // if (status === 'authenticated') {
      const q = query(
        collection(db, 'Users'),
        where('id', '==', email),
      );
      // console.log(session.email);
  
      const array: any[] = [];
      const querySnapshot = await getDocs(q);
        const ppp = querySnapshot.forEach((doc) =>
          array.push({
            // id: doc.id,
            ...doc.data(),
          }),
        );
        // setfireUsers(array)

        if (array.length >= 1) {
          console.log('파베에 이메일 저장됨OO');
        } else {
          console.log('파베에 저장된 이메일 없음!!');
        }
        // return array;
    // }
  };

  // const { data: users, isLoading } = useQuery(
  //   "users", getFirestoreUsers
  // );
  // console.log('users:', users);


  const redirect = async () => {
    console.log("redirect 함수 실행됨");
    // await getFirestoreUsers(session.user.email);
    if (fireUsers.length >= 1) {
        console.log('파베에 이메일 저장됨OO');
      } else {
        console.log('파베에 저장된 이메일 없음!!');
      }
  };

  useEffect(() => {
    if (session) {
      redirectUser(session.user.email)
    // redirect()
    }
    // setfireUsers(array)
    console.log("useEffect 실행");
  }, [session])

  return <div>SignUp</div>;
};

export default SignUp;

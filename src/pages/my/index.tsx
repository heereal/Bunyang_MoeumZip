import { useSession } from "next-auth/react";
import { db } from '@/common/firebase';
import {
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const MyPage = () => {

  const router = useRouter();
  const [usersList, setUsersList] = useState<any[]>([])

  // 유저의 세션 정보 받아오기
  const { data: session, status } = useSession();

  // firestore에서 'Users' 데이터 볼러 옴
  const getUsersList = async () => {
    const array: any[] = [];

    const q = query(
      collection(db, 'Users'),
      where('userEmail', '==', session?.user?.email),
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) =>
      array.push({
        ...doc.data(),
      }),
    );
    setUsersList(array)
  };

  // 비로그인 유저일 경우 접근 제한
  useEffect(() => {
    if (status === "unauthenticated") router.push('/')
  }, [status])
  
  // session(유저 정보)가 들어오면 getUsersList 함수 실행
  useEffect(() => {
    if (session) getUsersList();
  }, [session])

  return (
    <>
      <div>닉네임: {usersList[0]?.userName}</div>
    </>
  )
};

export default MyPage;

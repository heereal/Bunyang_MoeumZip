import { useSession } from "next-auth/react";
import { db } from '@/common/firebase';
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const MyPage = () => {

  const router = useRouter();
  const [usersList, setUsersList] = useState<any[]>([]);
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [nickname, setNickname] = useState<any>('');
  const [email, setEmail] = useState<any>('');

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
    setNickname(usersList[0]?.userName)
    setEmail(usersList[0]?.userEmail)
  };

  // [닉네임 수정 완료] 버튼 클릭 시 작동
  const changeNicknameHandler = async () => {
    const checkNickname = usersList.find((user) => user.userName === nickname);
    if (checkNickname) {
      alert('이미 존재하는 닉네임입니다. 다시 입력해주세요.')
      return;
    }
    const updateUser = {
      userName: nickname,
    }
    await updateDoc(doc(db, 'Users', email), updateUser);
    alert('닉네임 수정 완료!')
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
      <button onClick={() => setIsInputOpen(!isInputOpen)}>닉네임 수정</button>
      {isInputOpen ? (
        <>
          <input value={nickname} onChange={(e) => setNickname(e.target.value)}/>
          <button onClick={changeNicknameHandler}>닉네임 수정 완료</button>
        </>
      
      ) : null}
    </>
  )
};

export default MyPage;

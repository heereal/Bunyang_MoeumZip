import { db } from '@/common/firebase';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const SignUp = () => {
  const router = useRouter();

  // 유저의 세션 정보 받아오기
  const { data: session, status } = useSession();
  console.log(session);

  // 현재 로그인한 유저의 정보가 firestore 'Users' collection에 존재하는지 비교함
  const redirectUser = async () => {
    const array: any[] = [];

    const q = query(
      collection(db, 'Users'),
      where('userEmail', '==', session?.user?.email),
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) =>
      array.push({
        id: doc.id,
        ...doc.data(),
      }),
    );

    const newUser = {
      userEmail: session?.user?.email,
      userName: session?.user?.name,
      userImage: session?.user?.image,
    };

    // 이미 가입한 유저라면 메인으로 이동,
    // 최초 로그인한 유저라면 firestior에 유저 정보를 새로 저장함
    if (array.length >= 1) {
      // router.push('/');
      console.log('이미 가입한 유저임');
    } else {
      console.log('최초 로그인 유저임');
      await addDoc(collection(db, 'Users'), newUser);
    }
  };

  useEffect(() => {
    // session(유저 정보)가 들어왔을 때만 함수를 실행함
    if (session) {
      redirectUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return <div>SignUp</div>;
};

export default SignUp;

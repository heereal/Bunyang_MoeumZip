import ReactModal from 'react-modal';
import * as S from './style';
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '@/common/firebase';
import {
  getCsrfToken,
  signIn,
  useSession,
  signOut,
  getProviders,
} from 'next-auth/react';
import { useEffect } from 'react';
import { db } from '@/common/firebase';
import { query, getDocs, collection, where, addDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useRouter } from 'next/router';

interface loginModalProps {
  isOpen: boolean;
}

const LoginModal = ({ isOpen }: loginModalProps) => {
  const router = useRouter();
  const [fireUsers, setfireUsers] = useState<any[]>([]);
  const googleProvider = new GoogleAuthProvider();
  //FIXME: 배포 시 파베 페북 연결 ID 수정하기
  const facebookProvider = new FacebookAuthProvider();

  // 유저의 세션 정보 받아오기
  const { data: session, status } = useSession();
  // console.log(fireUsers);
  // const session2 = getSession()

  //FIXME: any 수정
  const loginHandler2 = (provider: any) => {
    signInWithPopup(auth, provider);
  };

  // 엑세스토큰 받아오기
  const getToken = async () => {
    const csrfToken = await getCsrfToken();
    console.log(csrfToken);
  };

  const getFirestoreUsers = async (email: string) => {
    const q = query(collection(db, 'Users'), where('id', '==', email));

    const array: any[] = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) =>
      array.push({
        // id: doc.id,
        ...doc.data(),
      }),
    );
    setfireUsers(array);
  };

  const loginHandler = async (provider: string) => {
    await signIn(provider);

    // .then(async () => {
    // if (!session) return;
    // getFirestoreUsers("mika013@naver.com")

    //  이미 가입했다면 바로 로그인됨
    // if (fireUsers.length >= 1) {
    //   console.log('이미 가입했음');

    //처음 로그인이라면 회원가입 페이지로 이동
    // } else {
    //   const newUser = {
    //     // userId: session.
    //   };
    // await addDoc(collection(db, 'Users'), session?.user);
    // }
    // })

    // console.log(array);
    // if (array.length >= 1) {
    //   console.log('잘 들어옴');
    // } else {
    //   console.log('실패');
    // }
  };

  useEffect(() => {
    // getToken();
    // firebaseTest()
  }, []);

  return (
    <ReactModal isOpen={isOpen} style={customStyles} ariaHideApp={false}>
      <S.ModalContainer>
        <button onClick={() => loginHandler2(googleProvider)}>
          구글 로그인
        </button>
        <button onClick={() => loginHandler2(facebookProvider)}>
          페이스북 로그인
        </button>
        <button onClick={() => loginHandler('kakao')}>카카오 로그인</button>
        <button onClick={() => loginHandler('naver')}>네이버 로그인</button>
        <button onClick={() => signOut()}>로그아웃</button>
        {session ? (
          <div>{session.user?.name}님 로그인 환영합니다</div>
        ) : (
          <div>로그아웃 상태임</div>
        )}
      </S.ModalContainer>
    </ReactModal>
  );
};

export default LoginModal;

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    // marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

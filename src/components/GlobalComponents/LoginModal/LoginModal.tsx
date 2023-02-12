import ReactModal from 'react-modal';
import * as S from './style';
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '@/common/firebase';
import { getCsrfToken, signIn, useSession, signOut } from 'next-auth/react';
import { useEffect } from 'react';

interface loginModalProps {
  isOpen: boolean;
}

const LoginModal = ({ isOpen }: loginModalProps) => {
  const googleProvider = new GoogleAuthProvider();
  //FIXME: 배포 시 파베 페북 연결 ID 수정하기
  const facebookProvider = new FacebookAuthProvider();

  // 유저의 세션 정보 받아오기
  const { data: session, status } = useSession();
  console.log(session, status);

  //FIXME: any 수정
  const loginHandler = (provider: any) => {
    signInWithPopup(auth, provider);
  };

  // 엑세스토큰 받아오기
  const getToken = async () => {
    const csrfToken = await getCsrfToken();
    console.log(csrfToken);
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <ReactModal isOpen={isOpen} style={customStyles}>
      <S.ModalContainer>
        <button onClick={() => loginHandler(googleProvider)}>
          구글 로그인
        </button>
        <button onClick={() => loginHandler(facebookProvider)}>
          페이스북 로그인
        </button>
        <button onClick={() => signIn('kakao')}>카카오 로그인</button>
        <button onClick={() => signIn('naver')}>네이버 로그인</button>
        <button onClick={() => signOut()}>로그아웃</button>
        {session ?  <div>{session.user?.name}님 로그인 환영합니다</div> : <div>로그아웃 상태임</div>}
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

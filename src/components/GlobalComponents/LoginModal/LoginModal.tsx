import { signIn } from 'next-auth/react';
import { GrClose } from 'react-icons/gr';
import * as S from './style';

interface loginModalProps {
  setIsOpen: any;
}

const LoginModal = ({ setIsOpen }: loginModalProps) => {
  // 소셜 로그인-로그인 시 로딩 페이지로 이동함
  const loginHandler = async (provider: string) => {
    await signIn(provider, { callbackUrl: '/loading' });
  };

  return (
    <S.ModalBackground>
      <S.ModalContainer>
        <button onClick={() => loginHandler('google')}>구글 로그인</button>
        <button onClick={() => loginHandler('facebook')}>
          페이스북 로그인
        </button>
        <button onClick={() => loginHandler('kakao')}>카카오 로그인</button>
        <button onClick={() => loginHandler('naver')}>네이버 로그인</button>
        <GrClose
          size="30"
          onClick={() => setIsOpen(false)}
          style={{ cursor: 'pointer' }}
        />
      </S.ModalContainer>
    </S.ModalBackground>
  );
};

export default LoginModal;

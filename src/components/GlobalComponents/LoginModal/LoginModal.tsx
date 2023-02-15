import { signIn } from 'next-auth/react';
import ReactModal from 'react-modal';
import * as S from './style';

interface loginModalProps {
  isOpen: boolean;
  setIsOpen: any;
}

const LoginModal = ({ isOpen, setIsOpen }: loginModalProps) => {
  //TODO: 모달 닫는 버튼, 밖에 누르면 닫히게
  // 소셜 로그인-로그인 시 회원가입 페이지로 이동함
  const loginHandler = async (provider: string) => {
    await signIn(provider, { callbackUrl: '/signup' });
  };

  return (
    <ReactModal
      isOpen={isOpen}
      style={customStyles}
      ariaHideApp={false}
      onRequestClose={() => setIsOpen(false)}
    >
      <S.ModalContainer>
        <button onClick={() => loginHandler('google')}>구글 로그인</button>
        <button onClick={() => loginHandler('facebook')}>
          페이스북 로그인
        </button>
        <button onClick={() => loginHandler('kakao')}>카카오 로그인</button>
        <button onClick={() => loginHandler('naver')}>네이버 로그인</button>
        <button onClick={() => setIsOpen(false)}>닫기</button>
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

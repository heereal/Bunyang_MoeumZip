import ReactModal from 'react-modal';
import * as S from './style';
import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/common/firebase';

interface loginModalProps {
  isOpen: boolean;
}

const LoginModal = ({ isOpen }: loginModalProps) => {
  const googleProvider = new GoogleAuthProvider();
  //FIXME: 배포 시 파베 페북 연결 ID 수정하기
  const facebookProvider = new FacebookAuthProvider();

  //FIXME: any 수정
  const loginHandler = (provider: any) => {
    signInWithPopup(auth, provider);
  };
  return (
    <ReactModal isOpen={isOpen} style={customStyles}>
      <S.ModalContainer>
        <button onClick={() => loginHandler(googleProvider)}>구글 로그인</button>
        <button onClick={() => loginHandler(facebookProvider)}>페이스북 로그인</button>
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

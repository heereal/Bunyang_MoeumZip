import { signIn } from 'next-auth/react';
import { MdClose } from 'react-icons/md';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { SiNaver } from 'react-icons/si';
import { BsFacebook } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';


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
        <S.CloseBtnContainer>
          <MdClose size="30" onClick={() => setIsOpen(false)} />
        </S.CloseBtnContainer>
        <S.LogoContainer />
        <S.BunyangMoaTitle>분양모아</S.BunyangMoaTitle>
        <S.SocialLoginBtnContainer>
          <S.SocilaLoginBtn
            bg={'#fee500'}
            text={'black'}
            onClick={() => loginHandler('kakao')}
          >
            <S.SocialLoginIcon>
              <RiKakaoTalkFill size="25" style={{marginTop: 3}}/>
            </S.SocialLoginIcon>
            카카오톡 로그인
          </S.SocilaLoginBtn>
          <S.SocilaLoginBtn
            bg={'#03C75A'}
            text={'white'}
            onClick={() => loginHandler('naver')}
          >
            <S.SocialLoginIcon>
              <SiNaver size="21" style={{marginTop: 4, marginLeft: 2}}/>
            </S.SocialLoginIcon>
            네이버 로그인
          </S.SocilaLoginBtn>
          <S.SocilaLoginBtn
            bg={'#1877F2'}
            text={'white'}
            onClick={() => loginHandler('facebook')}
          >
            <S.SocialLoginIcon>
              <BsFacebook size="21.5" style={{marginTop: 2, marginLeft: 2}}/>
            </S.SocialLoginIcon>
            페이스북 로그인
          </S.SocilaLoginBtn>
          <S.SocilaLoginBtn
            bg={'white'}
            text={'black'}
            onClick={() => loginHandler('google')}
          >
            <S.SocialLoginIcon>
              <FcGoogle size="25" style={{marginTop: 3}}/>
            </S.SocialLoginIcon>
            구글 로그인
          </S.SocilaLoginBtn>
        </S.SocialLoginBtnContainer>
      </S.ModalContainer>
    </S.ModalBackground>
  );
};

export default LoginModal;

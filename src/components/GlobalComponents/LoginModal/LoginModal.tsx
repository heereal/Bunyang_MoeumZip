import { signIn } from 'next-auth/react';
import { MdClose } from 'react-icons/md';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { SiNaver } from 'react-icons/si';
import { BsFacebook } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import logo from '../../../assets/logo.png';
import * as S from './style';
import Image from 'next/image';

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
          <MdClose
            size="30"
            onClick={() => setIsOpen(false)}
            style={{ cursor: 'pointer' }}
          />
        </S.CloseBtnContainer>
        <S.LogoContainer>
          <Image
            src={logo}
            alt="logoImg"
            height={90}
            quality={100}
            //quelity 의 기본값은 75 입니다.
            priority={true}
          />
        </S.LogoContainer>
        <S.BunyangMoaTitle>분양모음집</S.BunyangMoaTitle>
        <S.SocialLoginBtnContainer>
          <S.SocilaLoginBtn
            bg={'#fee500'}
            text={'black'}
            onClick={() => loginHandler('kakao')}
          >
            <S.SocialLoginIcon>
              <RiKakaoTalkFill size="23" style={{ marginTop: 3 }} />
            </S.SocialLoginIcon>
            카카오톡 로그인
          </S.SocilaLoginBtn>
          <S.SocilaLoginBtn
            bg={'#03C75A'}
            text={'white'}
            onClick={() => loginHandler('naver')}
          >
            <S.SocialLoginIcon>
              <SiNaver size="19" style={{ marginTop: 4, marginLeft: 2 }} />
            </S.SocialLoginIcon>
            네이버 로그인
          </S.SocilaLoginBtn>
          <S.SocilaLoginBtn
            bg={'#1877F2'}
            text={'white'}
            onClick={() => loginHandler('facebook')}
          >
            <S.SocialLoginIcon>
              <BsFacebook size="20" style={{ marginTop: 2, marginLeft: 2 }} />
            </S.SocialLoginIcon>
            페이스북 로그인
          </S.SocilaLoginBtn>
          <S.SocilaLoginBtn
            bg={'white'}
            text={'black'}
            onClick={() => loginHandler('google')}
          >
            <S.SocialLoginIcon>
              <FcGoogle size="23" style={{ marginTop: 3 }} />
            </S.SocialLoginIcon>
            구글 로그인
          </S.SocilaLoginBtn>
        </S.SocialLoginBtnContainer>
      </S.ModalContainer>
    </S.ModalBackground>
  );
};

export default LoginModal;

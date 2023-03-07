import { signIn } from 'next-auth/react';
import { MdClose } from 'react-icons/md';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { SiNaver } from 'react-icons/si';
import { BsFacebook } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import logo from 'public/assets/logo.png';
import * as S from './style';
import Image from 'next/image';
import { useRef, useEffect } from 'react';

interface loginModalProps {
  setIsLoginModalOpen: any;
}

const LoginModal = ({ setIsLoginModalOpen }: loginModalProps) => {
  // 소셜 로그인-로그인 시 로딩 페이지로 이동함
  const loginHandler = async (provider: string) => {
    await signIn(provider, { callbackUrl: '/loading' });
  };

  const loginModalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => {
      // 로그인 모달 밖을 눌렀을 때 로그인 모달 닫힘
      //@ts-ignore
      if (
        loginModalRef.current &&
        //@ts-ignore
        !loginModalRef.current.contains(event?.target)
      ) {
        setIsLoginModalOpen(false);
      }
    }; // 이벤트 핸들러 등록
    document.addEventListener('mousedown', handler);

    return () => {
      // 이벤트 핸들러 해제
      document.removeEventListener('mousedown', handler);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <S.ModalBackground>
      <S.ModalContainer ref={loginModalRef}>
        <S.CloseBtnContainer>
          <MdClose
            size="27"
            onClick={() => setIsLoginModalOpen(false)}
            style={{ cursor: 'pointer' }}
          />
        </S.CloseBtnContainer>
        <S.LogoContainer>
          <Image
            src={logo}
            alt="logoImg"
            height={85}
            quality={100}
            priority={true}
          />
        </S.LogoContainer>
        <S.BunyangMoaTitle>분양모음집</S.BunyangMoaTitle>
        <S.SocialLoginBtnContainer>
          <S.SocialLoginBtn
            bg={'#fee500'}
            text={'black'}
            onClick={() => loginHandler('kakao')}
          >
            <S.SocialLoginIcon>
              <RiKakaoTalkFill size="20" style={{ marginTop: 5.5 }} />
            </S.SocialLoginIcon>
            카카오톡 로그인
          </S.SocialLoginBtn>
          <S.SocialLoginBtn
            bg={'#03C75A'}
            text={'white'}
            onClick={() => loginHandler('naver')}
          >
            <S.SocialLoginIcon>
              <SiNaver size="16" style={{ marginTop: 6.5, marginLeft: 1 }} />
            </S.SocialLoginIcon>
            네이버 로그인
          </S.SocialLoginBtn>
          <S.SocialLoginBtn
            bg={'#1877F2'}
            text={'white'}
            onClick={() => loginHandler('facebook')}
          >
            <S.SocialLoginIcon>
              <BsFacebook size="17" style={{ marginTop: 5, marginLeft: 2 }} />
            </S.SocialLoginIcon>
            페이스북 로그인
          </S.SocialLoginBtn>
          <S.GoogleLoginBtn
            bg={'white'}
            text={'black'}
            onClick={() => loginHandler('google')}
          >
            <S.SocialLoginIcon>
              <FcGoogle size="20" style={{ marginTop: 5 }} />
            </S.SocialLoginIcon>
            구글 로그인
          </S.GoogleLoginBtn>
        </S.SocialLoginBtnContainer>
      </S.ModalContainer>
    </S.ModalBackground>
  );
};

export default LoginModal;

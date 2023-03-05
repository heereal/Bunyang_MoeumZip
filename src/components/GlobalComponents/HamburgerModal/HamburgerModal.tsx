import InfoLinkBtn from '@/components/MainPage/InfoLinkBtn/InfoLinkBtn';
import Image from 'next/image';
import { useRef, useEffect } from 'react';
import * as S from './style';
import logo from 'public/assets/logo.png';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { CgProfile } from 'react-icons/cg';
import { FaRegCalendarAlt, FaRegBuilding } from 'react-icons/fa';
import { AiOutlineBarChart } from 'react-icons/ai';

const HamburgerModal = ({ setHamburgerOpen, setIsLoginModalOpen }: any) => {
  const HamModalRef = useRef<HTMLDivElement>(null);

  // user 로그인 여부에 따라 Hamburger Nav 변경
  const { data: session } = useSession();

  useEffect(() => {
    // 이벤트 핸들러 함수
    const handler = () => {
      // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
      //@ts-ignore
      if (HamModalRef.current && !HamModalRef.current.contains(event?.target)) {
        setHamburgerOpen(false);
      }
    };

    // 이벤트 핸들러 등록
    document.addEventListener('mousedown', handler);

    return () => {
      // 이벤트 핸들러 해제
      document.removeEventListener('mousedown', handler);
    };
  }, []);

  const LoginHandler = () => {
    setHamburgerOpen(false);
    setIsLoginModalOpen(true);
  };

  return (
    <S.HamModalBack>
      <div>
        <S.HamModalSection ref={HamModalRef}>
          <S.CloseBtn onClick={() => setHamburgerOpen(false)}>X</S.CloseBtn>
          <S.HamModalBox>
            <S.LogoBox>
              <Image
                src={logo}
                alt="logoImg"
                width={56}
                height={70}
                quality={100}
                priority={true}
              />
              <S.LogoText>분양모음집</S.LogoText>
            </S.LogoBox>
            <S.HamNavBox>
              {session ? (
                <S.HamNav>
                  <CgProfile fontSize={15} color={'#356eff'} />
                  <Link href={'/my'} legacyBehavior>
                    <a style={{ textDecoration: 'none', color: '#000000' }}>
                      마이페이지
                    </a>
                  </Link>
                </S.HamNav>
              ) : (
                <S.HamNav>
                  <CgProfile fontSize={20} color={'#356eff'} />
                  <S.HamNav onClick={LoginHandler} color={'black'}>
                    로그인
                  </S.HamNav>
                </S.HamNav>
              )}
              <S.HamNav>
                <FaRegCalendarAlt fontSize={20} color={'#356eff'} />
                <Link href={'/calendar'} legacyBehavior>
                  <a style={{ textDecoration: 'none', color: '#000000' }}>
                    청약캘린더
                  </a>
                </Link>
              </S.HamNav>
              <S.HamNav>
                <AiOutlineBarChart fontSize={20} color={'#356eff'} />
                <Link
                  href={
                    'https://www.applyhome.co.kr/ai/aia/selectAPTLttotPblancListView.do'
                  }
                  legacyBehavior
                >
                  <a style={{ textDecoration: 'none', color: '#000000' }}>
                    청약경쟁률 확인
                  </a>
                </Link>
              </S.HamNav>
              <S.HamNav>
                <FaRegBuilding fontSize={20} color={'#356eff'} />
                <Link
                  href={
                    'https://www.applyhome.co.kr/wa/waa/selectAptPrzwinDescList.do'
                  }
                  legacyBehavior
                >
                  <a style={{ textDecoration: 'none', color: '#000000' }}>
                    청약당첨자 확인
                  </a>
                </Link>
              </S.HamNav>
            </S.HamNavBox>
          </S.HamModalBox>
        </S.HamModalSection>
      </div>
    </S.HamModalBack>
  );
};

export default HamburgerModal;

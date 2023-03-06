import InfoLinkBtn from '@/components/MainPage/InfoLinkBtn/InfoLinkBtn';
import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';
import * as S from './style';
import logo from 'public/assets/logo.png';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { CgProfile } from 'react-icons/cg';
import { FaRegCalendarAlt, FaRegBuilding } from 'react-icons/fa';
import { AiOutlineBarChart } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { unset } from 'lodash';
import { MdClose } from 'react-icons/md';

const HamburgerModal = ({
  setHamburgerOpen,
  setIsLoginModalOpen,
  expanded,
  seExpanded,
  HamburgerOpenHandler,
}: any) => {
  const router = useRouter();
  const HamModalRef = useRef<HTMLDivElement>(null);

  // user 로그인 여부에 따라 Hamburger Nav 변경
  const { data: session } = useSession();

  useEffect(() => {
    // 이벤트 핸들러 함수
    const handler = () => {
      // 햄버거 모달 밖을 눌렀을 때 햄버거 모달이 닫힘
      //@ts-ignore
      if (HamModalRef.current && !HamModalRef.current.contains(event?.target)) {
        HamburgerOpenHandler();
      }
    };

    // 이벤트 핸들러 등록
    document.addEventListener('mousedown', handler);

    return () => {
      // 이벤트 핸들러 해제
      document.removeEventListener('mousedown', handler);
    };
    // eslint-disable-next-line
  }, []);

  // 로그인 버튼 누르면 햄버거 닫히고 로그인 모달 열림
  const LoginHandler = () => {
    HamburgerOpenHandler();
    setTimeout(() => {
      setIsLoginModalOpen(true);
    }, 200);
  };

  return (
    <S.HamModalBack>
      <div>
        <S.HamModalSection ref={HamModalRef} active={expanded ? true : false}>
          <S.CloseBtn onClick={HamburgerOpenHandler}>
            <MdClose size={22} />
          </S.CloseBtn>
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
                <Link href={'/my'} legacyBehavior>
                  <S.HamNav
                    style={{
                      backgroundColor:
                        router.pathname === '/my' ? '#E5EDFF' : '#ffffff',
                    }}
                  >
                    <CgProfile size={22} color={'#356eff'} />
                    <a
                      style={{
                        textDecoration: 'none',
                        color: '#000000',
                      }}
                    >
                      <p>마이페이지</p>
                    </a>
                  </S.HamNav>
                </Link>
              ) : (
                <S.HamNav onClick={LoginHandler} color={'black'}>
                  <CgProfile size={22} color={'#356eff'} />
                  <p>로그인</p>
                </S.HamNav>
              )}

              <Link href={'/calendar'} legacyBehavior>
                <S.HamNav
                  style={{
                    backgroundColor:
                      router.pathname === '/calendar' ? '#E5EDFF' : '#ffffff',
                  }}
                >
                  <FaRegCalendarAlt size={22} color={'#356eff'} />
                  <a
                    style={{
                      textDecoration: 'none',
                      color: '#000000',
                    }}
                  >
                    <p>청약캘린더</p>
                  </a>
                </S.HamNav>
              </Link>

              <Link
                href={
                  'https://www.applyhome.co.kr/ai/aia/selectAPTLttotPblancListView.do'
                }
                legacyBehavior
              >
                <S.HamNav>
                  <AiOutlineBarChart size={22} color={'#356eff'} />
                  <a style={{ textDecoration: 'none', color: '#000000' }}>
                    <p>청약경쟁률 확인</p>
                  </a>
                </S.HamNav>
              </Link>
              <Link
                href={
                  'https://www.applyhome.co.kr/wa/waa/selectAptPrzwinDescList.do'
                }
                legacyBehavior
              >
                <S.HamNav>
                  <FaRegBuilding size={22} color={'#356eff'} />
                  <a style={{ textDecoration: 'none', color: '#000000' }}>
                    <p>청약당첨자 확인</p>
                  </a>
                </S.HamNav>
              </Link>
            </S.HamNavBox>
          </S.HamModalBox>
        </S.HamModalSection>
      </div>
    </S.HamModalBack>
  );
};

export default HamburgerModal;

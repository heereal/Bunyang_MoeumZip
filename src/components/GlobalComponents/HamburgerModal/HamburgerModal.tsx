import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import logo from 'public/assets/logo.png';
import { useEffect, useRef } from 'react';
import { AiOutlineBarChart } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { FaRegBuilding, FaRegCalendarAlt } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import * as S from './style';

const HamburgerModal = ({
  setIsLoginModalOpen,
  expanded,
  HamburgerOpenHandler,
}: any) => {
  const router = useRouter();
  const hamModalRef = useRef<HTMLDivElement>(null);

  // user 로그인 여부에 따라 Hamburger Nav 변경
  const { data: session } = useSession();

  useEffect(() => {
    // 이벤트 핸들러 함수
    const handler = () => {
      // 햄버거 모달 밖을 눌렀을 때 햄버거 모달이 닫힘
      //@ts-ignore
      if (hamModalRef.current && !hamModalRef.current.contains(event?.target)) {
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
        <S.HamModalSection ref={hamModalRef} active={expanded ? true : false}>
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
                    onClick={HamburgerOpenHandler}
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
                      <div>마이페이지</div>
                    </a>
                  </S.HamNav>
                </Link>
              ) : (
                <S.HamNav onClick={LoginHandler} color={'black'}>
                  <CgProfile size={22} color={'#356eff'} />
                  <div>로그인</div>
                </S.HamNav>
              )}

              <Link href={'/calendar'} legacyBehavior>
                <S.HamNav
                  onClick={HamburgerOpenHandler}
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
                    <div>청약캘린더</div>
                  </a>
                </S.HamNav>
              </Link>

              <S.HamNav>
                <AiOutlineBarChart size={23} color={'#356eff'} />
                {/* 새창에서 열 때는 Link 태그 없이 a태그만 사용 */}
                <a
                  target="_blank"
                  // target 사용 시 'noreferrer'추가 해 보안 취약성 보완
                  rel="noreferrer"
                  href={
                    'https://www.applyhome.co.kr/ai/aia/selectAPTLttotPblancListView.do'
                  }
                  style={{ textDecoration: 'none', color: '#000000' }}
                >
                  <div>청약경쟁률 확인</div>
                </a>
              </S.HamNav>

              <S.HamNav>
                <FaRegBuilding size={22} color={'#356eff'} />
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={
                    'https://www.applyhome.co.kr/wa/waa/selectAptPrzwinDescList.do'
                  }
                  style={{ textDecoration: 'none', color: '#000000' }}
                >
                  <div>청약당첨자 확인</div>
                </a>
              </S.HamNav>
            </S.HamNavBox>
          </S.HamModalBox>
        </S.HamModalSection>
      </div>
    </S.HamModalBack>
  );
};

export default HamburgerModal;

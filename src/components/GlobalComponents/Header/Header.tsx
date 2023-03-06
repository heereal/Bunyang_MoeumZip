import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { GiHamburgerMenu } from 'react-icons/gi';
import logo from '../../../../public/assets/logo.png';
import HamburgerModal from '../HamburgerModal/HamburgerModal';
import LoginModal from '../LoginModal/LoginModal';
import SearchBox from '../SearchHeader/SearchBox';
import * as S from './style';

const Header = () => {
  const router = useRouter();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [hamburgerOpen, setHamburgerOpen] = useState<boolean>(false);
  const [expanded, seExpanded] = useState<boolean>(false);

  // 햄버거 모달 애니메이션 적용, 오픈 상태 변경
  const HamburgerOpenHandler = () => {
    seExpanded(!expanded);
    setTimeout(() => {
      setHamburgerOpen(!hamburgerOpen);
    }, 500);
  };

  // user 로그인 여부에 따라 header Nav 변경
  const { data: session } = useSession();

  return (
    <>
      {/* 로그인 모달 */}
      {isLoginModalOpen && (
        <LoginModal setIsLoginModalOpen={setIsLoginModalOpen} />
      )}
      {/* 햄버거 nav 모달 */}
      {hamburgerOpen && (
        <HamburgerModal
          setIsLoginModalOpen={setIsLoginModalOpen}
          expanded={expanded}
          HamburgerOpenHandler={HamburgerOpenHandler}
        />
      )}
      <S.Header>
        <S.LogoBox onClick={() => router.push('/')}>
          <Image
            onClick={() => router.push('/')}
            src={logo}
            alt="logoImg"
            height={28}
            quality={100}
            //quelity 의 기본값은 75 입니다.
            priority={true}
          />

          <S.LogoText onClick={() => router.push('/')}>분양모음집</S.LogoText>
        </S.LogoBox>
        {/* 검색창 */}
        <S.SearchContainer>
          <SearchBox />
        </S.SearchContainer>
        <S.NavBar>
          <S.NavContent
            onClick={() => router.push('/calendar')}
            color={router.asPath === '/calendar' ? '#356EFF' : 'black'}
          >
            청약캘린더
          </S.NavContent>

          {session ? (
            <>
              <S.NavContent
                onClick={() => {
                  router.push('/my');
                }}
                color={router.asPath === '/my' ? '#356EFF' : 'black'}
              >
                마이페이지
              </S.NavContent>
            </>
          ) : (
            <S.NavContent
              onClick={() => setIsLoginModalOpen(true)}
              color={'black'}
            >
              로그인
            </S.NavContent>
          )}
        </S.NavBar>
        <S.NavBarMobile>
          {/* 반응형 검색 버튼*/}
          <S.NavContent color={'black'}>
            <AiOutlineSearch style={{ fontSize: 20 }} />
          </S.NavContent>
          {/* 반응형 햄버거 아이콘 */}
          <S.NavContent color={'black'} onClick={HamburgerOpenHandler}>
            <GiHamburgerMenu style={{ fontSize: 20 }} />
          </S.NavContent>
        </S.NavBarMobile>
      </S.Header>
    </>
  );
};

export default Header;

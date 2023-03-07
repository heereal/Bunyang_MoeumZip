import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { GiHamburgerMenu } from 'react-icons/gi';
import logo from '../../../../public/assets/logo.png';
import HamburgerModal from '../HamburgerModal/HamburgerModal';
import LoginModal from '../LoginModal/LoginModal';
import SearchWeb from './SearchHeader/SearchWeb';
import SearchMobile from './SearchHeader/SearchMobile';
import { SearchInput } from './SearchHeader/style';
import * as S from './style';

const Header = () => {
  const router = useRouter();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [hamburgerOpen, setHamburgerOpen] = useState<boolean>(false);
  // 햄버거 모달 애니메이션
  const [expanded, setExpanded] = useState<boolean>(false);
  // 모바일 검색창 애니메이션
  const [searchExpanded, setSearchExpanded] = useState<boolean>(false);
  const [isMobileSearch, setIsMobileSearch] = useState<boolean>(false);

  // 햄버거 모달 애니메이션 적용, 오픈 상태 변경
  const HamburgerOpenHandler = () => {
    setExpanded(!expanded);
    setTimeout(() => {
      setHamburgerOpen(!hamburgerOpen);
    }, 150);
  };

  // 클릭하면 모바일 검색창이 나타나고 애니메이션 적용 됨
  const mobileSearchHandler = () => {
    setSearchExpanded(!searchExpanded);
    setTimeout(() => {
      setIsMobileSearch(!isMobileSearch);
    }, 200);
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
          {isMobileSearch ? (
            ''
          ) : (
            <S.LogoText onClick={() => router.push('/')}>분양모음집</S.LogoText>
          )}
        </S.LogoBox>
        {/* 검색창 */}
        <S.SearchContainer>
          {isMobileSearch ? (
            <SearchMobile
              mobileSearchHandler={mobileSearchHandler}
              searchExpanded={searchExpanded}
            />
          ) : (
            <SearchWeb />
          )}
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
        {isMobileSearch ? (
          ''
        ) : (
          <S.NavBarMobile>
            {/* 모바일 검색창*/}
            <S.NavContent onClick={mobileSearchHandler} color={'black'}>
              <AiOutlineSearch style={{ fontSize: 20 }} />
            </S.NavContent>
            {/* 모바일 햄버거nav 아이콘 */}
            <S.NavContent color={'black'} onClick={HamburgerOpenHandler}>
              <GiHamburgerMenu style={{ fontSize: 20 }} />
            </S.NavContent>
          </S.NavBarMobile>
        )}
      </S.Header>
    </>
  );
};

export default Header;

import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import logo from '../../../assets/logo.png';
import LoginModal from '../LoginModal/LoginModal';
import SearchInput from '../SearchInput/SearchInput';
import * as S from './style';

const Header = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const pathHandler = () => {
    router.push('/');
  };

  // [로그아웃] 버튼 클릭 시 작동
  const LogOutHandler = () => {
    confirmAlert({
      message: '로그아웃하시겠습니까?',
      buttons: [
        {
          label: '확인',
          onClick: () => signOut(),
        },

        {
          label: '취소',
          onClick: () => onclose,
        },
      ],
    });
  };

  // user 로그인 여부에 따라 header Nav 변경
  const { data: session } = useSession();

  return (
    <>
      {isOpen && <LoginModal setIsOpen={setIsOpen} />}
      <S.Header>
        <S.LogoBox>
          <Image
            onClick={pathHandler}
            src={logo}
            alt="logoImg"
            height={23}
            quality={100}
            //quelity 의 기본값은 75 입니다.
            priority={true}
          />

          {/* 로고 대신 글씨 넣어놓은 것 */}
          <div
            onClick={pathHandler}
            style={{
              marginLeft: 10,
              fontSize: '16px',
              fontWeight: 900,
            }}
          >
            분양모음집
          </div>
        </S.LogoBox>
        {/* 검색창 */}
        <S.SearchBox>
          <SearchInput />
        </S.SearchBox>
        <S.NavBar>
          <S.NavContent onClick={() => router.push('/calendar')}>
            청약캘린더
          </S.NavContent>
          {/* <S.NavContent onClick={() => router.push('/')}>청약정보</S.NavContent> */}

          {session ? (
            <>
              <S.NavContent
                onClick={() => {
                  router.push('/my');
                }}
              >
                마이페이지
              </S.NavContent>
              <S.NavContent onClick={LogOutHandler}>로그아웃</S.NavContent>
            </>
          ) : (
            <S.NavContent onClick={() => setIsOpen(true)}>로그인</S.NavContent>
          )}
        </S.NavBar>
      </S.Header>
    </>
  );
};

export default Header;

import { pathState } from '@/store/selectors';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { useRecoilState } from 'recoil';
import LoginModal from '../LoginModal/LoginModal';
import SearchInput from '../SearchInput/SearchInput';
import * as S from './style';

const Header = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [path, setPath] = useRecoilState(pathState);

  const pathHandler = () => {
    router.push('/');
    setPath('/');
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
          {/* <Image
            onClick={pathHandler}
            src={candy}
            alt="logoImg"
            width={90}
            height={20}
            quality={100}
            //quelity 의 기본값은 75 입니다.
            style={{ cursor: 'pointer' }}
            priority={true}
          /> */}

          {/* 로고 대신 글씨 넣어놓은 것 */}
          <div
            onClick={pathHandler}
            style={{
              position: 'absolute',
              left: '4%',
              top: '16px',
              fontSize: '16px',
              fontWeight: 900,
              cursor: 'pointer',
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

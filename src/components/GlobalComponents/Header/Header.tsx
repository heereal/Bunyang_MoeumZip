import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import candy from '../../../assets/candy.jpg';
import LoginModal from '../LoginModal/LoginModal';
import Search from '../Search/Search';
import * as S from './style';

const Header = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // user 로그인 여부에 따라 header Nav 변경
  const { data: session } = useSession();

  return (
    <>
      <S.Header>
        <LoginModal isOpen={isOpen} setIsOpen={setIsOpen} />
        <Image
          onClick={() => router.push('/')}
          src={candy}
          alt="logoImg"
          width={50}
          height={50}
          quality={100}
          //quelity 의 기본값은 75 입니다.
          style={{ cursor: 'pointer' }}
          priority={true}
        />
        {/* 검색창 */}
        <Search />
        <S.NavBar>
          <S.NavContent onClick={() => router.push('/')}>청약정보</S.NavContent>
          <S.NavContent onClick={() => router.push('/calender')}>
            청약캘린더
          </S.NavContent>

          {session ? (
            <>
              <S.NavContent
                onClick={() => {
                  router.push('/my');
                }}
              >
                마이페이지
              </S.NavContent>
              <S.NavContent onClick={() => signOut()}>로그아웃</S.NavContent>
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

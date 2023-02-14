import * as S from './style';
import { FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { auth } from '../../../common/firebase';
import { useState, KeyboardEvent } from 'react';
import { signOut } from 'firebase/auth';
import LoginModal from '../LoginModal/LoginModal';
import Image from 'next/image';
import candy from '../../../assets/candy.jpg';

// 1. 위치 정리
// 2. 페이지 이동
// 3. 로그아웃 기능 추가
// 4. 유저 여부에 따라 헤더 스위치
// 5. 검색 버튼 및 함수 -
// 6. CSS 수정

const Header = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>();

  // 로그인 여부 확인 - FIXME: LoginModal이랑 연결지어야 하나
  // const isLoggedIn = localStorage.key;
  const isLoggedIn = false;

  // 로그아웃하기
  const logOutHandler = async () => {
    await signOut(auth)
      .then(() => {
        router.push('/');
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // 검색 리스트 - homeList의 도시와 keyword가 일치해야 함

  const inputChangeHandler = (e: any) => {
    setKeyword(e.target.value);
  };

  // 검색 기능
  const searchHandler = () => {
    setKeyword('');
    router.push(`/search/${keyword}`);
  };

  // enter 눌러도 검색 가능
  const OnKeyPressHandler = (e: KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === 'Enter') {
      searchHandler();
    }
  };

  return (
    <>
      <S.Wrapper>
        <LoginModal isOpen={isOpen} />
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
        <S.HeaderNav onClick={() => router.push('/')}>청약정보</S.HeaderNav>
        <S.HeaderNav onClick={() => router.push('/')}>청약캘린더</S.HeaderNav>

        <S.SearchBox>
          <input
            type="text"
            value={keyword}
            onChange={inputChangeHandler}
            placeholder="관심지역을 검색해보세요."
            onKeyPress={OnKeyPressHandler}
          />
          <S.SearchBtn onClick={searchHandler}>
            <FaSearch style={{ fontSize: 30 }} />
          </S.SearchBtn>
        </S.SearchBox>
        {isLoggedIn ? (
          <>
            <S.Mynav
              onClick={() => {
                router.push('/my');
              }}
            >
              마이페이지
            </S.Mynav>
            <S.LogintNav onClick={logOutHandler}>로그아웃</S.LogintNav>
          </>
        ) : (
          <S.LogintNav onClick={() => setIsOpen(true)}>로그인</S.LogintNav>
        )}
        {/* TODO: 로그인 모달 추가 */}
      </S.Wrapper>
    </>
  );
};

export default Header;

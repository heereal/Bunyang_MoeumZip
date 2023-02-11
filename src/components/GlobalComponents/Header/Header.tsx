import * as S from './style';
import { FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { auth } from '../../../common/firebase';
import { useState, KeyboardEvent } from 'react';
import { signOut } from 'firebase/auth';
import LoginModal from '../LoginModal/LoginModal';

// 1. 위치 정리
// 2. 페이지 이동
// 3. 로그아웃 기능 추가
// 4. 유저 여부에 따라 헤더 스위치
// 5. 검색 버튼 및 함수 -
// 6. CSS 수정

const Header = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

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

  // 검색

  // enter 눌러도 검색 가능
  const OnKeyPressHandler = (e: KeyboardEvent<HTMLDivElement>): void => {
    e.preventDefault();
    if (e.key === 'Enter') {
      // TODO: 검색 실행 함수 추가
    }
  };

  return (
    <>
      <S.Wrapper>
        <LoginModal isOpen={isOpen} />
        <S.Logo
          onClick={() => router.push('/')}
          src={`/candy.jpg`}
          alt="logoImg"
          style={{ width: '50px', height: '50px' }}
        />
        <S.HeaderNav onClick={() => router.push('/')}>청약정보</S.HeaderNav>
        <S.HeaderNav onClick={() => router.push('/')}>청약캘린더</S.HeaderNav>

        <S.SearchBox>
          <input
            type="text"
            placeholder="관심지역을 검색해보세요."
            onKeyPress={OnKeyPressHandler}
          />
          <S.SearchBtn>
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

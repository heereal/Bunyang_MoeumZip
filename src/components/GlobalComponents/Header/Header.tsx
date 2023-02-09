import * as S from './style';
import { FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { auth } from '../../../common/firebase';
import { useState } from 'react';
import { async } from '@firebase/util';

// 1. 위치 정리
// 2. 페이지 이동
// 3. 로그아웃 기능 추가
// 4. 유저 여부에 따라 헤더 스위치
// 5. CSS 수정

const Header = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // 로그인 여부 확인 - FIXME: LoginModal이랑 연결지어야 하나
  // const isLoggedIn = localStorage.key;
  const isLoggedIn = true;

  // 로그인 모달 open
  const openModal = () => {
    setIsOpen(true);
  };

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

  return (
    <>
      <S.Wrapper>
        <S.Logo
          onClick={() => router.push('/')}
          src={require('../../../assets/candy.jpg')}
          alt="logoImg"
          style={{ width: '50px', height: '50px' }}
        />
        <div>청약정보</div>
        <div>청약캘린더</div>

        <S.SearchBox>
          <input type="text" placeholder="관심지역을 검색해보세요." />
          <FaSearch style={{ fontSize: 30 }} />
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
            <S.LogoutNav onClick={logOutHandler}>로그아웃</S.LogoutNav>
          </>
        ) : (
          <div onClick={openModal}>로그인</div>
        )}
        {/* TODO: 로그인 모달 추가 */}
      </S.Wrapper>
    </>
  );
};

export default Header;

import React, { useRef, useState } from 'react';
import * as S from './style';
import Image from 'next/image';
import logo from '../../../../public/assets/logo.png';
import { adminLogin } from '@/common/api';

const AdminLogin = () => {
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const idRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const loginHandler = () => {
    if (!id) {
      alert('아이디를 입력해주세요');
      if (idRef.current) {
        idRef.current.focus();
      }
      return;
    }

    if (!password) {
      alert('비밀번호를 입력해주세요');
      if (passwordRef.current) {
        passwordRef.current.focus();
      }
      return;
    }
    adminLogin(id, password).then((e) => {
      switch (e.msg) {
        case 'AUTH':
          alert('로그인 성공!');
          break;
        case 'FAILED':
          alert('비밀번호를 확인해주세요.');
          if (passwordRef.current) {
            passwordRef.current.focus();
          }
          break;
        case 'REJECTED':
          alert('아이디를 확인해주세요.');
          if (idRef.current) {
            idRef.current.focus();
          }
          break;
        case 'ERROR':
          alert('에러발생');
          break;
      }
    });
  };

  return (
    <S.Container>
      <S.LogoBox>
        <Image
          src={logo}
          alt="logoImg"
          height={120}
          quality={100}
          //quelity 의 기본값은 75 입니다.
          priority={true}
          style={{ cursor: 'pointer' }}
        />
        <S.LogoText>분양모음집-관리자</S.LogoText>
      </S.LogoBox>

      <S.FormBox>
        <S.FormText>아이디</S.FormText>
        <S.FormInput
          type="text"
          placeholder="아이디를 입력해주세요"
          value={id}
          onChange={(e) => setId(e.target.value)}
          ref={idRef}
        />
      </S.FormBox>
      <S.FormBox>
        <S.FormText>비밀번호</S.FormText>
        <S.FormInput
          type="password"
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          ref={passwordRef}
        />
      </S.FormBox>
      <S.FormBox>
        <S.FormSubmit>
          <S.LoginButton onClick={loginHandler}>로그인</S.LoginButton>
        </S.FormSubmit>
      </S.FormBox>
    </S.Container>
  );
};

export default AdminLogin;

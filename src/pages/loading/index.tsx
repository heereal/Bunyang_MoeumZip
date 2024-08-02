import { useSession } from 'next-auth/react';
import { db } from '@/common/firebase';
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import LoadingSpinner from '@/components/GlobalComponents/LoadingSpinner/LoadingSpinner';
import { regionArray, typesArray } from '@/common/categoryList';
import styled from 'styled-components';

// 로그인 후 로딩 중에 보여지는 로딩 페이지
// 최초 로그인이라면 회원가입 페이지로 이동, 이미 가입한 유저라면 이전 페이지로 이동
const Loading = () => {
  const router = useRouter();

  // 유저의 세션 정보 받아오기
  const { data: session }: any = useSession();

  // 현재 로그인한 유저의 정보가 firestore 'Users' collection에 존재하는지 비교함
  const redirectUser = async () => {
    const array: any[] = [];

    const q = query(
      collection(db, 'Users'),
      where('userEmail', '==', session?.user?.email),
      where('provider', '==', session?.user?.provider),
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) =>
      array.push({
        ...doc.data(),
      }),
    );

    // 이미 가입한 유저라면 이전 페이지로 이동,
    // 최초 로그인한 유저라면 firestore에 유저 정보를 새로 저장하며 회원가입 페이지로 이동
    if (array.length >= 1) {
      router.back();
    } else {
      await signUpUser();
    }
  };

  const signUpUser = async () => {
    const newUser = {
      userEmail: session?.user?.email,
      userName: session?.user?.name,
      userImage: session?.user?.image,
      provider: session?.user?.provider,
      bookmarkList: [],
      regions: regionArray,
      types: typesArray,
    };

    await setDoc(
      doc(db, 'Users', `${session.user.provider}_${session.user.email}`),
      newUser,
    );

    router.push({
      pathname: '/signup',
      query: {
        loading: true,
      },
    });
  };

  useEffect(() => {
    // session(유저 정보)이 들어왔을 때만 함수를 실행함
    if (session) {
      redirectUser();
      // 로그인 시 sessionStorage 비우기
      sessionStorage.clear();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <SpinnerWrapper>
      <LoadingSpinner />
    </SpinnerWrapper>
  );
};

export default Loading;

const SpinnerWrapper = styled.div`
  width: 100%;
  height: 93vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

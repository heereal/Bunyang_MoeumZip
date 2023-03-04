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
import { NextSeo } from 'next-seo';

// 로그인 후 회원가입 페이지로 이동 전에 보여지는 로딩 페이지
// 최초 로그인이라면 회원가입 페이지로 이동, 아니면 메인 페이지로 이동
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

    const newUser = {
      userEmail: session?.user?.email,
      userName: session?.user?.name,
      userImage: session?.user?.image,
      provider: session?.user?.provider,
      bookmarkList: [],
      regions: regionArray,
      types: typesArray,
    };

    // 이미 가입한 유저라면 메인으로 이동,
    // 최초 로그인한 유저라면 firestore에 유저 정보를 새로 저장하며 회원가입 페이지로 이동
    if (array.length >= 1) {
      router.back();
    } else {
      await setDoc(
        doc(db, 'Users', `${session.user.provider}_${session.user.email}`),
        newUser,
      );
      router.push(
        {
          pathname: '/signup',
          query: {
            loading: true,
          },
        },
      );
    }
  };

  useEffect(() => {
    // session(유저 정보)가 들어왔을 때만 함수를 실행함
    if (session) {
      redirectUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <>
      <NextSeo
        title="로딩중 -"
        description="전국 분양정보를 한눈에 확인할 수 있는 플랫폼입니다."
      />
      <LoadingSpinner />
    </>
  );
};

export default Loading;

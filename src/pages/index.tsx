import { db } from '@/common/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import * as S from '../styles/main.style';
import { SlArrowUp } from 'react-icons/sl';
import { useRouter } from 'next/router';
import LoadingSpinner from '@/components/GlobalComponents/LoadingSpinner/LoadingSpinner';

const MainPage = ({ homeList }: HomeListDBPropsJ) => {
  const allHomeList = homeList.allHomeData;
  const [expanded, seExpanded] = useState(false);
  const sizeHandler = () => {
    seExpanded(!expanded);
  };
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  //메인-> 상세페이지 페이지 로딩 시 스피너 실행되는 함수
  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };

    router.events.on('routeChangeStart', start);
    router.events.on('routeChangeComplete', end);
    router.events.on('routeChangeError', end);

    return () => {
      router.events.off('routeChangeStart', start);
      router.events.off('routeChangeComplete', end);
      router.events.off('routeChangeError', end);
    };
  }, []); //eslint-disable-line

  const CountTabs = dynamic(
    () => import('@/components/MainPage/CountTabs/CountTabs'),
    {
      ssr: false,
    },
  );

  return loading ? (
    <S.MainSection active={expanded ? true : false}>
      <S.MainUpBtnBox>
        <S.ArrowBox active={expanded ? true : false}>
          <SlArrowUp onClick={sizeHandler} />
        </S.ArrowBox>
      </S.MainUpBtnBox>
      <S.MainLoadingBox>
        <LoadingSpinner />
      </S.MainLoadingBox>
    </S.MainSection>
  ) : (
    <S.MainSection active={expanded ? true : false}>
      <NextSeo
        title=" "
        description="내집마련을 위한 솔루션, 전국 분양정보를 한눈에 확인할 수 있는 플랫폼입니다. 국토교통부 아파트 실거래가와 시세 정보를 확인할 수 있습니다. 청약캘린더를 통해 분양일정을 관리해보세요."
        canonical="https://www.by-zip.com/"
        openGraph={{
          url: 'https://www.by-zip.com/',
        }}
      />
      <S.MainUpBtnBox>
        <S.ArrowBox active={expanded ? true : false}>
          <SlArrowUp onClick={sizeHandler} />
        </S.ArrowBox>
      </S.MainUpBtnBox>
      {/* 지역 및 분양형태 필터 및 청약경쟁률 확인 버튼 */}
      {/* CountTabs(+HomeList 컴포넌트) */}
      <CountTabs list={allHomeList} expanded={expanded} />
    </S.MainSection>
  );
};

export default MainPage;

// Firebase에서 API 통합 데이터 불러오기
export const getStaticProps: GetStaticProps = async () => {
  const docRef = doc(db, 'HomeList', 'homeData');
  const docSnap = await getDoc(docRef);
  const homeList = docSnap.data();

  return {
    props: { homeList },

    // ISR - 12시간 마다 데이터 업데이트
    revalidate: 43200,
  };
};

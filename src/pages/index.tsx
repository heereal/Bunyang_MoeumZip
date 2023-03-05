import { db } from '@/common/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import * as S from '../styles/main.style';

const MainPage = ({ homeList }: HomeListDBPropsJ) => {
  const allHomeList = homeList.allHomeData;
  const [expanded, seExpanded] = useState(false);
  const sizeHandler = () => {
    seExpanded(!expanded);
  };

  const CountTabs = dynamic(
    () => import('@/components/MainPage/CountTabs/CountTabs'),
    {
      ssr: false,
    },
  );

  return (
    <S.MainSection active={expanded ? true : false}>
      <NextSeo
        title=" "
        description="전국 분양정보를 한눈에 확인할 수 있는 플랫폼입니다."
      />
      <S.MainUpBtnBox>
        <S.MainUpBtn onClick={sizeHandler}></S.MainUpBtn>
      </S.MainUpBtnBox>
      {/* 지역 및 분양형태 필터 및 청약경쟁률 확인 버튼 */}
      {/* CountTabs(+HomeList 컴포넌트) */}
      <CountTabs list={allHomeList} />
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

    // ISR - 1시간 마다 데이터 업데이트
    revalidate: 3600,
  };
};

import { db } from '@/common/firebase';
import HeadTitle from '@/components/GlobalComponents/HeadTitle/HeadTitle';
import TopBtn from '@/components/GlobalComponents/TopBtn/TopBtn';
import CountTabs from '@/components/MainPage/CountTabs/CountTabs';
import { doc, getDoc } from 'firebase/firestore';
import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import * as S from '../styles/main.style';

const MainPage = ({ homeList }: HomeListDBPropsJ) => {
  const allHomeList = homeList.allHomeData;

  const CountTabs = dynamic(
    () => import('@/components/MainPage/CountTabs/CountTabs'),
    {
      ssr: false,
    },
  );

  return (
    <S.MainSection>
      <HeadTitle title="메인페이지" />

      {/* 지역 및 분양형태 필터 및 청약경쟁률 확인 버튼 */}
      {/* CountTabs(+HomeList 컴포넌트) */}
      <CountTabs list={allHomeList} />
      <TopBtn />
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

    // ISR - 6시간 마다 데이터 업데이트
    revalidate: 21600,
  };
};

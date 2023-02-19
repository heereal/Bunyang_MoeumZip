import { db } from '@/common/firebase';
import HeadTitle from '@/components/GlobalComponents/HeadTitle/HeadTitle';
import TopBtn from '@/components/GlobalComponents/TopBtn/TopBtn';
import CountTabs from '@/components/MainPage/CountTabs';
import { doc, getDoc } from 'firebase/firestore';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import * as S from '../styles/main.style';

const MainPage = ({ homeList }: HomeListDBPropsJ) => {
  const allHomeList = homeList.allHomeData;

  return (
    <>
      <Head>
        <HeadTitle title="" />
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <S.MainSection>
        {/* CountTabs(+HomeList 컴포넌트) */}
        <CountTabs list={allHomeList} />
      </S.MainSection>
      <TopBtn />
    </>
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
    revalidate: 12600,
  };
};

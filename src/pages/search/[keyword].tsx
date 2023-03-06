import { db } from '@/common/firebase';
import NoResult from '@/components/GlobalComponents/NoResult/NoResult';
import { doc, getDoc } from 'firebase/firestore';
import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import * as S from '../../styles/search.style';

const HomeList = dynamic(
  () => import('../../components/GlobalComponents/HomeList/HomeList'),
  {
    ssr: false,
  },
);

const TopBtn = dynamic(
  () => import('@/components/GlobalComponents/TopBtn/TopBtn'),
  {
    ssr: false,
  },
);

const SearchResult = ({ homeList }: HomeListDBPropsJ) => {
  const router = useRouter();

  const allHomeList = homeList.allHomeData;

  // Search 컴포넌트에 있는 검색창에서 router로 받아 온 검색어
  const keyword: keywordJ = router.query.keyword;

  // 검색한 결과 리스트
  const resultsList = allHomeList.filter(
    (item: ItemJ) =>
      // 지역, 아파트명, 분양형태로 검색 가능
      (typeof keyword === 'string' &&
        item.SUBSCRPT_AREA_CODE_NM.includes(keyword)) ||
      (typeof keyword === 'string' && item.HOUSE_NM.includes(keyword)) ||
      (typeof keyword === 'string' && item.HOUSE_DTL_SECD_NM.includes(keyword)),
  );

  return (
    <S.ResultSection>
      <NextSeo
        title={`${keyword} 검색결과 -`}
        description={`${keyword} 의 분양모음집 검색결과 입니다.`}
      />
      {resultsList.length === 0 ? (
        <NoResult keyword={keyword} text="다른 키워드로 검색해주세요." />
      ) : (
        <>
          <S.TitleBox>
            <S.ResultTitle>
              <span>&apos;{keyword}&apos;</span>의 검색 결과는 총
              <span>{resultsList.length}건</span>입니다.
            </S.ResultTitle>
          </S.TitleBox>
          <S.ResultListArticle id="topBtnScroll">
            <S.ResultListBox>
              {resultsList.map((item: ItemJ) => (
                // 검색 결과 리스트
                <HomeList key={item.PBLANC_NO} list={item} />
              ))}
              <TopBtn />
            </S.ResultListBox>
          </S.ResultListArticle>
        </>
      )}
    </S.ResultSection>
  );
};

export default SearchResult;

// Firebase에서 API 통합 데이터 불러오기
export const getServerSideProps: GetServerSideProps = async () => {
  const docRef = doc(db, 'HomeList', 'homeData');
  const docSnap = await getDoc(docRef);
  const homeList = docSnap.data();

  return {
    props: { homeList },
  };
};

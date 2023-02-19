import { db } from '@/common/firebase';
import SearchResults from '@/components/SearchPage/SearchResults';
import { doc, getDoc } from 'firebase/firestore';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import * as S from '../../styles/search.style';

const SearchResult = ({ homeList }: HomeListDBPropsJ) => {
  const router = useRouter();
  const allHomeList = homeList.allHomeData;

  const getToday = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const today = year + '-' + month + '-' + day;

    return today;
  };
  const today = getToday();

  // Search 컴포넌트에 있는 검색창에서 router로 받아 온 검색어
  const keyword: string | string[] | undefined = router.query.keyword;

  // 전체 리스트 중 청약 가능 및 청약 예정 리스트 필터링
  const possibleHomeList = allHomeList.filter(
    (item: ItemJ) => item.RCEPT_ENDDE >= today,
  );

  // 검색한 결과 리스트
  const resultsList = possibleHomeList.filter(
    (item: ItemJ) =>
      // 지역, 아파트명, 분양형태로 검색 가능
      (typeof keyword === 'string' &&
        item.SUBSCRPT_AREA_CODE_NM.includes(keyword)) ||
      (typeof keyword === 'string' && item.HOUSE_NM.includes(keyword)) ||
      (typeof keyword === 'string' && item.HOUSE_DTL_SECD_NM.includes(keyword)),
  );

  return (
    <S.ResultSection>
      <S.TitleBox>
        <S.ResultTitle>
          {keyword} 의 검색 결과는 {resultsList.length} 건입니다.
        </S.ResultTitle>
      </S.TitleBox>
      <S.ResultListArticle>
        {resultsList.map((item: ItemJ) => (
          // 검색 결과 리스트
          <SearchResults key={item.PBLANC_NO} list={item} />
        ))}
      </S.ResultListArticle>
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

import { db } from '@/common/firebase';
import SearchResults from '@/components/SearchPage/SearchResults';
import { doc, getDoc } from 'firebase/firestore';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import * as S from '../../styles/search.style';

const SearchResult = ({ HomeListDB }: HomeListDBPropsJ) => {
  const router = useRouter();
  const allHomeList = HomeListDB.allHomeData;

  // Search 컴포넌트에 있는 검색창에서 router로 받아 온 검색어
  const keyword: string | string[] | undefined = router.query.keyword;

  // 검색한 결과 리스트

  const resultsList = allHomeList.filter(
    (item: ItemJ) =>
      // 지역, 아파트명, 분양형태로 검색 가능
      (typeof keyword === 'string' &&
        item.SUBSCRPT_AREA_CODE_NM.includes(keyword)) ||
      (typeof keyword === 'string' && item.HOUSE_NM.includes(keyword)) ||
      keyword?.includes(item.HOUSE_DTL_SECD_NM),
  );

  return (
    <S.Section>
      <div>
        {keyword} 의 검색 결과는 {resultsList.length} 건입니다.
      </div>
      {resultsList.map((item: ItemJ) => (
        // 검색 결과 리스트
        <SearchResults key={item.PBLANC_NO} list={item} />
      ))}
    </S.Section>
  );
};

export default SearchResult;

// Firebase에서 API 통합 데이터 불러오기
export const getServerSideProps: GetServerSideProps = async () => {
  const docRef = doc(db, 'HomeList', 'homeData');
  const docSnap = await getDoc(docRef);
  const HomeList = docSnap.data();

  return {
    props: { HomeListDB: HomeList },
  };
};

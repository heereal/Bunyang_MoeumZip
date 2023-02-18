import { db } from '@/common/firebase';
import SearchResults from '@/components/SearchPage/SearchResults';
import { selectedCategoryList } from '@/store/selectors';
import { doc, getDoc } from 'firebase/firestore';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import * as S from '../../styles/search.style';

const SearchResult = ({ HomeListDB }: any) => {
  const router = useRouter();
  const allHomeList = HomeListDB.allHomeData;

  // Search 컴포넌트에 있는 검색창에서 router로 받아 온 검색어
  const keyword = router.query.keyword;

  // 검색한 결과 리스트
  const resultsList = allHomeList.filter(
    (item: any) =>
      // TODO: data 참고해서 필터 다시 분류
      // 지역, 아파트명, 분양형태로 검색 가능
      // keyword?.includes(item.SUBSCRPT_AREA_CODE_NM) ||
      item.HOUSE_NM.includes(keyword),
    // keyword?.includes(item.HOUSE_DTL_SECD_NM),
  );

  return (
    <S.Section>
      <div>
        {keyword} 의 검색 결과는 {resultsList.length} 건입니다.
      </div>
      {resultsList.map((item: any) => (
        // 검색 결과 리스트
        <SearchResults key={item.PBLANC_NO} searchResult={item} />
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

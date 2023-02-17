import { db } from '@/common/firebase';
import SearchResults from '@/components/SearchPage/SearchResults';
import axios from 'axios';
import { doc, getDoc } from 'firebase/firestore';
import { GetServerSideProps, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import * as S from '../../styles/search.style';

const SearchResult = ({ HomeListDB }: any) => {
  const router = useRouter();
  const keyword = router.query.keyword;

  const resultsList = HomeListDB.allHomeData.filter(
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
        <SearchResults key={item.PBLANC_NO} searchResult={item} />
      ))}
    </S.Section>
  );
};

export default SearchResult;

// TODO: firebase 통합리스트 가져오기
// 기본 정보만 불러옴 - TODO: 오피스텔, 무순위, LH 추가하기
export const getServerSideProps: GetServerSideProps = async () => {
  const docRef = doc(db, 'HomeList', 'homeData');
  const docSnap = await getDoc(docRef);
  const HomeList = docSnap.data();

  return {
    props: { HomeListDB: HomeList },
  };
};

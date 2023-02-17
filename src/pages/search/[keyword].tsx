import SearchResults from '@/components/SearchPage/SearchResults';
import axios from 'axios';
import { GetServerSideProps, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import * as S from '../../styles/search.style';

const SearchResult = ({ defaultList }: any) => {
  const router = useRouter();
  const keyword = router.query.keyword;

  const resultsList = defaultList.filter(
    (item: any) =>
      // 지역, 아파트명, 분양형태로 검색 가능
      keyword?.includes(item.SUBSCRPT_AREA_CODE_NM) ||
      item.HOUSE_NM.includes(keyword) ||
      keyword?.includes(item.HOUSE_DTL_SECD_NM),
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
  const BASE_URL = 'https://api.odcloud.kr/api/ApplyhomeInfoDetailSvc/v1';
  const METHOD_APT_ALL = 'getAPTLttotPblancDetail';
  const SERVICE_KEY = process.env.NEXT_PUBLIC_HOME_API_KEY;

  // 공고문 리스트 가져오기
  const defaultList = await axios
    .get(
      `${BASE_URL}/${METHOD_APT_ALL}?page=1&perPage=1500&&cond%5BRCRIT_PBLANC_DE%3A%3AGTE%5D=2023-01-01&serviceKey=${SERVICE_KEY}`,
    )
    .then((res) => res.data.data);

  return {
    props: { defaultList },
  };
};

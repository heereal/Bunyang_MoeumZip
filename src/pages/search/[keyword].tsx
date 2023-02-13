import SearchResults from '@/components/SearchPage/SearchResults';
import axios from 'axios';
import { GetServerSideProps, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import * as S from '../../styles/search.style';

const SearchResult = ({ homeList }: any) => {
  const router = useRouter();
  const keyword = router.query.keyword;

  // console.log(homeList);
  const resultsList = homeList.filter(
    (item: any) =>
      item.SUBSCRPT_AREA_CODE_NM.includes(keyword) |
      item.HOUSE_NM.includes(keyword),
  );

  return (
    <>
      <div>SearchResult</div>
      <div>{keyword} 의 검색 결과는 몇 건입니다.</div>
      {resultsList.map((item: any) => (
        <SearchResults key={item.PBLANC_NO} searchResult={item} />
      ))}
    </>
  );
};

export default SearchResult;

// export const getStaticPaths = () =>{
//   return{
//     param:
//   }
// }

// TODO: getStaticProps 쓰려면 getStaticPaths 같이 써야 함
// API 통합 데이터
export const getServerSideProps: GetServerSideProps = async () => {
  const BASE_URL = 'https://api.odcloud.kr/api/ApplyhomeInfoDetailSvc/v1';
  const METHOD_APT_ALL = 'getAPTLttotPblancDetail';
  const METHOD_APT_DETAIL = 'getAPTLttotPblancMdl';
  const SERVICE_KEY = process.env.NEXT_PUBLIC_HOME_API_KEY;

  // 공고문 리스트 가져오기
  const defaultList = await axios
    // rewrites 써서 Network창에서 API KEY 숨김
    .get(
      `${BASE_URL}/${METHOD_APT_ALL}?page=1&perPage=1500&&cond%5BRCRIT_PBLANC_DE%3A%3AGTE%5D=2023-01-01&serviceKey=${SERVICE_KEY}`,
    )
    .then((res) => res.data.data);

  // 공고문 상세정보 전체 리스트 가져오기
  const detailList = await axios
    // rewrites 써서 Network창에서 API KEY 숨김
    .get(
      `${BASE_URL}/${METHOD_APT_DETAIL}?page=1&perPage=10000&serviceKey=${SERVICE_KEY}`,
    )
    .then((res) =>
      res.data.data.filter((item: any) => item.PBLANC_NO >= 2023000000),
    );

  // Default + Detail List 합치기
  const combineHomeList = await Promise.all(
    defaultList.map(async (item: any) => {
      return {
        ...item,
        detail: detailList.filter((i: any) => i.PBLANC_NO === item.PBLANC_NO),
      };
    }),
  );

  return {
    props: { homeList: combineHomeList },
    // ISR - 12시간 마다 데이터 업데이트
    // revalidate: 43200,
  };
};

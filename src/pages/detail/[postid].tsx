import MapSection from '@/components/GlobalComponents/MapSection/MapSection';
import PostDetail from '@/components/DetailPage/PostDetail/PostDetail';
import HeadTitle from '@/components/GlobalComponents/HeadTitle/HeadTitle';
import { useRouter } from 'next/router';
import * as S from '../../styles/detail.style';
import CommentsList from '@/components/DetailPage/Comments/CommentsList';
import axios from 'axios';

const DeatilPage = ({ homeList }: any) => {
  const router = useRouter();

  return (
    <S.DetailBody>
      <HeadTitle title="상세페이지" />
      <div>
        <PostDetail postId={router?.query.postid} />
        <CommentsList postId={router?.query.postid} />
      </div>

      <MapSection homeList={homeList} />
    </S.DetailBody>
  );
};

export const getServerSideProps = async () => {
  const BASE_URL = 'https://api.odcloud.kr/api/ApplyhomeInfoDetailSvc/v1';
  const METHOD_APT_ALL = 'getAPTLttotPblancDetail';
  const METHOD_APT_DETAIL = 'getAPTLttotPblancMdl';
  const SERVICE_KEY = process.env.NEXT_PUBLIC_HOME_API_KEY;

  // 공고문 리스트 가져오기
  const defaultList = await axios
    .get(
      `${BASE_URL}/${METHOD_APT_ALL}?page=1&perPage=1500&&cond%5BRCRIT_PBLANC_DE%3A%3AGTE%5D=2023-01-01&serviceKey=${SERVICE_KEY}`,
    )
    .then((res) => res.data.data);

  // 공고문 상세정보 전체 리스트 가져오기
  const detailList = await axios
    .get(
      `${BASE_URL}/${METHOD_APT_DETAIL}?page=1&perPage=10000&serviceKey=${SERVICE_KEY}`,
    )
    .then((res) =>
      // 2023년 이후 올라온 공고문 가져오기
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
  };
};

export default DeatilPage;

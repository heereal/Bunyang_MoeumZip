import { getDetailPostInfo, getDetailPostInfo2 } from '@/common/api';
import { useSubscription } from '@/hooks';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { QueryClient, useQuery, useQueryClient } from 'react-query';
import MapSection from '../MapSection/MapSection';
import * as S from './style';

const PostDetail = () => {
  const router = useRouter();
  // const [details, setDetails] = useState<any>([]);
  console.log(router.query.postid);

  // const id = parseInt(router.query.postid);

  // const { homeListHandler, homeList } = useSubscription();

  // const home = homeList.find((item: any) => item?.PBLANC_NO === id);
  // useEffect(() => {
  //   homeListHandler();
  // }, []);

  const { data, isloading, refetch }: any = useQuery('detail', () => {
    return getDetailPostInfo(router.query.postid);
  });

  const { data: test }: any = useQuery('test', () => {
    return getDetailPostInfo2(router.query.postid);
  });

  console.log(test?.data[0]);

  return (
    <S.Section>
      PostDetail
      {/* <h1>{home?.HOUSE_NM}</h1> */}
      <h1>{data?.data.data[0].HOUSE_NM}</h1>
      <MapSection />
    </S.Section>
  );
};

export default PostDetail;

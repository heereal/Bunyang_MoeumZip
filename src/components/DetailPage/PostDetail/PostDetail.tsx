import { getDetailPostInfo, getDetailPostInfo2 } from '@/common/api';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { QueryClient, useQuery, useQueryClient } from 'react-query';
import * as S from './style';

const PostDetail = () => {
  const route = useRouter();
  const [details, setDetails] = useState<any>([]);

  const { data, isloading, refetch }: any = useQuery('detail', () => {
    return getDetailPostInfo(2022000893);
  });

  return (
    <S.Section>
      PostDetail
      <h1>{data?.data.data[0].HOUSE_NM}</h1>
    </S.Section>
  );
};

export default PostDetail;

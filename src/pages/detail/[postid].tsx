import { getHomeList } from '@/common/api';
import CommentsList from '@/components/DetailPage/Comments/CommentsList';
import PostDetail from '@/components/DetailPage/PostDetail/PostDetail';
import MarkerIcon from '@/components/GlobalComponents/Maps/MarkerIcon';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { dehydrate, QueryClient } from 'react-query';
import * as S from '../../styles/detail.style';

const DetailPage = ({ dehydratedState }: any) => {
  const router = useRouter();

  const TopBtn = dynamic(
    () => import('@/components/GlobalComponents/TopBtn/TopBtn'),
    {
      ssr: false,
    },
  );

  return (
    <S.DetailBody id="topBtnScroll">
      <PostDetail postId={router?.query.postid} />
      <CommentsList postId={router?.query.postid} />
      <TopBtn />
    </S.DetailBody>
  );
};

export const getServerSideProps = async () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        cacheTime: 540000,
      },
    },
  });
  await queryClient.prefetchQuery('detail', getHomeList);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default DetailPage;

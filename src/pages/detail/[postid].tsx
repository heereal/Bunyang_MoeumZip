import { getHomeList } from '@/common/api';
import CommentsList from '@/components/DetailPage/Comments/CommentsList';
import PostDetail from '@/components/DetailPage/PostDetail/PostDetail';
import HeadTitle from '@/components/GlobalComponents/HeadTitle/HeadTitle';
import { useRouter } from 'next/router';
import { dehydrate, QueryClient } from 'react-query';
import * as S from '../../styles/detail.style';

const DeatilPage = ({ dehydratedState }: any) => {
  const router = useRouter();

  return (
    <S.DetailBody id="detailBody">
      <HeadTitle title="상세페이지" />
      <PostDetail postId={router?.query.postid} />
      <CommentsList postId={router?.query.postid} />
    </S.DetailBody>
  );
};

export const getServerSideProps = async () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        cacheTime: 1000 * 60 * 60 * 3,
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

export default DeatilPage;

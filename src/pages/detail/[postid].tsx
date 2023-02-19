import CommentsList from '@/components/DetailPage/Comments/CommentsList';
import PostDetail from '@/components/DetailPage/PostDetail/PostDetail';
import HeadTitle from '@/components/GlobalComponents/HeadTitle/HeadTitle';
import { useRouter } from 'next/router';
import * as S from '../../styles/detail.style';

const DeatilPage = () => {
  const router = useRouter();

  return (
    <S.DetailBody>
      <HeadTitle title="상세페이지" />
      <PostDetail postId={router?.query.postid} />
      <CommentsList postId={router?.query.postid} />
    </S.DetailBody>
  );
};

export const getServerSideProps = async () => {
  return {
    props: {},
  };
};

export default DeatilPage;

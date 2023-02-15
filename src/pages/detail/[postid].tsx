import MapSection from '@/components/GlobalComponents/MapSection/MapSection';
import PostDetail from '@/components/DetailPage/PostDetail/PostDetail';
import HeadTitle from '@/components/GlobalComponents/HeadTitle/HeadTitle';
import { useRouter } from 'next/router';
import * as S from '../../styles/detail.style';
import CommentsList from '@/components/DetailPage/Comments/CommentsList';

const DeatilPage = () => {
  const router = useRouter();

  return (
    <S.DetailBody>
      <HeadTitle title="상세페이지" />
      <PostDetail postId={router?.query.postid} />
      <MapSection />
      <CommentsList postId={router?.query.postid} />
    </S.DetailBody>
  );
};

export const getServerSideProps = () => {
  return {
    props: {},
  };
};

export default DeatilPage;

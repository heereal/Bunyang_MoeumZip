import Comments from '@/components/DetailPage/Comments/Comments';
import MapSection from '@/components/DetailPage/MapSection/MapSection';
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
      <MapSection />
      <Comments postId={router?.query.postid} />
    </S.DetailBody>
  );
};

export const getServerSideProps = () => {
  return {
    props: {},
  };
};

export default DeatilPage;

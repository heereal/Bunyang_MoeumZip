import PostDetail from '@/components/DetailPage/PostDetail/PostDetail';
import HeadTitle from '@/components/GlobalComponents/HeadTitle/HeadTitle';
import { useRouter } from 'next/router';

const DeatilPage: any = () => {
  return (
    <>
      <HeadTitle title="상세페이지" />
      <div>
        <PostDetail />
      </div>
    </>
  );
};

export const getServerSideProps = (context: any) => {
  return {
    props: {},
  };
};

export default DeatilPage;

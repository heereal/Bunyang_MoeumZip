import { getDetailPostInfo } from '@/common/api';
import PostDetail from '@/components/DetailPage/PostDetail/PostDetail';
import HeadTitle from '@/components/GlobalComponents/HeadTitle/HeadTitle';
import { useSubscription } from '@/hooks';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useQuery } from 'react-query';

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

// export const getServerSideProps = () => {
//   return {
//     props: {},
//   };
// };

export const getStaticPaths: any = async () => {
  return {
    paths: [{ params: { postid: '2023000009' } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      test: [{ id: '1', title: 'test1' }],
    },
  };
};

export default DeatilPage;

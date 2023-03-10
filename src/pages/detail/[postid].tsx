import { db } from '@/common/firebase';
import CommentsList from '@/components/DetailPage/Comments/CommentsList';
import PostDetail from '@/components/DetailPage/PostDetail/PostDetail';
import LoadingSpinner from '@/components/GlobalComponents/LoadingSpinner/LoadingSpinner';
import { doc, getDoc } from 'firebase/firestore';
import { GetStaticPaths, GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import * as S from '../../styles/detail.style';

const DetailPage = ({ detail }: any) => {
  const router = useRouter();

  const TopBtn = dynamic(
    () => import('@/components/GlobalComponents/TopBtn/TopBtn'),
    {
      ssr: false,
    },
  );

  return (
    <>
      <S.DetailBody id="topBtnScroll">
        {router.isFallback && (
          <S.DetailLoadingBox>
            <LoadingSpinner />
          </S.DetailLoadingBox>
        )}
        <PostDetail postId={router?.query.postid} detail={detail} />
        <CommentsList postId={router?.query.postid} />
        <TopBtn />
      </S.DetailBody>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const docRef = doc(db, 'HomeList', 'homeData');
  const docSnap = await getDoc(docRef);
  const homeList = docSnap.data();
  const allHomeList = homeList?.allHomeData;

  const paths = allHomeList?.map((home: HomeP) => ({
    params: { postid: home.PBLANC_NO },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const docRef = doc(db, 'HomeList', 'homeData');
  const docSnap = await getDoc(docRef);
  const homeList = docSnap.data();
  const allHomeList = homeList?.allHomeData;

  const detail = allHomeList?.find(
    (home: { PBLANC_NO: string }) => `${home.PBLANC_NO}` === params?.postid,
  );

  if (!detail) {
    return {
      notFound: true,
    };
  }

  return {
    props: { detail },
     // ISR - 12시간 마다 데이터 업데이트
    revalidate: 43200,
  };
};

export default DetailPage;

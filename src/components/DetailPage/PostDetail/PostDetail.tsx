import { getHomeList, getBookmarksList } from '@/common/api';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import * as S from './style';
import { useBookmark } from '@/hooks';

const PostDetail = ({ postId }: DetailPagePropsP) => {
  const queryClient = useQueryClient();

  // 유저의 세션 정보 받아오기
  const { data: session, status } = useSession();

  // 디테일 페이지에서 사용할 특정한 분양 정보
  const [home, setHome] = useState<HomeP>();
  const [email, setEmail] = useState<any>('');

  // 북마크 리스트 볼러오기
  const { data: bookmarksList } = useQuery(
    'Bookmarks',
    () => getBookmarksList(home.PBLANC_NO),
    {
      enabled: !!home,
    },
  );

  const { onClickBookmarkBtnHandler } = useBookmark(
    status,
    email,
    bookmarksList,
    home?.PBLANC_NO,
  );

  // 분양 정보 모두 불러온 후에 setHome 실행
  const { data, refetch } = useQuery('detail', getHomeList, {
    onSuccess: (data) => {
      setHome(
        data?.allHomeData.find(
          (home: { PBLANC_NO: string }) => `${home.PBLANC_NO}` === postId,
        ),
      );
    },
  });

  // [북마크] 버튼 클릭 시 작동
  const editBookmark = useMutation('Bookmarks', onClickBookmarkBtnHandler, {
    onSuccess: () => {
      queryClient.invalidateQueries('Bookmarks');
    },
  });

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [home]);

  // firestore에서 유저 정보 불러오면 state에 저장함
  useEffect(() => {
    if (session) {
      setEmail(session?.user?.email);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <S.Section>
      <h1>상세정보</h1>
      <h1>{home?.HOUSE_NM}</h1>
      <div>{home?.HSSPLY_ADRES}</div>
      <h1>입주자모집공고 주요정보 </h1>
      <div>공급규모</div>
      <div>{home?.TOT_SUPLY_HSHLDCO}세대</div>
      <div>입주자모집공고 관련 문의</div>
      <div>사업주체 또는 분양사무실로 문의</div>
      <div>모집공고문 보기</div>
      <div>청약일정</div>
      <div>모집공고일: {home?.RCRIT_PBLANC_DE}</div>
      <div>청약접수</div>
      <div>공급금액, 입주 예정월</div>
      <button onClick={() => editBookmark.mutate()} style={{ color: 'red' }}>
        좋아요 버튼
      </button>
      <div>
        좋아요 count: 
        {bookmarksList?.usersList ? bookmarksList?.usersList?.length : '0'}
      </div>
    </S.Section>
  );
};

export default PostDetail;

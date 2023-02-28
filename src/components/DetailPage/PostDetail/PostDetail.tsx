import { getBookmarksList, getHomeList } from '@/common/api';
import { useBookmark } from '@/hooks';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import DetailHeader from './DetailHeader';
import DetailKeyInfo from './DetailKeyInfo';
import { ExtraInfo } from './ExtraInfo';
import SpecialSupply from './SpecialSupply';
import * as S from './style';
import SubscriptionSchedule from './SubscriptionSchedule';
import SupplyInfo from './SupplyInfo';

const PostDetail = ({ postId }: DetailPagePropsP) => {
  const queryClient = useQueryClient();

  // 유저의 세션 정보 받아오기
  const { data: session, status } = useSession();

  // 디테일 페이지에서 사용할 특정한 분양 정보
  const [home, setHome] = useState<HomeP>();
  const [email, setEmail] = useState<string | null | undefined>('');

  // 북마크 리스트 볼러오기
  const { data: bookmarksList, refetch: bookmarksListRefetch } = useQuery(
    'Bookmarks',
    () => {
      if (typeof postId === 'string') {
        return getBookmarksList(postId);
      }
    },
    {
      enabled: !!home,
    },
  );

  // 커스텀 훅 실행
  const { onClickBookmarkBtnHandler } = useBookmark(
    status,
    email!,
    bookmarksList,
    postId,
  );

  // 분양 정보 모두 불러온 후에 setHome 실행
  const { data, refetch: homeListRefetch } = useQuery('detail', getHomeList);

  // [북마크] 버튼 클릭 시 작동
  const editBookmark = useMutation('Bookmarks', onClickBookmarkBtnHandler, {
    onSuccess: () => {
      queryClient.invalidateQueries('Bookmarks');
    },
  });

  const detail = data?.allHomeData.find(
    (home: { PBLANC_NO: string }) => `${home.PBLANC_NO}` === postId,
  );

  useEffect(() => {
    setHome(detail);
    homeListRefetch();
    bookmarksListRefetch();
    // eslint-disable-next-line
  }, [detail]);

  // firestore에서 유저 정보 불러오면 state에 저장함
  useEffect(() => {
    if (session) {
      setEmail(session?.user?.email);
    }
    // eslint-disable-next-line
  }, [session]);

  return (
    <S.Section>
      <DetailHeader
        bookmarkList={bookmarksList}
        home={home}
        editBookMark={editBookmark}
        email={email}
      />
      <S.Container>
        <DetailKeyInfo home={home} />
        <SubscriptionSchedule home={home} />
        <SupplyInfo home={home} />
        <SpecialSupply home={home} />
        <ExtraInfo home={home} />
      </S.Container>
    </S.Section>
  );
};

export default PostDetail;

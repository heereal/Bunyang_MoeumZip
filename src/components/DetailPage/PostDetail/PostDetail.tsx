import { getHomeList } from '@/common/api';
import { db } from '@/common/firebase';
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import * as S from './style';

const PostDetail = ({ postId }: DetailPagePropsP) => {
  // 유저의 세션 정보 받아오기
  const { data: session, status } = useSession();

  const queryClient = useQueryClient();

  const [home, setHome] = useState<HomeP>();

  const { data, refetch } = useQuery('detail', () => {
    return getHomeList();
  });

  // 북마크 리스트 불러오기
  const getBookmarksList = async () => {
    const docRef = doc(db, 'Bookmarks', home.PBLANC_NO);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  };

  // [좋아요] 버튼 클릭 시 작동
  const addBookmark = async () => {
    if (status === 'unauthenticated') {
      alert('로그인 후 북마크 기능을 이용할 수 있습니다.')
      return;
    }
    // 좋아요를 취소할 때
    if (bookmarksList?.usersList.includes(session.user.email)) {
      const nemBookmark: any = {
        usersList: arrayRemove(session.user.email),
      };
      const bookmarksRef = doc(db, 'Bookmarks', home.PBLANC_NO);
      await updateDoc(bookmarksRef, nemBookmark);
      alert('좋아요가 삭제되었습니다');
      // 좋아요를 추가할 때
    } else {
      const nemBookmark: any = {
        usersList: arrayUnion(session.user.email),
      };

      const bookmarksRef = doc(db, 'Bookmarks', home.PBLANC_NO);
      await updateDoc(bookmarksRef, nemBookmark).catch(() =>
        setDoc(bookmarksRef, nemBookmark),
      );
      alert('좋아요 추가 완료');
    }
  };

  // 북마크 리스트 볼러오기
  const { data: bookmarksList } = useQuery('Bookmarks', getBookmarksList, {
    enabled: !!home,
  });
  console.log('bookmarksList:', bookmarksList);

  const editBookmark = useMutation('Bookmarks', addBookmark, {
    onSuccess: () => {
      queryClient.invalidateQueries('Bookmarks');
    },
  });

  const detail = data?.allHomeData.find(
    (home: { PBLANC_NO: string }) => `${home.PBLANC_NO}` === postId,
  );

  useEffect(() => {
    setHome(detail);
    refetch();
  }, [detail]);

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
      <div>좋아요 count: {bookmarksList?.usersList.length}</div>
    </S.Section>
  );
};

export default PostDetail;

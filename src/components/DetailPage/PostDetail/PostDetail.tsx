import { getHomeList } from '@/common/api';
import { db } from '@/common/firebase';
import {
  arrayRemove,
  arrayUnion, doc,
  getDoc, setDoc,
  updateDoc
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
  const [email, setEmail] = useState<any>('');

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
    // 로그인하지 않았을 때
    if (status === 'unauthenticated') {
      alert('로그인 후 북마크 기능을 이용할 수 있습니다.');
      return;
    }

    const addBookmark: any = {
      usersList: arrayUnion(session?.user?.email),
    };
    const addUserBookmarkList = {
      bookmarkList: arrayUnion(home?.PBLANC_NO),
    };

    const bookmarksRef = doc(db, 'Bookmarks', home.PBLANC_NO);

    // 좋아요를 취소할 때
    if (bookmarksList?.usersList.includes(email)) {
      const deleteBookmark: any = {
        usersList: arrayRemove(session?.user?.email),
      };
      const deleteUserBookmarkList = {
        bookmarkList: arrayRemove(home?.PBLANC_NO),
      };
      await updateDoc(bookmarksRef, deleteBookmark).then(() => {
        updateDoc(doc(db, 'Users', email), deleteUserBookmarkList);
      });
      alert('좋아요가 삭제되었습니다');

      // 해당 디테일 페이지에 최로로 북마크 했을 때-좋아요 추가
    } else if (!bookmarksList?.usersList) {
      setDoc(bookmarksRef, addBookmark);
      updateDoc(doc(db, 'Users', email), addUserBookmarkList);
      // 좋아요를 추가할 때
    } else {
      await updateDoc(bookmarksRef, addBookmark)
        .then(() => {
          updateDoc(doc(db, 'Users', email), addBookmark);
          alert('좋아요 추가 완료');
        })
        .catch(() => {
          setDoc(bookmarksRef, addBookmark);
          updateDoc(doc(db, 'Users', email), addUserBookmarkList);
          alert('좋아요 추가 완료');
        });
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detail]);

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
        좋아요 count:{' '}
        {bookmarksList?.usersList ? bookmarksList?.usersList?.length : '0'}
      </div>
    </S.Section>
  );
};

export default PostDetail;

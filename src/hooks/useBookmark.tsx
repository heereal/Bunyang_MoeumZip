import {
  arrayRemove,
  arrayUnion,
  doc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '@/common/firebase';

// [북마크] 버튼 클릭 시 작동
const useBookmark = (
  status: string,
  email: string,
  bookmarksList: any,
  PBLANC_NO: any,
) => {
  const onClickBookmarkBtnHandler = async () => {
    // 로그인하지 않았을 때
    if (status === 'unauthenticated') {
      alert('로그인 후 북마크 기능을 이용할 수 있습니다.');
      return;
    }

    const addBookmark: any = {
      usersList: arrayUnion(email),
    };
    const addUserBookmarkList = {
      bookmarkList: arrayUnion(PBLANC_NO),
    };

    const bookmarksRef = doc(db, 'Bookmarks', PBLANC_NO);

    // 북마크를 취소할 때
    if (bookmarksList?.usersList.includes(email)) {
      const deleteBookmark: any = {
        usersList: arrayRemove(email),
      };
      const deleteUserBookmarkList = {
        bookmarkList: arrayRemove(PBLANC_NO),
      };
      await updateDoc(bookmarksRef, deleteBookmark).then(() => {
        updateDoc(doc(db, 'Users', email), deleteUserBookmarkList);
      });
      alert('북마크가 삭제되었습니다');

      // 해당 디테일 페이지에 최초로 북마크 했을 때 (북마크 추가)
    } else if (!bookmarksList?.usersList) {
      setDoc(bookmarksRef, addBookmark);
      updateDoc(doc(db, 'Users', email), addUserBookmarkList);

      // 북마크를 추가할 때
    } else {
      await updateDoc(bookmarksRef, addBookmark)
        .then(() => {
          updateDoc(doc(db, 'Users', email), addUserBookmarkList);
          alert('북마크 추가 완료');
        })
        .catch(() => {
          setDoc(bookmarksRef, addBookmark);
          updateDoc(doc(db, 'Users', email), addUserBookmarkList);
          alert('북마크 추가 완료');
        });
    }
  };

  return { onClickBookmarkBtnHandler };
};

export default useBookmark;

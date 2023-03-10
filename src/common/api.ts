import axios from 'axios';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  query,
  getDocs,
  arrayUnion,
} from 'firebase/firestore';
import { db } from './firebase';

// allHomeData get 하는 함수
export const getHomeList = async () => {
  const docRef = doc(db, 'HomeList', 'homeData');
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

export const getComments = async (postId: string) => {
  const docRef = doc(db, 'Comments', postId);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

export const addComment = async ({ postId, newComment }: AddCommentP) => {
  const commentsRef = doc(db, 'Comments', postId);
  await updateDoc(commentsRef, newComment).catch(() =>
    setDoc(commentsRef, newComment),
  );
};

export const deleteComment = async ({ postId, comment }: AddCommentP) => {
  const commentsRef = doc(db, 'Comments', postId);
  await updateDoc(commentsRef, comment);
};

export const editComment = async ({
  postId,
  comment,
  newComment,
}: AddCommentP) => {
  const commentsRef = doc(db, 'Comments', postId);
  await updateDoc(commentsRef, comment).then(() =>
    updateDoc(commentsRef, newComment),
  );
};

// API로 받아온 data - DB에 추가
export const addHomeList = async (allHomeList: any) => {
  await setDoc(doc(db, 'HomeList', 'homeData'), allHomeList);
};

// firestore에서 'Users' 데이터 볼러 옴
export const getUsersList = async () => {
  const array: any[] = [];

  const q = query(collection(db, 'Users'));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) =>
    array.push({
      ...doc.data(),
    }),
  );

  return array;
};

// 북마크 리스트 불러오기
export const getBookmarksList = async (PBLANC_NO: string) => {
  const docRef = doc(db, 'Bookmarks', PBLANC_NO);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

export const getProfile = async (email: string | null | undefined) => {
  if (typeof email === 'string') {
    const docRef = doc(db, 'Users', email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!');
    }
  }
};

// '시군구' 정보를 기준으로 아파트 매매 실거래가 정보를 가져옴
export const getAPTRealPriceList = async (LAWD_CD: string) => {
  const data = await axios
    .get(`/api/APTRealPrice/${LAWD_CD?.split(':')[0]}`)
    .then((res) => res.data.response.body.items.item);
  return data;
};

// 관리자 페이지 3번 버튼 클릭한 시각 DB에 올리기
export const updateLastUpdatedDate = async (email: any) => {
  const onClickDate = new Date().toLocaleString();
  const addLastUpdatedDate = {
    list: arrayUnion({
      admin:
        email === 'mika013@naver.com'
          ? '이희령'
          : email === 'suk921@gmail.com'
          ? '정윤숙'
          : email === 'psh5575@gmail.com'
          ? '박성환'
          : '침입자다!!😱',
      date: onClickDate,
    }),
  };

  const ref = doc(db, 'Admin', 'lastUpdatedDate');
  await updateDoc(ref, addLastUpdatedDate);
};

// 관리자 페이지에서 DB 업로드 시각 데이터 가져오기
export const getLastUpdatedDate = async () => {
  const docRef = doc(db, 'Admin', 'lastUpdatedDate');
  const docSnap = await getDoc(docRef);
  const result = docSnap.data();
  return result?.list;
};

// 관리자 페이지 DAILY WORK LOG 입력하기
export const updateDailyWorkLog = async ({ email, logContent }: any) => {
  const onClickDate = new Date().toLocaleString();
  const addDailyWorkLog = {
    list: arrayUnion({
      admin:
        email === 'mika013@naver.com'
          ? '이희령'
          : email === 'suk921@gmail.com'
          ? '정윤숙'
          : email === 'psh5575@gmail.com'
          ? '박성환'
          : '침입자다!!😱',
      date: onClickDate,
      content: logContent,
    }),
  };

  const ref = doc(db, 'Admin', 'dailyWorkLog');
  await updateDoc(ref, addDailyWorkLog);
};

// 관리자 페이지에서 DAILY WORK LOG 데이터 가져오기
export const getDailyWorkLog = async () => {
  const docRef = doc(db, 'Admin', 'dailyWorkLog');
  const docSnap = await getDoc(docRef);
  const result = docSnap.data();
  return result?.list;
};

import axios from 'axios';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  query,
  getDocs,
  where,
  collectionGroup,
} from 'firebase/firestore';
import { db } from './firebase';

const BASE_URL = 'https://api.odcloud.kr/api/ApplyhomeInfoDetailSvc/v1';
const METHOD = 'getAPTLttotPblancDetail';
const SERVICE_KEY = process.env.NEXT_PUBLIC_HOME_API_KEY;

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

// Dummy Data
export const getDummyData = async () => {
  return axios.get('/dummy.json').then((res) => res.data);
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

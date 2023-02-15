import axios from 'axios';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from './firebase';

const BASE_URL = 'https://api.odcloud.kr/api/ApplyhomeInfoDetailSvc/v1';
const METHOD = 'getAPTLttotPblancDetail';
const SERVICE_KEY = process.env.NEXT_PUBLIC_HOME_API_KEY;

export const getPostInfo = async (num: string) => {
  return await axios.get(
    `${BASE_URL}/${METHOD}?page=1&perPage=10&cond%5BPBLANC_NO%3A%3AEQ%5D=${num}&serviceKey=${SERVICE_KEY}`,
  );
};

export const getDetailPostInfo = async (num: string) => {
  return await axios.get(
    `${BASE_URL}/getAPTLttotPblancMdl?page=1&perPage=10&cond%5BPBLANC_NO%3A%3AEQ%5D=${num}&serviceKey=${SERVICE_KEY}`,
  );
};

export const getComments = async (postId: string) => {
  const docRef = doc(db, 'Comments', postId);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

export const addComment = async ({ postId, newComment }: CommentP) => {
  const commentsRef = doc(db, 'Comments', postId);
  await updateDoc(commentsRef, newComment).catch(() =>
    setDoc(commentsRef, newComment),
  );
};

export const deleteComment = async ({ postId, comment }: CommentP) => {
  const commentsRef = doc(db, 'Comments', postId);
  await updateDoc(commentsRef, comment).catch(() =>
    setDoc(commentsRef, comment),
  );
};

export const editComment = async ({
  postId,
  comment,
  newComment,
}: CommentP) => {
  const commentsRef = doc(db, 'Comments', postId);
  await updateDoc(commentsRef, comment).then(() =>
    updateDoc(commentsRef, newComment),
  );
  console.log('댓글 등록 완료 !');
};

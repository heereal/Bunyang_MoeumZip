import { db } from '@/common/firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import * as S from './style';
import { uuidv4 } from '@firebase/util';

const Comments = ({ postId }: any) => {
  const [input, setInput] = useState<any>();
  const [comments, setComments] = useState<any>();

  const getComments = async () => {
    const docRef = doc(db, 'Comments', postId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return setComments(docSnap?.data());
    } else {
      console.log('no data');
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  console.log(comments?.comments);

  const commentUpdateHandler = async () => {
    const commentsRef = doc(db, 'Comments', postId);
    const id = uuidv4();
    await setDoc(
      commentsRef,
      {
        comments: [
          ...comments?.comments,
          {
            userId: id,
            contents: input,
            date: Date.now(),
            nickName: 'userNickName',
          },
        ],
      },
      { merge: true },
    );
    console.log('댓글 등록 완료 !');
  };

  return (
    <S.Section>
      <S.CommentHeader>댓글</S.CommentHeader>
      <S.Container>
        <div>
          <S.UserNameBox>세모네모</S.UserNameBox>
          <S.InputBox>
            <S.Input onChange={(e) => setInput(e.currentTarget.value)} />
            <S.Btn onClick={commentUpdateHandler}>등록</S.Btn>
          </S.InputBox>
        </div>
        <div>
          {comments?.comments.map((comment: any) => {
            return (
              <div key={comment.userId}>
                <S.UserNameBox>{comment.userId}</S.UserNameBox>
                <S.CommentsBox>{comment.contents} </S.CommentsBox>
              </div>
            );
          })}
        </div>
      </S.Container>
    </S.Section>
  );
};

export default Comments;

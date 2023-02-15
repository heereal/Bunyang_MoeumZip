import { addComment, getComments } from '@/common/api';
import { arrayUnion } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import HeeR from '../Comment/HeeR';
import * as S from './style';

const Comments = ({ postId }: any) => {
  const [input, setInput] = useState<any>('');
  const [comments, setComments] = useState<any>();
  const queryClient = useQueryClient();
  const [user, setUser] = useState<any>();
  const session: any = useSession();

  const { data } = useQuery<any>('comments', () => {
    return getComments(postId);
  });

  useEffect(() => {
    setComments(data?.list);
    setUser(session.data?.user);
  }, [data, session]);

  const addCommentHandler = async () => {
    const newComment = {
      list: arrayUnion({
        contents: input,
        date: Date.now(),
        nickName: user.name,
        userEmail: user.email,
      }),
    };
    addMutation.mutate({ postId, newComment });
    setInput('');
  };

  const addMutation = useMutation(addComment, {
    onSuccess: () => queryClient.invalidateQueries('comments'),
  });

  comments?.sort((a: any, b: any) => a.date - b.date);
  return (
    <S.Section>
      <S.CommentHeader>댓글</S.CommentHeader>
      <S.Container>
        <div>
          <S.UserNameBox>{user?.name}</S.UserNameBox>
          <S.InputBox>
            <S.Input
              onChange={(e) => setInput(e.currentTarget.value)}
              value={input}
            />
            <S.Btn onClick={addCommentHandler}>등록</S.Btn>
          </S.InputBox>
        </div>
        <div>
          {comments?.map((comment: any, index: any) => {
            return (
              <HeeR
                comment={comment}
                index={index}
                key={index}
                postId={postId}
                input={input}
                user={user}
                queryClient={queryClient}
                comments={comments}
                setComments={setComments}
              />
            );
          })}
        </div>
      </S.Container>
    </S.Section>
  );
};

export default Comments;

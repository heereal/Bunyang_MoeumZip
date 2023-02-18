import { getComments } from '@/common/api';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import AddComment from './AddComment';
import EditComment from './EditComment';
import * as S from './style';

const CommentsList = ({ postId }: DetailPagePropsP) => {
  const [comments, setComments] = useState<[]>();
  const queryClient = useQueryClient();
  const [user, setUser] = useState<object>();
  // 유저의 세션 정보 받아오기
  const { data: session } = useSession();

  const { data } = useQuery('comments', () => {
    if (typeof postId === 'string') {
      return getComments(postId);
    }
  });

  useEffect(() => {
    setComments(data?.list);
    setUser(session?.user);
  }, [data, session]);

  return (
    <S.Section>
      <S.CommentHeader>댓글</S.CommentHeader>
      <S.Container>
        <AddComment user={user} postId={postId} queryClient={queryClient} />
        <div>
          {comments?.map((comment: CommentP, index: number) => {
            return (
              <EditComment
                comment={comment}
                index={index}
                key={index}
                postId={postId}
                user={user}
                queryClient={queryClient}
                comments={comments}
              />
            );
          })}
        </div>
      </S.Container>
    </S.Section>
  );
};

export default CommentsList;

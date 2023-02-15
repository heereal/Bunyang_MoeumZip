import { getComments } from '@/common/api';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import AddComment from './AddComment';
import EditComment from './EditComment';
import * as S from './style';

const CommentsList = ({ postId }: any) => {
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

  return (
    <S.Section>
      <S.CommentHeader>댓글</S.CommentHeader>
      <S.Container>
        <AddComment user={user} postId={postId} queryClient={queryClient} />
        <div>
          {comments?.map((comment: any, index: any) => {
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

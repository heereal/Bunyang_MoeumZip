import { getComments, getProfile } from '@/common/api';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import AddComment from './AddComment';
import EditComment from './EditComment';
import * as S from './style';

const CommentsList = ({ postId }: DetailPagePropsP) => {
  const [comments, setComments] = useState<[]>();
  const [replies, setReplies] = useState<[]>();
  const queryClient = useQueryClient();
  const [user, setUser] = useState<any>();
  // 유저의 세션 정보 받아오기
  const { data: session }: any = useSession();

  const { data: profile, refetch: refetchProfile } = useQuery(
    'profile',
    () => {
      if (typeof session?.user?.email === 'string') {
        return getProfile(`${session.user.provider}_${session.user.email}`);
      }
    },
    {
      onSuccess(profile) {
        if (profile) {
          setUser(profile);
        }
      },
    },
  );

  const { data, refetch } = useQuery('comments', () => {
    if (typeof postId === 'string') {
      return getComments(postId);
    }
  });

  useEffect(() => {
    setComments(
      data?.list?.sort(
        (a: { date: string }, b: { date: string }) =>
          Number(b.date) - Number(a.date),
      ),
    );
    setReplies(
      data?.replies?.sort(
        (a: { date: string }, b: { date: string }) =>
          Number(b.date) - Number(a.date),
      ),
    );
    refetchProfile();

    // eslint-disable-next-line
  }, [data, session]);

  useEffect(() => {
    refetch();

    // eslint-disable-next-line
  }, [postId]);

  return (
    <S.Container>
      <div style={{ display: 'flex' }}>
        <S.CommentHeader>댓글</S.CommentHeader>
        <S.CommentCount>{comments?.length}</S.CommentCount>
      </div>
      <AddComment
        user={user}
        postId={postId}
        queryClient={queryClient}
        refetch={refetch}
      />
      <div style={{ marginBottom: '20px' }}>
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
              refetch={refetch}
              replies={replies}
            />
          );
        })}
      </div>
    </S.Container>
  );
};

export default CommentsList;

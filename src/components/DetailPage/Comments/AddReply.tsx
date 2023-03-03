import { addComment } from '@/common/api';
import { customAlert, postTime } from '@/common/utils';
import { arrayUnion } from 'firebase/firestore';
import Image from 'next/image';
import { KeyboardEvent, useState } from 'react';
import { useMutation } from 'react-query';
import * as S from './style';
import favicon from 'public/favicon.ico';

const AddReply = ({
  queryClient,
  refetch,
  postId,
  user,
  comment,
  date,
}: CommentPropsP) => {
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyInput, SetReplyInput] = useState('');
  const postDate = postTime();
  const id = comment?.commentId;
  const [clicked, setClicked] = useState(true);

  const addReplyHandler = () => {
    if (replyInput === '') {
      return customAlert('1글자 이상 입력해주세요.');
    }
    const newComment = {
      replies: arrayUnion({
        commentId: id,
        contents: replyInput,
        date: postDate,
        nickName: user?.userName,
        userEmail: user?.userEmail,
        userImage: user?.userImage,
        provider: user?.provider,
      }),
    };
    if (typeof postId === 'string') {
      addMutation.mutate({ postId, newComment });
    }
    SetReplyInput('');
    setReplyOpen(false);
  };

  const addMutation = useMutation(
    addComment,

    {
      onSuccess: () => {
        return queryClient.invalidateQueries('comments'), refetch();
      },
    },
  );

  //엔터키 누르면 등록되는 함수
  const OnKeyPressHandler = (
    e: KeyboardEvent<HTMLDivElement>,
    type: string,
  ): void => {
    if (e.key === 'Enter' && type === 'add' && user) {
      addReplyHandler();
    }
  };

  return (
    <S.ReplyHeader>
      <S.ReplyInputBox blur={!user ? '4px' : '0'}>
        <div
          onClick={user ? () => setReplyOpen(true) : undefined}
          style={{ cursor: !user ? 'default' : 'pointer' }}
        >
          답글 달기
        </div>
        {replyOpen && (
          <>
            <div style={{ display: 'flex', gap: 10 }}>
              <S.ImageBox>
                <Image
                  width={35}
                  height={35}
                  alt="profile"
                  src={
                    typeof user?.userImage === 'string'
                      ? user?.userImage
                      : favicon
                  }
                  quality={75}
                  loading="lazy"
                  style={{ borderRadius: 25, objectFit: 'cover' }}
                />
              </S.ImageBox>
              <div
                style={{
                  display: 'flex',
                  gap: 5,
                  width: '90%',
                }}
              >
                <S.EditInput
                  style={{ fontSize: 13, padding: 5 }}
                  onKeyPress={(e) => OnKeyPressHandler(e, 'add')}
                  onChange={(e) => SetReplyInput(e.currentTarget.value)}
                  autoFocus
                  disabled={user || clicked === false ? false : true}
                  placeholder="답글을 작성해주세요."
                />
              </div>
            </div>

            <S.BtnBox style={{ marginTop: 5, paddingRight: 55 }}>
              <S.EditSubmit onClick={user ? addReplyHandler : undefined}>
                게시
              </S.EditSubmit>
              <S.EditCancel onClick={() => setReplyOpen(false)}>
                취소
              </S.EditCancel>
            </S.BtnBox>
          </>
        )}
      </S.ReplyInputBox>
    </S.ReplyHeader>
  );
};

export default AddReply;

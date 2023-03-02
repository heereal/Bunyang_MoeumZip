import { addComment } from '@/common/api';
import { customAlert, postTime } from '@/common/utils';
import { arrayUnion } from 'firebase/firestore';
import { KeyboardEvent, useState } from 'react';
import { useMutation } from 'react-query';
import * as S from './style';

const AddReply = ({
  queryClient,
  refetch,
  postId,
  user,
  comment,
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
      <S.ReplyInputBox>
        <div onClick={() => setReplyOpen(true)} style={{ cursor: 'pointer' }}>
          답글 달기
        </div>
        {replyOpen && (
          <div style={{ display: 'flex', gap: 5 }}>
            <S.EditInput
              style={{ fontSize: 13 }}
              onKeyPress={(e) => OnKeyPressHandler(e, 'add')}
              onChange={(e) => SetReplyInput(e.currentTarget.value)}
              autoFocus
              disabled={user || clicked === false ? false : true}
            />
            <S.EditCancel onClick={() => setReplyOpen(false)}>
              취소
            </S.EditCancel>
            <S.EditSubmit onClick={user ? addReplyHandler : undefined}>
              답글 게시
            </S.EditSubmit>
          </div>
        )}
      </S.ReplyInputBox>
    </S.ReplyHeader>
  );
};

export default AddReply;

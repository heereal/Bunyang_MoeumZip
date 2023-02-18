import { deleteComment, editComment } from '@/common/api';
import { arrayRemove, arrayUnion } from 'firebase/firestore';
import { KeyboardEvent, useState } from 'react';
import { useMutation } from 'react-query';
import * as S from './style';

const EditComment = ({
  comment,
  index,
  postId,
  user,
  queryClient,
  comments,
}: CommentPropsP) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editInput, setEditInput] = useState<string | undefined>('');
  const [date] = useState(comment?.date);

  const deleteCommentHandler = async (index: number | undefined) => {
    const decision = confirm('삭제하시겠습니까?');

    if (
      decision &&
      typeof comments === 'object' &&
      typeof postId === 'string' &&
      typeof index === 'number'
    ) {
      const comment = {
        list: arrayRemove(comments[index]),
      };
      deleteMutation.mutate({ postId, comment });
    }
  };

  const editCommentHandler = async (index: number | undefined) => {
    if (editInput === '') {
      alert('1글자 이상 입력해주세요.');
      return;
    }
    if (
      typeof comments === 'object' &&
      typeof postId === 'string' &&
      typeof index === 'number'
    ) {
      const comment = {
        list: arrayRemove(comments[index]),
      };
      const newComment = {
        list: arrayUnion({
          contents: editInput,
          date: date,
          nickName: user?.name,
          userEmail: user?.email,
        }),
      };
      editMutation.mutate({ postId, comment, newComment });
      setEditInput('');
      setIsOpen(false);
    }
  };
  const deleteMutation = useMutation(deleteComment, {
    onSuccess: () => queryClient.invalidateQueries('comments'),
  });
  const editMutation = useMutation(editComment, {
    onSuccess: () => queryClient.invalidateQueries('comments'),
  });

  const OnKeyPressHandler = (
    e: KeyboardEvent<HTMLDivElement>,
    type: string,
  ): void => {
    if (e.key === 'Enter' && type === 'edit' && typeof index === 'number') {
      editCommentHandler(index);
    }
  };

  return (
    <div>
      {!isOpen && user?.email === comment?.userEmail && (
        <>
          <S.Btn
            onClick={() => {
              setIsOpen(true), setEditInput(comment?.contents);
            }}
          >
            수정
          </S.Btn>
          <S.Btn onClick={() => deleteCommentHandler(index)}>삭제</S.Btn>
        </>
      )}
      {isOpen && user?.email === comment?.userEmail && (
        <>
          <S.Btn onClick={() => setIsOpen(false)}>취소</S.Btn>
          <S.Btn onClick={() => editCommentHandler(index)}>완료</S.Btn>
          <S.Input
            onChange={(e) => setEditInput(e.currentTarget.value)}
            defaultValue={comment?.contents}
            autoFocus
            onKeyPress={(e) => OnKeyPressHandler(e, 'edit')}
          />
        </>
      )}

      <S.CommentsBox>{comment?.contents}</S.CommentsBox>

      <S.UserNameBox>{comment?.nickName}</S.UserNameBox>
      <S.UserNameBox>{comment?.userEmail}</S.UserNameBox>
    </div>
  );
};

export default EditComment;

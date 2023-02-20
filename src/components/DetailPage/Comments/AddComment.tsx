import { addComment } from '@/common/api';
import AlertUI from '@/components/GlobalComponents/AlertUI/AlertUI';
import { arrayUnion } from 'firebase/firestore';
import { KeyboardEvent, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { useMutation, useQueries } from 'react-query';
import * as S from './style';

const AddComment = ({ user, postId, queryClient, refetch }: CommentPropsP) => {
  const [input, setInput] = useState<string>('');

  const addCommentHandler = async () => {
    if (input === '') {
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <AlertUI alertText="1글자 이상 입력해주세요." onClose={onClose} />
          );
        },
      });

      return;
    }
    const newComment = {
      list: arrayUnion({
        contents: input,
        date: Date.now(),
        nickName: user?.name,
        userEmail: user?.email,
      }),
    };
    if (typeof postId === 'string') {
      addMutation.mutate({ postId, newComment });
    }
    setInput('');
  };

  const addMutation = useMutation(addComment, {
    onSuccess: () => {
      return queryClient.invalidateQueries('comments'), refetch();
    },
  });

  //엔터키 누르면 등록되는 함수
  const OnKeyPressHandler = (
    e: KeyboardEvent<HTMLDivElement>,
    type: string,
  ): void => {
    if (e.key === 'Enter' && type === 'add' && user) {
      addCommentHandler();
    }
  };

  return (
    <div>
      <S.UserNameBox>{user?.name}</S.UserNameBox>
      <S.InputBox>
        <S.Input
          placeholder={user ? '' : '로그인이 필요한 서비스 입니다.'}
          onChange={(e) => setInput(e.currentTarget.value)}
          value={input}
          onKeyPress={(e) => OnKeyPressHandler(e, 'add')}
          disabled={user ? false : true}
        />
        <S.Btn disabled={user ? false : true} onClick={addCommentHandler}>
          등록
        </S.Btn>
      </S.InputBox>
    </div>
  );
};

export default AddComment;

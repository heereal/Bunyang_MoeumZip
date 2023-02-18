import { addComment } from '@/common/api';
import { arrayUnion } from 'firebase/firestore';
import { KeyboardEvent, useState } from 'react';
import { useMutation } from 'react-query';
import * as S from './style';

const AddComment = ({ user, postId, queryClient }: CommentPropsP) => {
  const [input, setInput] = useState<string>('');
  console.log(queryClient);

  const addCommentHandler = async () => {
    if (input === '') {
      alert('1글자 이상 입력해주세요.');
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
    onSuccess: () => queryClient.invalidateQueries('comments'),
  });

  //엔터키 누르면 등록되는 함수
  const OnKeyPressHandler = (
    e: KeyboardEvent<HTMLDivElement>,
    type: string,
  ): void => {
    if (e.key === 'Enter' && type === 'add') {
      addCommentHandler();
    }
  };

  return (
    <div>
      <S.UserNameBox>{user?.name}</S.UserNameBox>
      <S.InputBox>
        <S.Input
          onChange={(e) => setInput(e.currentTarget.value)}
          value={input}
          onKeyPress={(e) => OnKeyPressHandler(e, 'add')}
        />
        <S.Btn onClick={addCommentHandler}>등록</S.Btn>
      </S.InputBox>
    </div>
  );
};

export default AddComment;

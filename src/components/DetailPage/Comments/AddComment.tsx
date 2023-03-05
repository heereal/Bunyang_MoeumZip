import { addComment } from '@/common/api';
import { customUIAlert, postTime } from '@/common/utils';
import { arrayUnion } from 'firebase/firestore';
import Image from 'next/image';
import favicon from 'public/favicon.ico';
import { KeyboardEvent, useState } from 'react';
import { useMutation } from 'react-query';

import { uuidv4 } from '@firebase/util';
import * as S from './style';

const AddComment = ({ user, postId, queryClient, refetch }: CommentPropsP) => {
  const [input, setInput] = useState<string>('');
  const [clicked, setClicked] = useState(true);
  const [borderProps, setBorderProps] = useState<string>('2px solid #b9b9b9');
  const [boxOpen, setBoxOpen] = useState<boolean>(false);

  const postDate = postTime();

  const openBoxHandler = () => {
    setBorderProps('2px solid black'), setBoxOpen(true);
  };

  const addCommentHandler = async () => {
    setClicked(true);
    if (input === '') {
      customUIAlert('1글자 이상 입력해주세요.');

      return setClicked(false);
    }
    const newComment = {
      list: arrayUnion({
        contents: input,
        date: postDate,
        nickName: user?.userName,
        userEmail: user?.userEmail,
        userImage: user?.userImage,
        commentId: uuidv4(),
        provider: user?.provider,
      }),
    };
    if (typeof postId === 'string') {
      addMutation.mutate({ postId, newComment });
    }
    setInput('');
    setClicked(false);
    setBoxOpen(false);
    setBorderProps('2px solid #b9b9b9');
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
    <>
      <S.AddCommentBox>
        <S.ImageBox>
          <Image
            width={40}
            height={40}
            alt="profile"
            src={
              typeof user?.userImage === 'string' ? user?.userImage : favicon
            }
            quality={75}
            loading="lazy"
            style={{ borderRadius: 25, objectFit: 'cover' }}
          />
        </S.ImageBox>

        <S.InputBox
          border={borderProps}
          onClick={() => {
            {
              user
                ? (setBorderProps('2px solid black'), setBoxOpen(true))
                : undefined;
            }
          }}
        >
          <S.Input
            placeholder={
              user
                ? '댓글을 남겨주세요.'
                : '로그인을 하시면 댓글 기능을 이용할 수 있습니다.'
            }
            onChange={(e) => setInput(e.currentTarget.value)}
            value={input}
            onKeyPress={(e) => OnKeyPressHandler(e, 'add')}
            disabled={user || clicked === false ? false : true}
          />
        </S.InputBox>
      </S.AddCommentBox>
      {boxOpen && (
        <S.BtnBox>
          <S.SubmitBtn onClick={user ? addCommentHandler : undefined}>
            게시
          </S.SubmitBtn>
          <S.SubmitBtn
            onClick={() => {
              setBoxOpen(false);
              setBorderProps('2px solid #b9b9b9');
            }}
            style={{ backgroundColor: '#E8EAEF', color: '#7B7B7B' }}
          >
            취소
          </S.SubmitBtn>
        </S.BtnBox>
      )}
    </>
  );
};

export default AddComment;

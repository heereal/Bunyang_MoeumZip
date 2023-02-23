import { addComment } from '@/common/api';
import { customAlert, postTime } from '@/common/utils';
import { arrayUnion } from 'firebase/firestore';
import Image from 'next/image';
import { KeyboardEvent, useState } from 'react';
import { RiPencilFill } from 'react-icons/ri';
import { useMutation } from 'react-query';
import logo from '../../../assets/logo.png';
import * as S from './style';

const AddComment = ({ user, postId, queryClient, refetch }: CommentPropsP) => {
  const [input, setInput] = useState<string>('');
  const [clicked, setClicked] = useState(true);
  const postDate = postTime();

  const addCommentHandler = async (e: any) => {
    setClicked(true);
    if (input === '') {
      customAlert('1글자 이상 입력해주세요.');

      return setClicked(false);
    }
    const newComment = {
      list: arrayUnion({
        contents: input,
        date: postDate,
        nickName: user?.userName,
        userEmail: user?.userEmail,
        userImage: user?.userImage,
      }),
    };
    if (typeof postId === 'string') {
      addMutation.mutate({ postId, newComment });
    }
    setInput('');
    setClicked(false);
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
      addCommentHandler(e);
    }
  };

  return (
    <S.AddCommentBox>
      <S.ImageBox>
        {typeof user?.userImage === 'string' ? (
          <Image
            width={45}
            height={45}
            alt="profile"
            src={user?.userImage}
            quality={75}
            loading="lazy"
            style={{ borderRadius: 25, objectFit: 'cover' }}
          />
        ) : (
          <Image
            height={29}
            alt="profile"
            src={logo}
            quality={75}
            loading="lazy"
            style={{ borderRadius: 25, objectFit: 'cover' }}
          />
        )}
      </S.ImageBox>

      <S.InputBox>
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
        <S.BtnBox>
          <RiPencilFill
            onClick={user ? addCommentHandler : undefined}
            style={{ width: 25, height: 25, color: '#7B7B7B' }}
          />
        </S.BtnBox>
      </S.InputBox>
    </S.AddCommentBox>
  );
};

export default AddComment;

import { deleteComment, editComment } from '@/common/api';
import { customUIAlert, getDate } from '@/common/utils';
import AlertUI from '@/components/GlobalComponents/AlertUI/AlertUI';
import { arrayRemove, arrayUnion } from 'firebase/firestore';
import Image from 'next/image';
import { KeyboardEvent, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { useMutation } from 'react-query';
import * as S from './style';

const Replies = ({
  list,
  user,
  queryClient,
  refetch,
  replies,
  postId,
  index,
  comment,
}: CommentPropsP) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editInput, setEditInput] = useState<string | undefined>('');
  const date = list?.date;
  const id = comment?.commentId;
  const provider = comment?.provider;

  const deleteReplyHandler = async (index: number) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <AlertUI
            alertText="삭제하시겠습니까?"
            onClose={onClose}
            onClick={() => {
              const comment = {
                replies: arrayRemove(replies[index]),
              };
              if (typeof postId === 'string') {
                deleteMutation.mutate({ postId, comment });
              }
              onClose();
            }}
            eventText="확인"
          />
        );
      },
    });

    // confirmAlert({
    //   message: '삭제하시겠습니까?',
    //   buttons: [
    //     {
    //       label: '확인',
    //       onClick: () => {
    //         const comment = {
    //           replies: arrayRemove(replies[index]),
    //         };
    //         if (typeof postId === 'string') {
    //           deleteMutation.mutate({ postId, comment });
    //         }
    //       },
    //     },

    //     {
    //       label: '취소',
    //       onClick: () => onclose,
    //     },
    //   ],
    // });
  };

  const editReplyHandler = async (index: number | undefined) => {
    if (editInput === '') {
      customUIAlert('1글자 이상 입력해주세요.');
      return;
    }
    if (typeof postId === 'string' && typeof index === 'number') {
      const comment = {
        replies: arrayRemove(replies[index]),
      };
      const newComment = {
        replies: arrayUnion({
          commentId: id,
          contents: editInput,
          date: date,
          nickName: user?.userName,
          userEmail: user?.userEmail,
          userImage: user?.userImage,
          edit: true,
          provider: provider,
        }),
      };
      editMutation.mutate({ postId, comment, newComment });
      setEditInput('');
      setIsOpen(false);
    }
  };

  const deleteMutation = useMutation(deleteComment, {
    onSuccess: () => {
      return queryClient.invalidateQueries('reply'), refetch();
    },
  });

  const editMutation = useMutation(editComment, {
    onSuccess: () => {
      return queryClient.invalidateQueries('reply'), refetch();
    },
  });

  const OnKeyPressHandler = (
    e: KeyboardEvent<HTMLInputElement>,
    type: string,
  ): void => {
    if (e.key === 'Enter' && type === 'edit' && typeof index === 'number') {
      editReplyHandler(index);
    }
  };

  return (
    <S.ReplyBox>
      <S.CommentListBox blur={!user ? '4px' : '0'}>
        <S.ImageBox>
          {list?.userImage && (
            <Image
              width={35}
              height={35}
              alt="profile"
              src={list?.userImage}
              quality={75}
              loading="lazy"
              style={{ borderRadius: 25, objectFit: 'cover' }}
            />
          )}
        </S.ImageBox>
        <S.CommentBox>
          <S.UserNameBox>
            <div
              style={{
                display: 'flex',
                gap: 10,
                alignItems: 'center',
                fontSize: 14,
              }}
            >
              <div>{list?.nickName}</div>
              <div style={{ fontSize: 13, color: '#B9B9B9' }}>
                {typeof list?.date === 'string' && getDate(list?.date)}
              </div>
              {list?.edit && (
                <div
                  style={{ color: '#7B7B7B', fontSize: 12, fontWeight: 500 }}
                >
                  수정됨
                </div>
              )}
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              {!isOpen &&
                user?.userEmail === list?.userEmail &&
                user?.provider === list?.provider && (
                  <div style={{ display: 'flex', gap: 10 }}>
                    <S.Btn
                      onClick={() => {
                        setIsOpen(true);
                        setEditInput(list?.contents);
                      }}
                    >
                      수정
                    </S.Btn>
                    <S.Btn
                      onClick={() => {
                        typeof index === 'number' && deleteReplyHandler(index);
                      }}
                    >
                      삭제
                    </S.Btn>
                  </div>
                )}
              {isOpen && user?.userEmail === list?.userEmail && (
                <div style={{ display: 'flex', gap: 10 }}>
                  <S.Btn onClick={() => setIsOpen(false)}>취소</S.Btn>
                  <S.Btn onClick={() => editReplyHandler(index)}>완료</S.Btn>
                </div>
              )}
            </div>
          </S.UserNameBox>
          {!isOpen && (
            <S.ContentsBox
              style={{
                fontSize: 14,
                width: '100%',
                wordBreak: 'break-all',
              }}
            >
              <p>{list?.contents}</p>
            </S.ContentsBox>
          )}
          {isOpen && (
            <S.ContentsBox>
              <S.EditInput
                onChange={(e) => setEditInput(e.currentTarget.value)}
                defaultValue={list?.contents}
                autoFocus
                onKeyPress={(e) => OnKeyPressHandler(e, 'edit')}
                style={{ fontSize: 14, color: 'black' }}
              />
            </S.ContentsBox>
          )}
        </S.CommentBox>
      </S.CommentListBox>
    </S.ReplyBox>
  );
};

export default Replies;

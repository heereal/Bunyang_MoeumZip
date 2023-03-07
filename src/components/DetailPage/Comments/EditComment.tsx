import { deleteComment, editComment } from '@/common/api';
import { customUIAlert, getDate, postTime } from '@/common/utils';
import AlertUI from '@/components/GlobalComponents/AlertUI/AlertUI';
import { arrayRemove, arrayUnion } from 'firebase/firestore';
import Image from 'next/image';
import { KeyboardEvent, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { useMutation } from 'react-query';
import AddReply from './AddReply';
import Replies from './Replies';
import * as S from './style';

const EditComment = ({
  comment,
  index,
  postId,
  user,
  queryClient,
  comments,
  refetch,
  replies,
}: CommentPropsP) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editInput, setEditInput] = useState<string | undefined>('');
  const date = comment?.date;
  const id = comment?.commentId;
  const provider = comment?.provider;

  const deleteCommentHandler = async (index: number | undefined) => {
    if (
      typeof comments === 'object' &&
      typeof postId === 'string' &&
      typeof index === 'number'
    )
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <AlertUI
              alertText="삭제하시겠습니까?"
              onClose={onClose}
              onClick={() => {
                const comment = {
                  list: arrayRemove(comments[index]),
                };
                deleteMutation.mutate({ postId, comment });
                onClose();
              }}
              eventText="삭제"
            />
          );
        },
      });
  };

  const editCommentHandler = async (index: number | undefined) => {
    if (editInput === '') {
      customUIAlert('1글자 이상 입력해주세요.');
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
      return queryClient.invalidateQueries('comments'), refetch();
    },
  });
  const editMutation = useMutation(editComment, {
    onSuccess: () => {
      return queryClient.invalidateQueries('comments'), refetch();
    },
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
    <>
      <S.CommentListBox blur={!user ? '4px' : '0'}>
        <S.ImageBox>
          {comment?.userImage && (
            <Image
              width={40}
              height={40}
              alt="profile"
              src={comment?.userImage}
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
              }}
            >
              <div>{comment?.nickName}</div>
              <div style={{ fontSize: 13, color: '#B9B9B9' }}>
                {comment?.date && getDate(comment?.date)}
              </div>
              {comment?.edit && (
                <div
                  style={{ color: '#7B7B7B', fontSize: 13, fontWeight: 500 }}
                >
                  수정됨
                </div>
              )}
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              {!isOpen &&
                user?.userEmail === comment?.userEmail &&
                user?.provider === comment?.provider && (
                  <div style={{ display: 'flex', gap: 10 }}>
                    <S.Btn
                      onClick={() => {
                        setIsOpen(true), setEditInput(comment?.contents);
                      }}
                    >
                      수정
                    </S.Btn>
                    <S.Btn onClick={() => deleteCommentHandler(index)}>
                      삭제
                    </S.Btn>
                  </div>
                )}
              {isOpen && user?.userEmail === comment?.userEmail && (
                <div style={{ display: 'flex', gap: 10 }}>
                  <S.Btn onClick={() => setIsOpen(false)}>취소</S.Btn>
                  <S.Btn onClick={() => editCommentHandler(index)}>완료</S.Btn>
                </div>
              )}
            </div>
          </S.UserNameBox>
          {!isOpen && <S.ContentsBox>{comment?.contents}</S.ContentsBox>}
          {isOpen && (
            <S.ContentsBox>
              <S.EditInput
                onChange={(e) => setEditInput(e.currentTarget.value)}
                defaultValue={comment?.contents}
                autoFocus
                onKeyPress={(e) => OnKeyPressHandler(e, 'edit')}
              />
            </S.ContentsBox>
          )}
        </S.CommentBox>
      </S.CommentListBox>
      <S.ReplyContainer>
        <AddReply
          comment={comment}
          refetch={refetch}
          queryClient={queryClient}
          date={date}
          index={index}
          comments={comments}
          postId={postId}
          user={user}
        />
        {replies
          ?.filter((reply: ItemJ) => reply.commentId === comment?.commentId)
          .map((list: any, index: number) => {
            return (
              <Replies
                replies={replies}
                key={index}
                list={list}
                user={user}
                queryClient={queryClient}
                refetch={refetch}
                postId={postId}
                index={index}
                comment={comment}
              />
            );
          })}
      </S.ReplyContainer>
    </>
  );
};

export default EditComment;

import AlertUI from '@/components/GlobalComponents/AlertUI/AlertUI';
import { confirmAlert } from 'react-confirm-alert';
import { MouseEventHandler } from 'react';

// 댓글 작성 시 사용
// const dateString  = postTime();
export const postTime = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);
  const seconds = ('0' + date.getSeconds()).slice(-2);
  const dateString = year + month + day + hours + minutes + seconds;
  return dateString;
};

// API 불러올 때 모집 중 공고 필터링하기 위해 사용
export const currentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const dateString = year + month + day;
  return parseInt(dateString);
};

// 20230109171500 -> 2023.01.09로 전환
// 사용 예시 <Date>{getDate(comment.date)}</Date>
export const getDate = (date: string) => {
  return `${date?.slice(2, 4)}.${date?.slice(4, 6)}.${date?.slice(
    6,
    8,
  )} ${date?.slice(8, 10)}:${date?.slice(10, 12)}`;
};

// 오늘 날짜 구하기 - 분양 정보 DB의 날짜 형식 0000-00-00
export const getToday = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const today = year + '-' + month + '-' + day;

  return today;
};

// Custom Alert(react confirm Library)실행함수
export const customUIAlert = (
  alertText: string,
  alertDetailA?: string,
  alertDetailB?: string,
  eventText?: string,
  onClick?: MouseEventHandler<HTMLElement>,
) => {
  confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <AlertUI
          alertText={alertText}
          onClose={onClose}
          alertDetailA={alertDetailA}
          alertDetailB={alertDetailB}
          eventText={eventText}
          onClick={onClick}
        />
      );
    },
  });
};

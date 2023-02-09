// 사용할 컴포넌트에서 postTime import 하고 사용
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
// 20230109171500 -> 2023.01.09로 전환
// 사용 예시 <Date>{getDate(comment.date)}</Date>
// TODO: date type 재정의하기
export const getDate = (date: any) => {
  return `${date?.slice(2, 4)}.${date?.slice(4, 6)}.${date?.slice(
    6,
    8,
  )} ${date?.slice(8, 10)}:${date?.slice(10, 12)}`;
};

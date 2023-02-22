import styled from 'styled-components';

export const CalendarContainer = styled.div`
  width: 100vw;
  height: 800px;
  display: flex;
  justify-content: center;
  padding: 50px 0;
  box-sizing: content-box;
  /* display: inline-block; */

  // 캘린더 전체 사이즈 조정
  .fc {
    width: 65%;
  }

  // 각 이벤트 요소
  .fc-event{
    cursor: pointer;
    padding: 4px 6px 6px 6px;
    margin-bottom: 2px;
  }

  // 날짜  ex) 2일
  .fc .fc-daygrid-day-top {
    flex-direction: row;
    margin-bottom: 3px;
  }
`;

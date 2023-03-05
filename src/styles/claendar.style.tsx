import styled from 'styled-components';

export const CalendarWrapper = styled.div`
  width: 100%;
  height: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0;
  box-sizing: content-box;
`;

export const CalendarHeader = styled.div`
  width: 100%;
  padding: 0 40px;
  display: flex;
  justify-content: space-between;
`;

export const CalendarDescContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CalendarIcon = styled.div``;

export const CalendarContainer = styled.div`
  width: 80%;
  /* width: 940px; */
  height: 100%;
  /* height: 800px; */
  display: flex;
  justify-content: center;
  /* padding: 40px 0; */
  /* box-sizing: content-box; */

  // 캘린더 전체 사이즈 조정
  .fc {
    width: 100%;
  }

  // 각 이벤트 요소
  .fc-event {
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

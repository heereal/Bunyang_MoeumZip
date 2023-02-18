import styled from 'styled-components';

export const CalendarContainer = styled.div`
  width: 100vw;
  padding: 50px 80px;

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

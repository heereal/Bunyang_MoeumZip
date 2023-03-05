import styled from 'styled-components';

export const CalendarWrapper = styled.div`
  width: 100%;
  height: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0;
  box-sizing: content-box;
  z-index: 2;
`;

export const CalendarContainer = styled.div`
  width: 90%;
  max-width: 1100px;
`;

export const CalendarHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-bottom: 30px;
`;

export const HeaderBackground = styled.div`
  width: 100%;
  height: 186px;
  position: absolute;
  background: linear-gradient(180deg, #D9E5FF 0%, rgba(216, 228, 255, 0) 105.38%);
  z-index: 1;
`;

export const Title = styled.div`
  font-weight: 700;
  font-size: 22px;
  line-height: 140%;
  padding-bottom: 15px;
`;

export const CategoryContainer = styled.div`
  display: flex;
`;

export const Category = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 17px;
  line-height: 17px;
  margin-right: 7px;
  color: ${(props) => props.color};
`;

export const CalendarDescContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CalendarIcon = styled.div``;

export const FullCalendarContainer = styled.div`
  width: 100%;
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

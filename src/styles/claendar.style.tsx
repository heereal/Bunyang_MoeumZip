import styled from 'styled-components';

export const CalendarWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0;
  box-sizing: content-box;
  z-index: 2;
  position: relative;
  background-color: #f8faff;

  @media screen and (max-width: 730px) {
    padding: 30px 0;
  }
`;

export const CalendarContainer = styled.div`
  width: 95%;
  max-width: 1100px;
`;

export const CalendarHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  /* padding-bottom: 30px; */
  padding-bottom: 30px;
  z-index: 2;
  position: relative;

  @media screen and (max-width: 730px) {
    padding: 0 10px 20px 10px;
  }
`;

export const HeaderBackground = styled.div`
  width: 100vw;
  height: 186px;
  position: absolute;
  top: 0;
  left: 0;
  background: linear-gradient(
    180deg,
    #d9e5ff 0%,
    rgba(216, 228, 255, 0) 105.38%
  );
  background-size: cover;
  z-index: 1;
`;

export const Title = styled.div`
  font-weight: 700;
  font-size: 22px;
  line-height: 140%;
  padding-bottom: 15px;

  @media screen and (max-width: 730px) {
    font-size: 18px;
    padding-bottom: 10px;
    padding-left: 3px;
  }
`;

export const CategoryContainer = styled.div`
  display: flex;

  @media screen and (max-width: 730px) {
    width: 100%;
    flex-wrap: wrap;
  }
`;

export const Category = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 17px;
  line-height: 17px;
  margin-right: 7px;
  color: ${(props) => props.color};

  @media screen and (max-width: 730px) {
    font-size: 14px;
    padding-bottom: 5px;
  }
`;

export const CalendarDescContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CalendarIcon = styled.div`
  .calendarIcon {
    @media screen and (max-width: 730px) {
      width: 60px;
      height: 60px;
    }
  }
`;

export const FullCalendarContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;

  // 캘린더 전체 사이즈 조정
  .fc {
    width: 100%;
  }

  /* .fc-direction-ltr {
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  } */

  // toolbar
  .fc .fc-toolbar.fc-header-toolbar {
    margin: 0;
    padding: 0 40px;
    background-color: #356eff;
    height: 63px;
    font-weight: 600;
    font-size: 12px;
    line-height: 29px;
    color: white;
    border-radius: 20px 20px 0px 0px;
    z-index: 2;

    h2 {
      @media screen and (max-width: 730px) {
        font-size: 14px;
      }
    }

    span {
      @media screen and (max-width: 730px) {
        font-size: 20px;
      }
    }

    @media screen and (max-width: 730px) {
      padding: 0 10px;
      /* font-size: 9px; */
      height: 47px;
    }
  }

  // toolbar next prev 버튼
  .fc .fc-button-primary {
    background-color: transparent;
    border: none;

    // next prev 버튼
    span {
      font-weight: 500;
      font-size: 28px;
    }

    :not(:disabled):active {
      background-color: transparent;
      border: none;
      box-shadow: none;
    }

    :hover {
      background-color: transparent;
    }

    :focus {
      box-shadow: none;
    }
  }

  // 요일 부분
  .fc-theme-standard th {
    height: 32px;
    padding-top: 3.5px;
    background: #e5edff;
    border: 1px solid #dddee0;
    font-weight: 500;
    font-size: 16px;
    color: #7b7b7b;

    @media screen and (max-width: 730px) {
      height: 29px;
      font-size: 14px;
    }
  }

  // 오늘 날짜 배경색
  .fc .fc-daygrid-day.fc-day-today {
    background-color: #fff8bd !important;
    color: #356eff;
    font-weight: bold;
    text-decoration-line: underline;
  text-underline-position: under;
  }

  // 날짜별 그리드
  .fc .fc-daygrid-day-frame {
    padding: 10px;
    background-color: white;

    @media screen and (max-width: 730px) {
      padding: 3px;
    }
  }

  // 날짜  ex) 2일
  .fc .fc-daygrid-day-top {
    flex-direction: row;
    margin-bottom: 8px;

    @media screen and (max-width: 730px) {
      font-size: 12px;
    }
  }

  // 각 이벤트 요소
  .fc-event {
    cursor: pointer;
    padding: 5px 8px;
    margin-bottom: 5px;
    border-radius: 4px;
    font-weight: 500;
    font-size: 14px;

    @media screen and (max-width: 730px) {
      font-weight: 600;
      font-size: 12px;
      line-height: 11px;
      padding: 3px 2px;
    }
  }
`;

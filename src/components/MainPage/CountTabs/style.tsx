import styled from 'styled-components';

// Count Tab
export const CountSectionBack = styled.div`
  width: 100%;
  height: 175px;

  background: linear-gradient(
      0deg,
      rgba(94, 94, 94, 0.2),
      rgba(94, 94, 94, 0.2)
    ),
    linear-gradient(
      180deg,
      rgba(56, 93, 164, 0.609) 0%,
      rgba(63, 128, 255, 0.616) 24.81%,
      rgba(78, 138, 254, 0.287) 110.76%
    );

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: sticky;
  top: 0;
`;

// 청약 정보 확인 문구
export const CountTabTitle = styled.p`
  height: 26px;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  margin-bottom: 15px;

  color: #ffffff;
`;

export const CountTabList = styled.ul`
  width: 50%;
  height: 59px;

  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;

  color: #000000;
  font-weight: bold;
  text-align: center;

  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 35px;
  gap: 30px;

  /* CountTab */
  .baseTab {
    // 기본 Tab
    width: 30%;
    height: 53px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;

    font-size: 12px;
    transition: 0.5s;
    border-radius: 10px;

    cursor: pointer;

    :hover {
      background-color: #f1f6ff;
      color: #3d7fff;
    }
  }

  .focused {
    //선택된 Tab
    background-color: #f1f6ff;
    color: #3d7fff;
  }
`;

// CountTab 이름(전체, 청약 가능...)
export const CountTabName = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
  text-align: center;
`;

// Tab별 Count Number
export const CountTabNum = styled(CountTabName)`
  font-weight: 700;
  font-size: 23px;
  line-height: 27px;
`;

// 리스트
export const ListSection = styled.section`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  justify-content: center;
  overflow-y: scroll;
  margin: auto;

  background: #f7f7f7;
`;

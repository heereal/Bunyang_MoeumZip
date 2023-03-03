import styled from 'styled-components';

// Count Tab
export const CountSectionBack = styled.div`
  width: 100%;
  height: 127px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-left: 14px;

  position: sticky;
  top: 0;
`;

export const CountTabList = styled.ul<{ bd: string; bs: string }>`
  width: 100%;
  height: 88px;
  list-style: none;

  background: #ffffff;

  text-align: center;

  display: flex;
  align-items: center;
  padding: 8px 5px;
  gap: 12px;

  /* CountTab */
  .baseTab {
    // 기본 Tab
    width: 17%;
    height: 72px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 11px;
    gap: 10px;

    background: #ffffff;
    border: 1.5px solid #d8d8d8;
    border-radius: 10px;

    cursor: pointer;
  }

  /* 선택한 Tab */
  .focused {
    border: 1.5px solid ${(props) => props.bd};
    box-shadow: 2px 4px 4px ${(props) => props.bs};
  }
`;

// Count Tab(전체, 청약 가능~)
export const BaseCountTab = styled.li<{ bd: string; bs: string }>`
  :hover {
    transition: 0.6s;
    border: 1.5px solid ${(props) => props.bd};
    box-shadow: 2px 4px 4px ${(props) => props.bs};
  }
`;

// CountTab 이름(전체, 청약 가능...)
export const CountTabName = styled.div`
  width: 100%;
  font-style: normal;
  font-weight: 700;
  font-size: 13px;
  line-height: 140%;
  text-align: center;
  color: #8e8e8e;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
`;

// Tab별 Count Number
export const CountTabNum = styled(CountTabName)`
  height: 16px;
  font-weight: 700;
  font-size: 22px;
  line-height: 80%;
  color: #000;
`;

// 리스트
export const ListSection = styled.section`
  width: 100%;
  height: 90%;
  background-color: #f8faff;
  overflow-y: scroll;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  justify-content: center;
  margin: auto;
`;

export const ListBox = styled.div`
  width: 100%;
  max-width: 750px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  @media screen and (max-width: 1280px) {
    grid-template-columns: repeat(2, 1fr);
    max-width: 500px;
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    max-width: 750px;
  }
`;

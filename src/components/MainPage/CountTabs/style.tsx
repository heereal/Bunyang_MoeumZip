import styled from 'styled-components';

// Count Tab
export const CountSectionBack = styled.div`
  width: 100%;
  height: 90px;
  max-width: 750px;

  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 1280px) {
    max-width: 500px;
  }
  @media screen and (max-width: 768px) {
    max-width: 750px;
    height: 100px;
  }
  @media screen and (max-width: 450px) {
    max-width: 420px;
    height: 110px;
  }
`;

export const CountTabList = styled.ul<{ bd: string; bs: string }>`
  width: 100%;
  height: 70px;
  list-style: none;
  background: #ffffff;
  text-align: center;
  display: flex;
  align-items: center;
  gap: 12px;

  @media screen and (max-width: 450px) {
    gap: 6px;
    justify-content: center;
  }

  /* CountTab */
  .baseTab {
    // 기본 Tab
    width: 110px;
    height: 76px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 10px;
    gap: 14px;

    background: #ffffff;
    border: 1.5px solid #d8d8d8;
    border-radius: 10px;

    cursor: pointer;
    @media screen and (max-width: 520px) {
      width: 105px;
      height: 60px;
    }
    @media screen and (max-width: 450px) {
      width: 85px;
      height: 65px;
      padding: 5px;
      gap: 9px;
    }
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
  font-weight: 600;
  font-size: 13px;
  line-height: 140%;
  color: #8e8e8e;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;

  @media screen and (max-width: 800px) {
    font-size: 12px;
  }
  @media screen and (max-width: 450px) {
    font-size: 12px;
  }
`;

export const TapContainer = styled.div`
  width: 100%;
  max-width: 750px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px 15px 5px 15px;
  
  @media screen and (max-width: 1280px) {
    max-width: 500px;
  }
  @media screen and (max-width: 768px) {
    max-width: 750px;
  }
  @media screen and (max-width: 690px) {
    max-width: 600px;
  }
  @media screen and (max-width: 600px) {
    max-width: 600px;
  }
  @media screen and (max-width: 450px) {
    max-width: 450px;
    padding: 0px;
  }
`;

export const CountTapImgBox = styled.div`
  display: block;
  @media screen and (max-width: 450px) {
    display: none;
  }
`;
export const CountTapImgBoxMobile = styled.div`
  display: none;
  @media screen and (max-width: 450px) {
    display: block;
  }
`;

// Tab별 Count Number
export const CountTabNum = styled.div`
  height: 16px;
  font-weight: 700;
  font-size: 22px;
  line-height: 80%;
  color: #000;
  @media screen and (max-width: 550px) {
    font-size: 19px;
    margin-top: -5px;
  }
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
  border-top: 1px solid rgba(0, 0, 0, 0.25);
  padding-top: 24px;

  @media screen and (max-width: 450px) {
    overflow: auto;
  }
`;

export const ListBox = styled.div`
  width: 100%;
  max-width: 750px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  place-items: center;

  @media screen and (max-width: 1280px) {
    grid-template-columns: repeat(2, 1fr);
    max-width: 500px;
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    max-width: 750px;
  }
  @media screen and (max-width: 690px) {
    grid-template-columns: repeat(2, 1fr);
    max-width: 750px;
  }
  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

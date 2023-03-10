import styled from 'styled-components';

export const Section = styled.div`
  width: 100%;
  background-color: gainsboro;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;

export const TabContainer = styled.div`
  display: flex;
  background-color: white;
  width: 100%;
  padding: 10px 20px 0 20px;
  @media screen and (max-width: 450px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-content: center;
    align-items: center;
  }
`;

export const TabBtn = styled.div<{ font: string; line: string }>`
  font-weight: 500;
  font-size: 15px;
  padding: 15px 35px;
  border-bottom: 2px solid ${(props) => props.line};
  color: ${(props) => props.font};
  cursor: pointer;
  @media screen and (max-width: 450px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    height: 35px;
  }
`;

export const PageHeader = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-bottom: 40px;
  padding-top: 15px;
  background-size: 105%;
  background-repeat: no-repeat;
  background-position: center;
  background-image: linear-gradient(
      rgba(78, 127, 250, 0.8),
      rgba(78, 127, 255, 0.8)
    ),
    url('/assets/detailHeaderBackground.png');
  @media screen and (max-width: 450px) {
    padding-right: 30px;
    padding-top: 30px;
    height: 200px;
  }
`;
export const HeaderTagBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-weight: 300;
  font-size: 13px;
  gap: 3px;

  @media screen and (max-width: 450px) {
    font-size: 12px;
  }
`;
export const HeaderTag = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 28px;
  color: white;
  @media screen and (max-width: 450px) {
    height: 22px;
  }
`;

export const HeaderTitle = styled.div`
  color: white;
  font-size: 25px;
  font-weight: 500;
  padding-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  line-height: normal;
  @media screen and (max-width: 450px) {
    font-size: 16px;
    padding-bottom: 5px;
  }
`;

export const HeaderAdres = styled.div`
  font-size: 14px;
  color: white;
  padding-bottom: 5px;
  font-weight: 300;
  @media screen and (max-width: 450px) {
    font-size: 12px;
    padding-bottom: 2px;
  }
`;

export const BmrkBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  padding-right: 20px;
  @media screen and (max-width: 450px) {
    display: none;
  }
`;

export const BmrkBoxMobile = styled.div`
  display: none;
  height: 30px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-left: 30px;
  margin-bottom: 10px;
  @media screen and (max-width: 450px) {
    display: flex;
  }
`;

export const BmrkBackBtn = styled.div`
  width: 25px;
  height: 25px;
  cursor: pointer;
  padding-left: 10px;
`;

export const BmrkBackBtnMobile = styled.div``;

export const BmrkBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  width: 120px;
  height: 28px;
  font-size: 12px;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

export const BmrkBtnMobile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  width: 25px;
  height: 25px;
  font-size: 12px;
  cursor: pointer;
  border: 1px solid white;
`;

export const Bmrk = styled.div`
  display: block;
  @media screen and (max-width: 450px) {
    display: none;
  }
`;

export const HeaderBmrk = styled.div`
  height: 32px;
  padding: 11px 13px;
  gap: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 12px;
  color: #ffffff;

  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 15px;

  @media screen and (max-width: 450px) {
    height: 26px;
    padding-top: 10px;
    margin-top: 5px;
    font-size: 10px;
    font-weight: 400;
  }
`;
export const HeaderBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: -35px;
  gap: 5px;

  @media screen and (max-width: 450px) {
    margin-left: 30px;
  }
`;

export const Container = styled.div`
  background-color: white;
  width: 100%;
  padding: 30px;
  @media screen and (max-width: 450px) {
    padding: 10px;
  }
`;

export const infoBox = styled.div`
  width: 110px;
  height: 40px;
  background-color: #3d7fff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  margin-top: 10px;
  cursor: pointer;
  font-size: 13px;
  padding: 10px;
  @media screen and (max-width: 450px) {
    font-size: 11px;
    width: 90px;
    height: 30px;
    border-radius: 7px;
  }
`;
export const info = styled.div`
  color: #8e8e8e;
  font-size: 14px;
  padding-left: 10px;
  line-height: 20px;

  @media screen and (max-width: 450px) {
    font-size: 11px;
  }
`;

// 표 제목
export const ArticleHead = styled.div`
  font-size: 19px;
  font-weight: 600;
  line-height: 30px;
  padding-top: 30px;
  padding-bottom: 10px;
  @media screen and (max-width: 450px) {
    font-size: 16px;
  }
`;

// 상세정보 테이블
export const ArticleBox = styled.table`
  width: 100%;
  min-width: 680px;
  text-align: center;
  border: 1px solid #f4f4f4;
  margin-bottom: 15px;
  font-size: 15px;
  border-right: 1px solid #e8eaef;
  border-top: 1.3px solid #8e8e8e;

  @media screen and (max-width: 450px) {
    font-size: 12px;
    min-width: 344px;
  }
`;

export const ArticleTitle = styled.td`
  background-color: #f0f4ff;
  height: 51px;
  text-align: center;
  vertical-align: middle;
  font-size: 16px;
  font-weight: 600;

  box-sizing: border-box;
  border-right: 1px solid #e8eaef;

  color: #356eff;
  @media screen and (max-width: 450px) {
    font-size: 14px;
  }
`;

export const BoxTitle = styled(ArticleTitle)`
  font-size: 15px;
  width: 20%;
  height: 50px;
  color: black;

  @media screen and (max-width: 450px) {
    font-size: 12px;
  }
`;

// 청약 일정
export const BoxTitleDate = styled(BoxTitle)`
  color: #356eff;
`;

// 공급 개요
// 번호
export const BoxTitleNumTitle = styled(BoxTitle)`
  width: 10%;
  height: 25px;
  font-weight: 400;
`;

// 01,02~
export const BoxTitleNum = styled(BoxTitleNumTitle)`
  height: 50px;
  border-bottom: 1px solid #e8eaef;
`;

// 공급개요 제목행
export const BoxTitleSupply = styled(BoxTitleNumTitle)`
  width: 20%;
`;

// 일반, 특별, 총계
export const BoxTitleDetail = styled(BoxTitleNumTitle)`
  height: 10px;
`;

// 표 안에 들어가는 정보
export const BoxContent = styled.td`
  width: 80%;
  height: 50px;
  padding-left: 10px;

  text-align: left;
  vertical-align: middle;
  font-weight: 400;
  font-size: 15px;

  border: 1px solid #e8eaef;

  @media screen and (max-width: 450px) {
    font-size: 12px;
  }
`;

// 기타사항
export const BoxTitleETC = styled(BoxTitleNumTitle)`
  width: 33.3%;
  height: 50px;
`;

// 특별공급
export const BoxTitleSpecialHead = styled(BoxTitleNumTitle)`
  height: 30px;
`;

// 다자녀, 신혼부부~
export const BoxTitleSpecial = styled(BoxTitleNumTitle)`
  width: 5%;
  height: 30px;
`;

// LH
export const BoxTitleLH = styled(BoxTitleNumTitle)`
  width: 20%;
  min-height: 50px;
  height: 100%;
`;

export const BoxContentDate = styled(BoxContent)`
  text-align: center;
  width: 20%;
  padding-left: 0px;
`;

export const BoxContentSupply = styled(BoxContentDate)`
  width: 10%;
`;

// 특별공급 주거면적
export const BoxContentHouseTY = styled(BoxTitleNum)`
  padding-left: 0px;
  width: 20%;
`;

// 기타사항
export const BoxContentETC = styled(BoxContentDate)`
  width: 33.3%;
`;

// LH 내용
export const BoxContentLH = styled(BoxContentDate)`
  width: 80%;
`;

export const SpecialHead = styled.div`
  border: 1px solid #e8eaef;
  width: 80%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.color};
  height: 65px;
`;

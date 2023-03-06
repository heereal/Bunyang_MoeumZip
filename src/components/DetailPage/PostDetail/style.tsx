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
  background-size: 100%;
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
`;

export const HeaderTitle = styled.div`
  color: white;
  font-size: 25px;
  font-weight: 500;
  padding-bottom: 10px;
  @media screen and (max-width: 450px) {
    font-size: 20px;
  }
`;

export const HeaderAdres = styled.div`
  font-size: 14px;
  color: white;
  padding-bottom: 5px;
  font-weight: 300;
  @media screen and (max-width: 450px) {
    font-size: 12px;
  }
`;

export const BmrkBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: right;
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
  justify-content: right;
  align-items: center;
  padding: 10px;
  padding-right: 20px;
  @media screen and (max-width: 450px) {
    display: flex;
  }
`;

export const BmrkBackBtnMobile = styled.div`
  position: absolute;
  top: 2%;
  left: 4%;
`;

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
  position: absolute;
  top: 2%;
  right: 5%;
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
  /* background: rgba(255, 255, 255, 0.3); */

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
  margin-left: 30px;
`;

export const Container = styled.div`
  background-color: white;
  width: 100%;
  padding: 30px;
  @media screen and (max-width: 450px) {
    padding: 10px;
  }
`;
export const ArticleBox = styled.div`
  border: 1px solid #f4f4f4;
  margin-bottom: 15px;
  font-size: 15px;
  border-top: 1.3px solid #8e8e8e;
  @media screen and (max-width: 450px) {
    font-size: 12px;
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
  @media screen and (max-width: 450px) {
    font-size: 11px;
  }
`;

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

export const ArticleTitle = styled.div`
  background-color: #f0f4ff;
  text-align: center;
  height: 51px;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: #356eff;
  @media screen and (max-width: 450px) {
    font-size: 14px;
  }
`;

export const Article = styled.div`
  text-align: center;
  font-size: 15px;
  font-weight: 600;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f4f4f4;
`;

export const BoxTitle = styled.div`
  font-size: 15px;
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.color};
  padding: 15px 0px 15px 0px;
  background-color: #f0f4ff;
  border-bottom: 1px solid #f8f8f9;
  @media screen and (max-width: 450px) {
    font-size: 12px;
  }
`;
export const BoxContent = styled.div`
  text-align: left;
  font-weight: 400;
  width: 80%;
  padding-left: 10px;
  font-size: 15px;
  @media screen and (max-width: 450px) {
    font-size: 12px;
  }
`;

export const Table = styled.div`
  display: flex;
  flex-direction: column;
  height: 204px;
`;
export const THead = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  height: 100%;
`;
export const Tbody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25%;
  height: 100%;
  border: 1px solid #e8eaef;
`;

export const TYHead = styled.div`
  border: 1px solid #f4f4f4;
  width: 20%;
`;

export const SPLtable = styled.div`
  width: 100%;
  display: flex;
`;

export const SPLhead = styled.div`
  width: 22.5%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.color};
  height: 50px;
  border: 1px solid #e8eaef;
  @media screen and (max-width: 460px) {
    font-size: 12px;
  }
`;
export const SPLNUM = styled.div`
  width: 10%;
  background-color: '#f4f4f4';
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #e8eaef;
  @media screen and (max-width: 450px) {
    font-size: 12px;
  }
`;

export const SPLTY = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  border-right: 1px solid #f4f4f4;
  .p {
    font-size: 20px;
    padding: 3px;
  }
  @media screen and (max-width: 1030px) {
    flex-direction: column;
  }
`;

export const TYDetail = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33%;
  border-right: 1px solid #f4f4f4;
  height: 100%;
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

export const SPLtitleBox = styled.div`
  width: 12.5%;
  font-size: 13;
  @media screen and (max-width: 450px) {
    font-size: 10px;
  }
`;

export const DetailMapContainer = styled.div`
  width: 100%;
  height: 200px;
`;
export const DetailMapBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
`;

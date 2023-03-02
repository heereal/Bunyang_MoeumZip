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
`;

export const TabBtn = styled.div<{ font: string; line: string }>`
  font-weight: 700;
  font-size: 15px;
  padding: 15px 35px;
  border-bottom: 5px solid ${(props) => props.line};
  color: ${(props) => props.font};
  cursor: pointer;
`;

export const PageHeader = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background: linear-gradient(
    0deg,
    rgba(61, 127, 255, 0.1),
    rgba(61, 127, 255, 0.1)
  );
  padding-bottom: 30px;
`;
export const HeaderTagBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-bottom: 10px;
  gap: 8px;
  font-weight: 700;
  font-size: 13px;
`;
export const HeaderTag = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 28px;

  background: #f1f6ff;
  border-radius: 10px;
  color: #3d7fff;
  padding: 10px;
`;

export const HeaderTitle = styled.div`
  font-size: 27px;
  font-weight: 700;
  padding-bottom: 10px;
`;

export const HeaderAdres = styled.div`
  font-size: 16px;
  color: #8e8e8e;
  padding-bottom: 5px;
`;

export const BmrkBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: right;
  align-items: center;
  padding: 10px;
`;

export const BmrBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  width: 36px;
  height: 36px;
  font-size: 20px;
  background-color: #3d7fff;
  padding-left: 1px;
  padding-top: 2px;
  cursor: pointer;
`;

export const HeaderBmrk = styled.div`
  height: 32px;
  padding: 11px 13px;
  gap: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 15px;
  color: #ffffff;
  background: #3d7fff;
  border-radius: 15px;
`;
export const HeaderBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: -20px;
  gap: 5px;
  margin-left: 30px;
`;

export const Container = styled.div`
  background-color: white;
  width: 100%;
  padding: 30px;
`;
export const ArticleBox = styled.div`
  border: 1px solid #f4f4f4;
  margin-bottom: 15px;
  font-size: 15px;
`;

export const ArticleHead = styled.div`
  font-size: 19px;
  font-weight: 700;
  line-height: 30px;
  padding-top: 30px;
  padding-bottom: 10px;
`;

export const ArticleTitle = styled.div`
  background-color: #f4f4f4;
  text-align: center;
  height: 51px;
  font-size: 16px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
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
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.color};
  padding: 15px 0px 15px 0px;
`;
export const BoxContent = styled.div`
  text-align: left;
  font-weight: 500;
  width: 80%;
  padding-left: 10px;
  font-size: 15px;
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
  border: 1px solid #f4f4f4;
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
`;
export const SPLNUM = styled.div`
  width: 10%;
  background-color: '#f4f4f4';
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SPLTY = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-right: 1px solid #f4f4f4;
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
  border: 1px solid #f4f4f4;
  width: 80%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.color};
  height: 65px;
`;
export const DetailMapContainer = styled.div`
  width: 100%;
  height: 200px;
  background-color: blue;
`;
export const DetailMapBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
  background-color: rebeccapurple;
`;

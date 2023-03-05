import styled from 'styled-components';

export const ListArticle = styled.article`
  max-width: 218px;
  height: 246px;
  min-width: 218px;

  background: #ffffff;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* margin-top: 26px; */
  /* margin-bottom: 15px; */
  margin-bottom: 40px;
  border-radius: 20px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  text-align: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  @media screen and (max-width: 600px) {
    width: 400px;
    max-width: 318px;
    height: 246px;
    min-width: 318px;
  }
`;

// 청약 정보 분류(청약 예정~)
export const TabInfo = styled.div`
  width: 100%;
  height: 22px;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
  padding: 5px 13px;
  gap: 5px;
`;

export const TabInfoText = styled.p`
  width: 100%;
  height: 14px;

  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  text-align: left;
  color: #8e8e8e;
`;

// 분양 주택명
export const CardTitleBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  padding: 0px 13px;
`;

export const CardTitle = styled.p`
  height: 19px;

  font-weight: 600;
  font-size: 16px;
  margin-top: 8px;
  margin-bottom: 3px;

  color: #000000;
`;

// 카테고리(분양형태, 주택형태, 지역)
export const CardCategoryBox = styled.div`
  width: 100%;
  height: 13px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-left: 13px;
  margin: 3px 0 17px 0;
`;

export const CardCategory = styled.div`
  max-width: 100%;
  height: 13px;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-right: 3px;

  font-weight: 500;
  font-size: 12px;

  text-align: left;
  color: #7b7b7b;
`;

// 청약일 박스
export const CardDateCategory = styled.div`
  width: 100%;
  height: 74px;
  margin-top: 15px;
  margin-bottom: -20px;
  background-color: #356eff;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

export const CardDateBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 3px;
  padding: 0px 13px;
  border-radius: 10px;
`;

export const CardDateTitle = styled.p`
  height: 14px;

  font-size: 12px;
  text-align: center;

  color: #ffffff;
  font-weight: 400;
`;
export const CardDate = styled(CardDateTitle)`
  font-weight: 600;
`;

// 청약일이 없을 때
export const NoDate = styled(CardDateTitle)`
  font-weight: 500;
  margin: 0 auto;
`;

// 면적
export const CardAreaContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 0 13px;
`;

export const CardAreaBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
`;

export const CardAreaTitle = styled(CardDateTitle)`
  color: #7b7b7b;
  font-size: 13px;
`;

export const CardArea = styled(CardDate)`
  text-align: right;
  font-size: 13px;

  color: #000000;
`;

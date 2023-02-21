import styled from 'styled-components';

export const ListArticle = styled.article`
  width: 224px;
  height: 261px;

  border-radius: 20px;
  background: #ffffff;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px;
  padding: 0 12px;
  text-align: center;

  cursor: pointer;
`;

// Home Card
export const CardHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const CardCategoryBox = styled.div`
  height: 22px;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 3px;
`;

export const CardCategory = styled.div`
  width: 45px;
  height: 22px;

  background: #f1f6ff;
  border-radius: 5px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  line-height: 12px;
  text-align: center;
  color: #3d7fff;
`;

// 분양 주택명
export const CardTitle = styled.p`
  height: 19px;

  display: flex;
  justify-content: flex-start;

  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  margin-top: 10px;
  margin-bottom: 12px;

  color: #000000;
`;

// 청약일 박스
export const CardDateBox = styled.div`
  width: 199px;
  height: 47px;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 0;
  gap: 3px;

  /* background: #f9fafb; */
  background-color: bisque;
  border-radius: 10px;

  margin: 6px 0;
`;

export const CardDateTitle = styled.p`
  height: 14px;

  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
  text-align: center;

  color: #7b7b7b;
`;
export const CardDate = styled.p`
  height: 14px;

  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 14px;
  text-align: center;

  color: #fc5a5a;
`;

// 면적
export const CardAreaBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 6px 0;
`;

export const CardAreaTitle = styled(CardDateTitle)``;

export const CardArea = styled(CardDate)`
  text-align: right;

  color: #000000;
`;

import styled from 'styled-components';

export const ListArticle = styled.article`
  width: 210px;
  height: 241px;

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

  position: relative;
  overflow: hidden;
`;

// Home Card
export const CardHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

// 카테고리(분양형태, 주택형태, 지역)
export const CardCategoryBox = styled.div`
  width: 80%;
  height: 22px;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 3px;
  margin-bottom: 5px;
`;

export const CardCategory = styled.div`
  width: 100%;
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

// 청약 정보 분류 띠
export const Ribbon = styled.div<{ bg: string }>`
  width: 50%;
  height: 11%;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  position: absolute;
  top: 4%;
  left: 64%;

  background-color: ${(props) => props.bg};
  transform: rotate(47.24deg);
`;

export const RibbonText = styled.p`
  width: 42px;
  height: 14px;

  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
  text-align: center;
  color: #ffffff;
`;

// 분양 주택명
export const CardTitleBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;

export const CardTitle = styled.p`
  height: 19px;

  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  margin-top: 8px;
  margin-bottom: 3px;

  color: #000000;
`;

// 청약일 박스
export const CardDateBox = styled.div`
  width: 180px;
  height: 47px;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 0;
  gap: 3px;

  background: #f9fafb;
  border-radius: 10px;

  margin: 3px 0;
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

// 청약일이 없을 때
export const NoDate = styled(CardDateTitle)`
  margin-top: 10px;
`;

// 면적
export const CardAreaBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
`;

export const CardAreaTitle = styled(CardDateTitle)``;

export const CardArea = styled(CardDate)`
  text-align: right;

  color: #000000;
`;

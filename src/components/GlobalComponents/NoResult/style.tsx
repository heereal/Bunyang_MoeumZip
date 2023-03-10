import styled from 'styled-components';

// 검색 결과가 없을 때
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: 768px) {
    margin-top: 25%;
  }
`;

export const NoResultTitle = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 27px;
  text-align: center;
  margin-top: 18px;
  margin-bottom: 8px;
`;

export const NoResultText = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 21px;
  text-align: center;
  margin-top: 10px;

  color: #8e8e8e;

  @media screen and (max-width: 450px) {
    font-size: 14px;
  }
`;

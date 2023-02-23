import styled from 'styled-components';

// 검색 결과가 없을 때
export const NoResultTitle = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 23px;
  line-height: 27px;
  text-align: center;

  color: #000000;

  margin-top: 31px;
`;

export const NoResultText = styled(NoResultTitle)`
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;

  color: #8e8e8e;
  margin-top: 12px;
`;

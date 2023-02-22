import styled from 'styled-components';
import * as S from '../components/MainPage/CountTabs/style';

export const ResultSection = styled.section`
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: #f7f7f7;
`;

export const TitleBox = styled.div`
  width: 80%;
  height: 50px;
  text-align: center;
  padding: 10px 0;
  margin: 10px 0;
`;

// 검색 결과가 있을 때 타이틀
export const ResultTitle = styled.p`
  font-size: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid black;

  span {
    font-size: 24px;
    font-weight: 700;
    color: #3d7eee;
    margin: 0 5px;
  }
`;

// 검색 결과가 없을 때
export const NoResultTitle = styled.p`
  /* width: 336px;
  height: 27px; */

  font-style: normal;
  font-weight: 600;
  font-size: 23px;
  line-height: 27px;
  text-align: center;

  color: #000000;

  margin-top: 31px;
`;

export const NoResultText = styled(NoResultTitle)`
  /* width: 196px;
  height: 21px; */

  font-weight: 500;
  font-size: 18px;
  line-height: 21px;

  color: #8e8e8e;
  margin-top: 12px;
`;

export const ResultListArticle = styled(S.ListSection)``;

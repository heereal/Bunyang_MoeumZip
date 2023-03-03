import styled from 'styled-components';
import * as S from '../components/MainPage/CountTabs/style';

export const ResultSection = styled.section`
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: #f8faff;
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
  font-size: 24px;
  font-weight: 500;
  padding-bottom: 12px;
  color: #1d2631;
  line-height: 1.4;

  span {
    font-weight: 700;
    color: #356eff;
    margin: 0 5px;
  }
`;

export const ResultListArticle = styled(S.ListSection)``;

export const ResultListBox = styled(S.ListBox)``;

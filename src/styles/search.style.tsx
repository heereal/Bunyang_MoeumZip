import styled from 'styled-components';
import * as S from '../components/MainPage/CountTabs/style';

export const ResultSection = styled.section`
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const TitleBox = styled.div`
  width: 80%;
  height: 50px;
  text-align: center;
  padding: 10px 0;
  margin: 10px 0;

  position: sticky;
  top: 0;
`;

export const ResultTitle = styled.p`
  font-size: 20px;

  span {
    font-size: 24px;
    color: #3d7eee;
    margin: 0 5px;
  }
`;

export const ResultListArticle = styled(S.ListSection)``;

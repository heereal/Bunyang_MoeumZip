import styled from 'styled-components';
import * as S from '../components/MainPage/style';

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

  border: 1px solid lavender;
`;

export const ResultTitle = styled.div`
  font-size: 24px;
`;

export const ResultListArticle = styled(S.ListSection)``;

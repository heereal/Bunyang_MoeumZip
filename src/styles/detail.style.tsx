import styled from 'styled-components';

export const DetailBody = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  @media screen and (max-width: 768px) {
    width: 100vw;
    height: 60%;
  }
`;

import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  height: 93vh;
  display: flex;
  padding: 50px 20px 0 20px;
  background: #F8F8F9;
  min-height: 600px;
  justify-content: center;

  @media screen and (max-width: 650px) {
    flex-direction: column;
  }
`;

import styled from 'styled-components';

export default function NotFound() {
  return (
    <Wrapper>
      <Title>404</Title>
      <Desc>찾을 수 없는 페이지입니다.</Desc>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  font-size: 70px;
  font-weight: bold;
  color: #3d7fff;
  margin-bottom: 10px;
`;

const Desc = styled.div`
  font-size: 30px;
`;

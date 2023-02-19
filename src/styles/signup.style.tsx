import styled from 'styled-components';

// TODO: nav 등 semantic tag로 변경하기
export const CategoryContainer = styled.div`
  border: 1px solid black;
  height: 250px;
  width: 400px;
  padding: 10px;
`;

export const CategoryBtn = styled.button<{ bg: string }>`
  height: 30px;
  width: 100px;
  background-color: ${(props) => props.bg};
  border: 1px solid lightgray;
  border-radius: 20px;
  margin: 2px;
  cursor: pointer;
`;

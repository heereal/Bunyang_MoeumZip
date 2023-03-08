import styled from 'styled-components';

export const AdminSection = styled.section`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const TitleBox = styled.div`
  width: 50%;
  height: 100px;
  border: 2px solid red;
  box-shadow: 1px 1px 5px 3px red;
  padding-top: 30px;
  border-radius: 10px;
  box-sizing: border-box;
  text-align: center;
`;

export const DbTimeTitle = styled.div`
  font-size: 30px;
  font-weight: bold;
`;

export const BtnSection = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ApiCallBtn = styled.button`
  background-color: transparent;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px;
`;

export const BtnText = styled(DbTimeTitle)``;

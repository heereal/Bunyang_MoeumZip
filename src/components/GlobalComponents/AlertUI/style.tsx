import styled from 'styled-components';

export const AlertBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const AlertBox = styled.div`
  width: 350px;
  height: 200px;
  border-radius: 10px;
  background-color: #fff;
  position: relative;
  bottom: 80px;
  box-shadow: 2px 2px 15px 2px blue;
`;

export const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 25px;
`;

export const AlertText = styled.p`
  font-size: 20px;
  font-weight: 800;
`;

export const BtnBox = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  gap: 15px;
`;

export const ConfirmBtn = styled.button`
  font-size: 16px;
  font-weight: 600;
  color: black;
  background: none;
  border: none;
  cursor: pointer;
`;

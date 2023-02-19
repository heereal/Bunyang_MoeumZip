import styled from 'styled-components';

export const AlertBack = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  z-index: 1000;
  top: 0%;
  left: 0%;
`;

export const AlertSection = styled.section`
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
  box-shadow: 2px 2px 15px 2px lightblue;
`;

export const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 25px;
`;

export const AlertText = styled.text`
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

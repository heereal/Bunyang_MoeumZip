import styled from 'styled-components';

export const HamModalBack = styled.div`
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  z-index: 500;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  position: absolute;
  top: 52%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const HamModalSection = styled.div`
  width: 207px;
  height: 100vh;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  position: relative;
  display: flex;
  flex-direction: column;

  button {
    position: absolute;
    left: 5%;
    top: 10px;
  }
`;

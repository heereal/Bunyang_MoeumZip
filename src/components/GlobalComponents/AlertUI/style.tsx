import styled from 'styled-components';

export const AlertBack = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  z-index: 1000;
  top: 0%;
  left: 0%;
  transform: translate(0%, 0%);
`;

export const AlertSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;

  z-index: 1000;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const AlertBox = styled.div`
  width: 100%;
  min-width: 386px;
  height: 200px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px 30px;

  background-color: #ffffff;
  box-shadow: 0px 4px 8px rgba(255, 255, 255, 0.5);
  border-radius: 16px;

  @media screen and (max-width: 450px) {
    width: 350px;
    min-width: 250px;
  }
`;

export const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const AlertText = styled.p`
  font-weight: 700;
  font-size: 22px;
  text-align: center;
  color: #000000;
  @media screen and (max-width: 450px) {
    font-size: 18px;
  }
`;

export const AlertDetailText = styled(AlertText)`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #7b7b7b;

  @media screen and (max-width: 450px) {
    font-size: 12px;
  }
`;

export const BtnBox = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 8px;
`;

export const AlertBtn = styled.button`
  all: unset;

  width: 326px;
  height: 25px;
  font-weight: 700;
  font-size: 14px;

  color: #ffffff;
  background: #356eff;
  border-radius: 10px;
  padding: 8px;
  gap: 10px;

  cursor: pointer;

  @media screen and (max-width: 450px) {
    width: 226px;
  }
`;

export const ConfirmBtn = styled(AlertBtn)`
  width: 89px;

  @media screen and (max-width: 450px) {
    width: 69px;
    padding: 5px;
  }
`;

export const CancelBtn = styled(ConfirmBtn)`
  background: #e8eaef;
  color: #7b7b7b;
`;

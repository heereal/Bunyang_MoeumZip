import styled from 'styled-components';

export const Container = styled.div`
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  width: 50%;

  @media screen and (max-width: 600px) {
    display: none;
  }
`;

export const BtnBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 106px;
  height: 30px;

  background: #e5edff;
  border-radius: 7px;
  padding: 8px;
  gap: 10px;

  font-weight: 600;
  font-size: 12px;
  line-height: 14px;

  display: flex;
  align-items: center;
  text-align: center;
`;

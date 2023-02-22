import styled from 'styled-components';

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1001;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContainer = styled.div`
  height: 450px;
  width: 420px;
  background-color: white;
  padding: 20px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CloseBtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

export const EditProfileContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px 0;
  border-radius: 20px;
  background-color: white;
  display: flex;
  flex-direction: column;

  position: relative;
  align-items: center;
  box-sizing: border-box;
`;

export const NicknameInput = styled.input`
  font-size: 16px;
  line-height: 31px;
  text-align: center;
  padding: 0 20px;
  height: 35px;
  width: 70%;
  border: 1px solid lightgray;
  margin-top: 20px;
  border-radius: 10px;

  :focus {
    outline: none;
  }
`;

export const ProfileBtn = styled.div`
  width: 70%;
  height: 40px;
  font-weight: 600;
  font-size: 13px;
  background: #f9fafb;
  border-radius: 20px;
  border: 1px solid lightgray;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #7b7b7b;
  margin-top: 20px;
  cursor: pointer;
`;

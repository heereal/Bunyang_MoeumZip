import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25%;
  height: 100%;
`;

export const EditProfileContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px 20px;
  border-radius: 20px;
  border: 1px solid lightgray;
  background-color: white;
  display: flex;
  flex-direction: column;

  position: relative;
  align-items: center;
  box-sizing: border-box;
`;

export const Nickname = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 31px;
  text-align: center;
  padding: 20px 0 5px 0;
`;

export const Email = styled.div`
  font-weight: 500;
  font-size: 14px;
  color: #7b7b7b;
  text-align: center;
  margin-bottom: 30px;
`;

export const ProfileBtn = styled.div`
  width: 90%;
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
  margin-bottom: 10px;
  cursor: pointer;
`;

export const Line = styled.div`
  height: 2px;
  background-color: #f4f4f4;
  width: 100%;
  margin-top: 20px;
`;

export const WithdrawUserBtnContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  height: 35px;
`;

export const WithdrawUserBtn = styled.div`
  color: #7b7b7b;
  font-size: 12px;
  cursor: pointer;
  position: absolute;
  left: 25px;
  margin-top: 25px;

  :hover {
    text-decoration: underline;
  }
`;

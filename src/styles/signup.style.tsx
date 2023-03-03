import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const SignUpContainer = styled.div`
  box-sizing: content-box;
  padding: 0 30px;
  width: 550px;
  display: flex;
  flex-direction: column;
  margin-top: 35px;
`;

export const SignUpDesc = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 45px;

  h1 {
    font-weight: 700;
    font-size: 20px;
    line-height: 42px;
    margin-bottom: 3px;
  }
  p {
    color: #8e8e8e;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
  }
`;

export const SubmitNicknameContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 35px;
`;

export const NicknameTitle = styled.div`
  font-weight: 800;
  font-size: 15px;
  line-height: 27px;
  padding-bottom: 12px;

  span {
    color: #ff3838;
  }
`;

export const InputBtnContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const NicknameInput = styled.input`
  width: 80%;
  height: 36px;
  border: 1.1px solid #bcc0cb;
  border-radius: 10px;
  padding: 0 15px;
  font-weight: 500;
  font-size: 12px;
  line-height: 24px;
  margin-right: 10px;

  :focus {
    outline: none;
    border: 1px solid #4f70e4;
  }
`;

export const CheckNicknameBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 36px;
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
  color: #7b7b7b;
  background: #e8eaef;
  border-radius: 20px;
  cursor: pointer;
`;

export const CategoryTitle = styled.h2`
  font-weight: 800;
  font-size: 15px;
  line-height: 27px;
  padding-bottom: 12px;
`;

export const SignUpBtnContainer = styled.div`
  padding-top: 10px;
  padding-bottom: 60px;
`;

export const SignUpBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 47px;
  background-color: #356eff;
  border-radius: 7px;
  color: white;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  cursor: pointer;
`;

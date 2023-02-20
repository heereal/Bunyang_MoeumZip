import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const SignUpContainer = styled.div`
  width: 650px;
  display: flex;
  flex-direction: column;
  margin-top: 60px;
  padding: 0 15px;
`;

export const SignUpDesc = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 65px;

  h1 {
    font-weight: 600;
    font-size: 35px;
    line-height: 42px;
  }
  p {
    color: #8e8e8e;
    font-weight: 500;
    font-size: 23px;
    line-height: 27px;
    margin-top: 30px;
  }
`;

export const SubmitNicknameContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 44px;
`;

export const NicknameTitle = styled.div`
  font-weight: 800;
  font-size: 23px;
  line-height: 27px;
  padding-bottom: 12px;

  span {
    color: #FF3838;
  }
`;

export const InputBtnContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const NicknameInput = styled.input`
  width: 80%;
  height: 50px;
  border: 2px solid #f4f4f4;
  border-radius: 15px;
  padding: 0 24px;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  margin-right: 19px;
`;

export const CheckNicknameBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 132px;
  height: 50px;

  font-weight: 500;
  font-size: 18px;
  line-height: 24px;

  color: #7b7b7b;
  background: #f4f4f4;
  border-radius: 15px;
  cursor: pointer;
`;

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

import { colors } from '@/common/colors';
import styled from 'styled-components';

export const Container = styled.section`
  width: 100%;
  height: 85vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const LogoBox = styled.div`
  display: flex;
  margin-bottom: 80px;
  gap: 10px;
`;

// Logo Text
export const LogoText = styled.div`
  font-family: 'PyeongChang-Regular';
  font-weight: 700;
  font-size: 32px;
  font-weight: 700;
  display: flex;
  align-items: center;
  letter-spacing: 0.02em;
  padding-left: 7px;
  padding-top: 5px;
  cursor: pointer;
  @media screen and (max-width: 600px) {
    font-size: 15px;
    padding-top: 3px;
  }
`;

export const FormBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 450px;
  margin-bottom: 20px;
`;

export const FormText = styled.div`
  width: 35%;
  font-size: 22px;
  font-family: 'PyeongChang-Regular';
  font-weight: 700;
`;

export const FormInput = styled.input`
  border: 1px solid ${colors.INPUT_BORDER_COLOR};
  width: 65%;
  border-radius: 4px;
  font-size: 22px;
  font-family: 'PyeongChang-Regular';
  font-weight: 700;
  padding: 5px;
`;

export const FormSubmit = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
`;
export const LoginButton = styled.button`
  all: unset;
  cursor: pointer;
  width: 30%;
  text-align: center;
  border: 1px solid ${colors.SIGNATURE_BLUE};
  border-radius: 4px;
  font-size: 22px;
  font-family: 'PyeongChang-Regular';
  font-weight: 700;
  padding: 10px;
  background-color: ${colors.SIGNATURE_BLUE};
  color: ${colors.WHITE};
`;

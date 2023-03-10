import styled from 'styled-components';

export const AdminSection = styled.section`
  width: 100vw;
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-bottom: 30px;
`;

export const AdminLeftSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 450px;
`;

export const BtnSection = styled.section`
  /* width: 100%; */
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid lightgray;
  border-radius: 20px;
  width: 100%;
  margin-bottom: 20px;
  padding-bottom: 10px;
`;

export const ApiCallBtn = styled.button`
  background-color: transparent;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const BtnText = styled.div`
  font-size: 16px;
  font-weight: 700;
`;

export const TableSection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h2`
  padding: 20px 0;
  font-size: 20px;
`;

export const Table = styled.table`
  border: 1px solid #e8eaef;
  margin-bottom: 40px;
`;

export const TableRow = styled.tr`
  border: 1px solid #e8eaef;
`;

export const TableHead = styled.th`
  font-weight: 700;
  font-size: 15px;
  padding: 15px 10px;
  background-color: #f0f4ff;
  border: 1px solid #e8eaef;
`;

export const TableData = styled.td`
  border: 1px solid #e8eaef;
  padding: 15px 10px;
  text-align: center;
  font-size: 15px;
  line-height: 20px;

  span {
    font-size: 13px;
    color: gray;
  }
`;

export const AdminInputContainer = styled.div`
  width: 700px;
  margin-bottom: 15px;
  display: flex;
`;

export const DailyLogInput = styled.input`
  width: 80%;
  height: 36px;
  margin-right: 20px;
  border: 1px solid gray;
  border-radius: 5px;
  padding: 0 15px;
  font-size: 15px;

  :focus {
    outline: none;
    border: 1px solid #4f70e4;
  }
`;

export const DailyLogSubmitBtn = styled.div`
  width: 18%;
  height: 36px;
  border-radius: 10px;
  font-size: 17px;
  background-color: #356eff;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const SpinnerWrapper = styled.div`
  width: 100%;
  height: 93vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
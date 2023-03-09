import styled from 'styled-components';

export const AdminSection = styled.section`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const BtnSection = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

export const ApiCallBtn = styled.button`
  background-color: transparent;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const BtnText = styled.div`
  font-size: 20px;
`;

export const TableSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
`;

export const Title = styled.h2`
  padding: 20px 0;
`;

export const Table = styled.table`
  border: 1px solid #e8eaef;
  width: 600px;
  margin-bottom: 40px;
`;

export const TableRow = styled.tr`
  border: 1px solid #e8eaef;
`;

export const TableHead = styled.th`
  font-weight: 700;
  font-size: 15px;
  padding: 15px 25px;
  background-color: #f0f4ff;
  border: 1px solid #e8eaef;
`;

export const TableData = styled.td`
  border: 1px solid #e8eaef;
  padding: 15px 25px;
  text-align: center;
  font-size: 15px;

  span {
    font-size: 13px;
    color: gray;
  }
`;

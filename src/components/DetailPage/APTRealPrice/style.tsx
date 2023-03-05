import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  width: 100%;
`;

export const Table = styled.table`
  border: 1px solid #e8eaef;
  margin-top: 40px;
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

import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  width: 100%;
`;

export const Table = styled.table`
  border: 1px solid gray;
`;

export const TableRow = styled.tr`
  border: 1px solid #aaa;
`;

export const TableHead = styled.th`
  font-weight: 700;
  padding: 15px 30px;
  background-color: lightgray;
`;

export const TableData = styled.td`
  border: 1px solid #aaa;
  padding: 15px 30px;
  text-align: center;
`;

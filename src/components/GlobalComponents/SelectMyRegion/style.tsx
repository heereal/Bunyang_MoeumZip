import styled from 'styled-components';

export const CategoryContainer = styled.div<{ path: string }>`
  box-shadow: ${(props) =>
    props.path === '/signup' ? 'none' : '0px 4px 4px rgba(0, 0, 0, 0.25)'};
  padding: ${(props) => (props.path === '/signup' ? 0 : '30px 30px 25px 30px')};
  border-radius: 20px;
  margin-bottom: 35px;
  background-color: white;
  width: 100%;
  gap: 8px;
  display: flex;
  flex-wrap: wrap;
`;

export const CategoryBtn = styled.button<CategoryBtnStyledProps>`
  padding: 8px 9px;
  background-color: ${(props) => props.bg};
  border: 2px solid ${(props) => props.border};
  border-radius: 7px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  line-height: 14px;
  color: ${(props) => props.text};
  margin-bottom: 8px;

  @media screen and (max-width: 650px) {
    font-size: 13px;
    border: 1px solid ${(props) => props.border};
  }
`;

export const SelectAllOrNoneContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
  padding-right: 10px;
  width: 100%;
`;

export const SelectBtn = styled.div<{ color: string }>`
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  text-decoration-line: underline;
  text-underline-position: under;
  color: ${(props) => props.color};
  cursor: pointer;
  display: flex;
  align-items: center;

  span {
    margin-left: 6px;
  }

  @media screen and (max-width: 650px) {
    font-size: 12px;
  }
`;

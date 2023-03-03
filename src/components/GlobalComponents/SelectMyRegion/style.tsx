import styled from 'styled-components';

// TODO: nav 등 semantic tag로 변경하기
export const CategoryContainer = styled.div<{ width: string }>`
  border: 1px solid rgb(232, 234, 239);
  border-radius: 20px;
  padding: 19px 19px 22px 19px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-bottom: 35px;
  background-color: white;
  width: ${(props) => props.width};
`;

export const CategoryBtn = styled.button<CategoryBtnStyledProps>`
  padding: 6px 9px;
  background-color: ${(props) => props.bg};
  border: 2px solid ${(props) => props.border};
  border-radius: 7px;
  cursor: pointer;
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
  color: ${(props) => props.text};
  margin-bottom: 8px;
  margin-right: 8px;
`;

export const SelectAllOrNoneContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
`;

export const SelectBtn = styled.div<{color: string}>`
  font-weight: 600;
  font-size: 10px;
  line-height: 12px;
  text-decoration-line: underline;
  text-underline-position: under;
  color: ${(props) => props.color};
  cursor: pointer;
  display: flex;
  align-items: center;

  span {
    margin-left: 6px;
  }
`;

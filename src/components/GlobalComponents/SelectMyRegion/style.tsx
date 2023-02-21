import styled from 'styled-components';

// TODO: nav 등 semantic tag로 변경하기
export const CategoryContainer = styled.div`
  border: 2px solid #f4f4f4;
  border-radius: 20px;
  padding: 24px 28px;
  margin-bottom: 44px;
  background-color: white;
`;

export const CategoryBtn = styled.button<CategoryBtnStyledProps>`
  padding: 0 17px;
  height: 35px;
  background-color: ${(props) => props.bg};
  border: 2px solid ${(props) => props.border};
  border-radius: 10px;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  color: ${(props) => props.text};
  margin-bottom: 12px;
  margin-right: 13px;
`;

export const SelectAllOrNoneContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

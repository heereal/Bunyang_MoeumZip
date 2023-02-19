import styled from 'styled-components';

export const CategorySection = styled.section`
  width: 100%;
  height: 50px;
  background-color: bisque;
  display: flex;
  flex-direction: column;
  z-index: 1000;
`;

// TODO: Main Tabs CSS 참고해서 변경
export const CategoryTabList = styled.ul`
  display: flex;
  flex-direction: row;
`;

export const CategoryTabs = styled.li`
  list-style: none;
`;

export const CategoryTab = styled.button`
  width: 80px;
`;

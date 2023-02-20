import styled from 'styled-components';

export const CategorySection = styled.section`
  width: 100%;
  height: 57px;
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  z-index: 100;
`;

// 카테고리 Tabs
export const CategoryTabList = styled.ul`
  height: 75px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: fixed;
  margin-left: 57px;
`;

export const CategoryTabs = styled.li`
  list-style: none;
`;

export const RegionTab = styled.button<{ bd: string }>`
  width: 80px;
  height: 49px;
  background-color: transparent;
  border: 1px solid;
  border-color: ${(props) => props.bd};
  border-radius: 10px;
  margin-right: 16px;

  cursor: pointer;
`;

export const TypeTab = styled(RegionTab)`
  width: 110px;
`;

export const TabNameBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TabName = styled.p<{ color: string }>`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => props.color};

  :hover {
    color: #3d7fff;
  }
`;

// 지역 및 분양형태 카테고리 선택
export const CategoryContainer = styled.div`
  height: 350px;
  width: 360px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  padding: 5px;
  position: absolute;
  top: 135px;
  left: 57px;
  border: 1px solid black;
  border-radius: 20px;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background-color: #ffffff;
`;

export const CategoryBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  padding: 3px 0;
  box-sizing: border-box;
  position: absolute;
  width: 335px;
  height: 46px;
  left: 12px;
  top: 12px;
  gap: 13px;
`;

export const CategoryBtn = styled.button<{ bg: string; bd: string }>`
  background-color: ${(props) => props.bg};
  border-color: ${(props) => props.bd};
  border-radius: 10px;
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 17px;
  gap: 10px;

  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: #7b7b7b;

  cursor: pointer;

  :hover {
    color: #3d7fff;
    background-color: #f1f6ff;
  }
`;

// 초기화 및 전체 선택 버튼
export const CommonBtnBox = styled.div`
  width: 300px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 290px;
`;

export const CategoryCommonBtn = styled(CategoryBtn)<any>`
  text-decoration: underline;
  border: none;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
`;

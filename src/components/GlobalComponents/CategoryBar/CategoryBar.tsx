import * as S from './style';
import { useState } from 'react';

// 1. drop down 토글 버튼 만들기
// 2. 지역, 분양형태에 버튼 리스트 넣기
// 3. 다중 선택 적용 및 유지
const CategoryBar = () => {
  const [isToggleOpen, setIsToggleOpen] = useState<boolean>(false);
  const [currentTab, SetCurrentTab] = useState(0);

  const openToggleHandler = () => {
    setIsToggleOpen(true);
  };

  // TODO: 토글 밖을 클릭 했을 때 토글 닫히게...
  // 선택 완료 시 토글 닫힘
  const chooseDoneHandler = () => {
    setIsToggleOpen(false);
  };

  const categoryList = [
    { name: '지역', category: ['서울', '경기'] },
    { name: '분양 형태', category: ['공공분양', '국민임대'] },
  ];

  const selectedCategory = (index: number) => {
    SetCurrentTab(index);
  };

  return (
    <S.CategorySection>
      <div>
        {categoryList.map((item, index) => (
          <li key={item.name} onClick={() => selectedCategory(index)}>
            <button>{item.name}</button>
            <ul>
              <li>
                <button>전체 선택</button>
              </li>
              <li>
                <button>초기화</button>
              </li>
            </ul>
          </li>
        ))}

        {/* FIXME: 여기가 아닌 듯..?  */}
        <div>
          {categoryList[currentTab].category.map((item: any) => {
            return <button key={item}>{item}</button>;
          })}
        </div>

        {/* <ul>
          <li>
            <button>전체 선택</button>
          </li>
          <li>
            <button>서울시</button>
          </li>
          <li>
            <button>경상북도</button>
          </li>
          <li>
            <button>전라남도</button>
          </li>
          <li>
            <button>제주도</button>
          </li>
          <li>
            <button>선택완료</button>
          </li>
        </ul>
      </div>
      <div>
        <button onClick={openToggleHandler}>분양형태</button>
        {isToggleOpen && (
          <ul>
            <li>
              <button>전체 선택</button>
            </li>
            <li>
              <button>공공분양</button>
            </li>
            <li>
              <button>행복주택</button>
            </li>
            <li>
              <button>민간분양</button>
            </li>
            <li>
              <button>국민임대</button>
            </li>
            <li>
              <button onClick={chooseDoneHandler}>선택완료</button>
            </li>
          </ul>
        )} */}
      </div>
    </S.CategorySection>
  );
};

export default CategoryBar;

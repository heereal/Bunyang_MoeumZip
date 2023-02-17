// TODO: 카테고리 컴포넌트 분리 후 수정하기
// import * as S from './style';
import * as S from '../../../styles/signup.style';
import * as S2 from './style';
import { useState, useEffect } from 'react';
import { regionArray, typesArray } from '@/common/categoryList';
import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedCategoryList } from '@/store/selectors';

const CategoryBar = () => {
  const [isToggleOpen, setIsToggleOpen] = useState<boolean>(false);
  const [currentTab, SetCurrentTab] = useState(0);

  // 유저가 선택한 카테고리 필터링 리스트
  const [myRegionArray, setMyRegionArray] = useState<any[]>([]);
  const [myTypeArray, setMyTypeArray] = useState<any[]>([]);

  // 유저가 선택한 지역, 분양형태가 바뀔 때마다 recoil defaultValue를 combineUserCtList로 업데이트
  const [selectedList, setSelectedList] = useRecoilState(selectedCategoryList);

  // 유저가 선택한 카테고리 통합 리스트
  const combineUserCtList: any = [];
  myRegionArray.map((item) => combineUserCtList.push(item));
  myTypeArray.map((item) => combineUserCtList.push(item));

  useEffect(() => {
    setSelectedList(combineUserCtList);
  }, [myRegionArray, myTypeArray]);

  // 지역, 분양형태 카테고리 Tabs를 누를 때마다 Open, Close 전환
  const openToggleHandler = () => {
    setIsToggleOpen(!isToggleOpen);
  };

  // 카테고리 Tab 분류
  const categoryList = [
    { name: '지역', category: regionArray },
    { name: '분양 형태', category: typesArray },
  ];

  // 선택한 카테고리 Tab으로 변경
  const selectedCategory = (index: number) => {
    SetCurrentTab(index);
  };

  // FIXME: 컴포넌트 하나로 썼을 때 전체 선택, 초기화 문제
  // 1. 컴포넌트 하나로 쓰기 2. 각각 따로 하기(원본 필터) -> 컴포넌트 분리

  return (
    <S2.CategorySection>
      <S2.CategoryTabList>
        {categoryList.map((item, index) => (
          <S2.CategoryTab
            key={item.name}
            onClick={() => selectedCategory(index)}
          >
            <button onClick={openToggleHandler}>{item.name}</button>
          </S2.CategoryTab>
        ))}
      </S2.CategoryTabList>
      {/*  지역 카테고리 선택 */}
      {isToggleOpen && categoryList[currentTab].category === regionArray && (
        <S.CategoryContainer>
          {regionArray.map((region, index) =>
            region && myRegionArray.includes(region) ? (
              <S.CategoryBtn
                onClick={() =>
                  setMyRegionArray(
                    myRegionArray.filter((item) => item !== region),
                  )
                }
                key={index}
                bg={'lightblue'}
              >
                {region}
              </S.CategoryBtn>
            ) : (
              <S.CategoryBtn
                onClick={() => setMyRegionArray([...myRegionArray, region])}
                key={index}
                bg={'transparent'}
              >
                {region}
              </S.CategoryBtn>
            ),
          )}
          <S.CategoryBtn
            bg={'transparent'}
            onClick={() => setMyRegionArray([])}
          >
            전체 초기화
          </S.CategoryBtn>
          <S.CategoryBtn
            bg={'transparent'}
            onClick={() => setMyRegionArray(regionArray)}
          >
            전체 선택
          </S.CategoryBtn>
        </S.CategoryContainer>
      )}

      {/* 분양 형태 카테고리 선택 */}
      {isToggleOpen && categoryList[currentTab].category === typesArray && (
        <S.CategoryContainer>
          {typesArray.map((type, index) =>
            type && myTypeArray.includes(type) ? (
              <S.CategoryBtn
                onClick={() =>
                  setMyTypeArray(myTypeArray.filter((item) => item !== type))
                }
                key={index}
                bg={'lightblue'}
              >
                {type}
              </S.CategoryBtn>
            ) : (
              <S.CategoryBtn
                onClick={() => setMyTypeArray([...myTypeArray, type])}
                key={index}
                bg={'transparent'}
              >
                {type}
              </S.CategoryBtn>
            ),
          )}
          <S.CategoryBtn bg={'transparent'} onClick={() => setMyTypeArray([])}>
            전체 초기화
          </S.CategoryBtn>
          <S.CategoryBtn
            bg={'transparent'}
            onClick={() => setMyTypeArray(typesArray)}
          >
            전체 선택
          </S.CategoryBtn>
        </S.CategoryContainer>
      )}
    </S2.CategorySection>
  );
};

export default CategoryBar;

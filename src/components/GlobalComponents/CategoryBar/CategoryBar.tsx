// TODO: 카테고리 컴포넌트 분리 후 수정하기
// import * as S from './style';
import * as S from '../../../styles/signup.style';
import * as S2 from './style';
import { useState } from 'react';
import { regionArray, typesArray } from '@/common/categoryList';

const CategoryBar = () => {
  const [isToggleOpen, setIsToggleOpen] = useState<boolean>(false);
  const [currentTab, SetCurrentTab] = useState(0);

  // 유저가 선택한 카테고리 필터링 리스트
  const [myRegionArray, setMyRegionArray] = useState<any[]>([]);
  const [myTypeArray, setMyTypeArray] = useState<any[]>([]);

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
    <S2.CategorySection>
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
        {/* TODO: 카테고리 선택 - 컴포넌트 분리 -> 회원가입, 마이페이지, 카테고리바에서 쓰임 */}
        {/* 지역 카테고리 선택 */}
        <h3>지역</h3>
        <S.CategoryContainer>
          {regionArray.map((region, index) =>
            region && myRegionArray.includes(region) ? (
              <S.CatrgoryBtn
                onClick={() =>
                  setMyRegionArray(
                    myRegionArray.filter((item) => item !== region),
                  )
                }
                key={index}
                bg={'lightblue'}
              >
                {region}
              </S.CatrgoryBtn>
            ) : (
              <S.CatrgoryBtn
                onClick={() => setMyRegionArray([...myRegionArray, region])}
                key={index}
                bg={'transparent'}
              >
                {region}
              </S.CatrgoryBtn>
            ),
          )}
          <S.CatrgoryBtn
            bg={'transparent'}
            onClick={() => setMyRegionArray([])}
          >
            전체 초기화
          </S.CatrgoryBtn>
          <S.CatrgoryBtn
            bg={'transparent'}
            onClick={() => setMyRegionArray(regionArray)}
          >
            전체 선택
          </S.CatrgoryBtn>
        </S.CategoryContainer>

        {/* 분양 형태 카테고리 선택 */}
        <h3>분양 형태</h3>
        <S.CategoryContainer>
          {typesArray.map((type, index) =>
            type && myTypeArray.includes(type) ? (
              <S.CatrgoryBtn
                onClick={() =>
                  setMyTypeArray(myTypeArray.filter((item) => item !== type))
                }
                key={index}
                bg={'lightblue'}
              >
                {type}
              </S.CatrgoryBtn>
            ) : (
              <S.CatrgoryBtn
                onClick={() => setMyTypeArray([...myTypeArray, type])}
                key={index}
                bg={'transparent'}
              >
                {type}
              </S.CatrgoryBtn>
            ),
          )}
          <S.CatrgoryBtn bg={'transparent'} onClick={() => setMyTypeArray([])}>
            전체 초기화
          </S.CatrgoryBtn>
          <S.CatrgoryBtn
            bg={'transparent'}
            onClick={() => setMyTypeArray(typesArray)}
          >
            전체 선택
          </S.CatrgoryBtn>
        </S.CategoryContainer>
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
    </S2.CategorySection>
  );
};

export default CategoryBar;

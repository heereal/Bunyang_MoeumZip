// TODO: 카테고리 컴포넌트 분리 후 수정하기
// import * as S from './style';
import * as S from '../../../styles/signup.style';
import * as S2 from './style';
import { useState } from 'react';
import { regionArray, typesArray } from '@/common/categoryList';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';

const CategoryBar = () => {
  const [isToggleOpen, setIsToggleOpen] = useState<boolean>(false);
  const [currentTab, SetCurrentTab] = useState(0);

  // 유저가 선택한 카테고리 필터링 리스트
  const [myRegionArray, setMyRegionArray] = useState<any[]>([]);
  const [myTypeArray, setMyTypeArray] = useState<any[]>([]);

  // 지역, 분양형태를 클릭하면 카테고리 선택 창이 열림
  const openToggleHandler = () => {
    setIsToggleOpen(true);
  };

  // TODO: 토글 밖을 클릭 했을 때 토글 닫히게...
  // 선택 완료 시 토글 닫힘??
  const chooseDoneHandler = () => {
    setIsToggleOpen(false);
  };

  // 카테고리 Tab 분류
  const categoryList = [
    { name: '지역', category: regionArray },
    { name: '분양 형태', category: typesArray },
  ];

  // 선택한 카테고리 Tab으로 변경시켜주는 함수
  const selectedCategory = (index: number) => {
    SetCurrentTab(index);
  };

  // TODO: 카테고리 선택 - 컴포넌트 분리 -> 회원가입, 마이페이지, 카테고리바에서 쓰임
  // FIXME: 컴포넌트 하나로 썼을 때 전체 선택, 초기화 문제
  // 1. 컴포넌트 하나로 쓰기 2. 각각 따로 하기(원본 필터) -> 컴포넌트 분리

  return (
    <S2.CategorySection>
      <div>
        {categoryList.map((item, index) => (
          <li key={item.name} onClick={() => selectedCategory(index)}>
            <button>{item.name}</button>
          </li>
        ))}
        <S.CategoryContainer>
          {categoryList[currentTab].category === regionArray ? (
            // 지역 카테고리 선택
            <>
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
            </>
          ) : (
            // 분양 형태 카테고리 선택
            <>
              {typesArray.map((type, index) =>
                type && myTypeArray.includes(type) ? (
                  <S.CatrgoryBtn
                    onClick={() =>
                      setMyTypeArray(
                        myTypeArray.filter((item) => item !== type),
                      )
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
              <S.CatrgoryBtn
                bg={'transparent'}
                onClick={() => setMyTypeArray([])}
              >
                전체 초기화
              </S.CatrgoryBtn>
              <S.CatrgoryBtn
                bg={'transparent'}
                onClick={() => setMyTypeArray(typesArray)}
              >
                전체 선택
              </S.CatrgoryBtn>
            </>
          )}
        </S.CategoryContainer>
      </div>
    </S2.CategorySection>
  );
};

export default CategoryBar;

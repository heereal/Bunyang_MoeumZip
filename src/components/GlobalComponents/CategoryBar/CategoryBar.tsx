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
  // const [myRegionArray, setMyRegionArray] = useState<any[]>([]);
  // const [myTypeArray, setMyTypeArray] = useState<any[]>([]);

  const [selectedUsersCategory, setSelectedUsersCategory] = useState<any[]>([]);
  console.log(selectedUsersCategory);

  const openToggleHandler = () => {
    setIsToggleOpen(true);
  };

  // TODO: 토글 밖을 클릭 했을 때 토글 닫히게...
  // 선택 완료 시 토글 닫힘
  const chooseDoneHandler = () => {
    setIsToggleOpen(false);
  };

  // 카테고리 분류
  const categoryList = [
    { name: '지역', category: regionArray },
    { name: '분양 형태', category: typesArray },
  ];

  // 선택한 카테고리로 변경시켜주는 함수
  const selectedCategory = (index: number) => {
    SetCurrentTab(index);
  };

  {
    /* TODO: 카테고리 선택 - 컴포넌트 분리 -> 회원가입, 마이페이지, 카테고리바에서 쓰임 */
  }
  return (
    <S2.CategorySection>
      <div>
        {categoryList.map((item, index) => (
          <li key={item.name} onClick={() => selectedCategory(index)}>
            <button>{item.name}</button>
          </li>
        ))}
        {/* FIXME: 전체 선택, 초기화 문제 - 1. 컴포넌트 하나로 쓰기 2. 각각 따로 하기(원본 필터) -> 컴포넌트 분리  */}
        <S.CategoryContainer>
          {categoryList[currentTab].category.map((type, index) =>
            type && selectedUsersCategory.includes(type) ? (
              <S.CatrgoryBtn
                onClick={() =>
                  setSelectedUsersCategory(
                    selectedUsersCategory.filter((item) => item !== type),
                  )
                }
                key={index}
                bg={'lightblue'}
              >
                {type}
              </S.CatrgoryBtn>
            ) : (
              <S.CatrgoryBtn
                onClick={() =>
                  setSelectedUsersCategory([...selectedUsersCategory, type])
                }
                key={index}
                bg={'transparent'}
              >
                {type}
              </S.CatrgoryBtn>
            ),
          )}
          {categoryList[currentTab].category === regionArray ? (
            <>
              {/* TODO:  초기화 시 리스트에서 지역만 없애기 */}
              <S.CatrgoryBtn
                bg={'transparent'}
                onClick={
                  () => setSelectedUsersCategory([])
                  // selectedUsersCategory.filter((item) =>
                  //   regionArray.includes(item),
                  // ),
                }
              >
                전체 초기화
              </S.CatrgoryBtn>
              {/* TODO: 전체 선택 시 기존 리스트 유지 + 전체 지역 */}
              <S.CatrgoryBtn
                bg={'transparent'}
                onClick={() =>
                  setSelectedUsersCategory(
                    // ...selectedUsersCategory,
                    regionArray,
                  )
                }
              >
                전체 선택
              </S.CatrgoryBtn>
            </>
          ) : (
            <>
              {/* TODO:  초기화 시 리스트에서 분양형태만 없애기 */}

              <S.CatrgoryBtn
                bg={'transparent'}
                onClick={() => setSelectedUsersCategory([])}
              >
                전체 초기화
              </S.CatrgoryBtn>
              <S.CatrgoryBtn
                bg={'transparent'}
                onClick={() => setSelectedUsersCategory(typesArray)}
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

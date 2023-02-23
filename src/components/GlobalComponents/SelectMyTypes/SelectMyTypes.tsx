import { typesArray } from '@/common/categoryList';
import * as S from '../SelectMyRegion/style';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentUserState, myTypeArrayState } from '@/store/selectors';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { FaUndo } from 'react-icons/fa';
import { useEffect } from 'react';

const SelectMyTypes = ({ width }: SelectCategoryProps) => {
  // 유저가 선택한 카테고리 필터링 리스트
  const [myTypeArray, setMyTypeArray] = useRecoilState<any>(myTypeArrayState);

  // 현재 로그인한 유저의 firestore 유저 정보
  const currentUser = useRecoilValue(currentUserState);

  useEffect(() => {
    setMyTypeArray(currentUser.types)
  }, []);

  return (
    <S.CategoryContainer width={width}>
      {typesArray.map((type, index) =>
        type && myTypeArray?.includes(type) ? (
          <S.CategoryBtn
            onClick={() =>
              setMyTypeArray(myTypeArray.filter((item: any) => item !== type))
            }
            key={index}
            bg={'#F1F6FF'}
            text={'#3D7FFF'}
            border={'#3D7FFF'}
          >
            {type}
          </S.CategoryBtn>
        ) : (
          <S.CategoryBtn
            onClick={() => setMyTypeArray([...myTypeArray, type])}
            key={index}
            bg={'white'}
            text={'#7b7b7b'}
            border={'#F4F4F4'}
          >
            {type}
          </S.CategoryBtn>
        ),
      )}
      <S.SelectAllOrNoneContainer>
        <S.SelectBtn onClick={() => setMyTypeArray(typesArray)}>
          <BsFillCheckCircleFill size="15" />
          <span>전체 선택</span>
        </S.SelectBtn>
        <S.SelectBtn onClick={() => setMyTypeArray([])}>
          <FaUndo size="13" />
          <span>전체 초기화</span>
        </S.SelectBtn>
      </S.SelectAllOrNoneContainer>
    </S.CategoryContainer>
  );
};

export default SelectMyTypes;

import { typesArray } from '@/common/categoryList';
import * as S from '../SelectMyRegion/style';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentUserState, myTypeArrayState } from '@/store/selectors';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { FaUndo } from 'react-icons/fa';
import { useEffect } from 'react';

const SelectMyTypes = ({ path }: SelectCategoryProps) => {
  // 유저가 선택한 카테고리 필터링 리스트
  const [myTypeArray, setMyTypeArray] = useRecoilState<any>(myTypeArrayState);

  // 현재 로그인한 유저의 firestore 유저 정보
  const currentUser = useRecoilValue(currentUserState);

  useEffect(() => {
    setMyTypeArray(currentUser.types);
    // eslint-disable-next-line
  }, []);

  return (
    <S.CategoryContainer path={path}>
      {typesArray.map((type, index) =>
        type && myTypeArray?.includes(type) ? (
          <S.CategoryBtn
            onClick={() =>
              setMyTypeArray(myTypeArray.filter((item: any) => item !== type))
            }
            key={index}
            bg={'#F8FAFF'}
            text={'#356EFF'}
            border={'#356EFF'}
          >
            {type}
          </S.CategoryBtn>
        ) : (
          <S.CategoryBtn
            onClick={() => setMyTypeArray([...myTypeArray, type])}
            key={index}
            bg={'white'}
            text={'#505050'}
            border={'#D8D8D8'}
          >
            {type}
          </S.CategoryBtn>
        ),
      )}
      <S.SelectAllOrNoneContainer>
        <S.SelectBtn
          color={myTypeArray?.length === 12 ? '#356EFF' : '#505050'}
          onClick={() => setMyTypeArray(typesArray)}
        >
          <BsFillCheckCircleFill size="13" />
          <span>전체 선택</span>
        </S.SelectBtn>
        <S.SelectBtn
          color={myTypeArray?.length === 0 ? '#356EFF' : '#505050'}
          onClick={() => setMyTypeArray([])}
        >
          <FaUndo size="11" />
          <span>전체 초기화</span>
        </S.SelectBtn>
      </S.SelectAllOrNoneContainer>
    </S.CategoryContainer>
  );
};

export default SelectMyTypes;

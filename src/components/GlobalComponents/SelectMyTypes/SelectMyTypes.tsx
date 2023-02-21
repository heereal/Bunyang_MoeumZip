import { typesArray } from '@/common/categoryList';
import * as S from '../SelectMyRegion/style';
import { useRecoilState } from 'recoil';
import { myTypeArrayState } from '@/store/selectors';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { FaUndo } from 'react-icons/fa';

const SelectMyTypes = () => {
  // 유저가 선택한 카테고리 필터링 리스트
  const [myTypeArray, setMyTypeArray] = useRecoilState<any>(myTypeArrayState);

  return (
    <S.CategoryContainer>
      {typesArray.map((type, index) =>
        type && myTypeArray.includes(type) ? (
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

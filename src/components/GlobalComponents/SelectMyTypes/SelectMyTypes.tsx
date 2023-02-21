import { useState } from 'react';
import { typesArray } from '@/common/categoryList';
import * as S from '../SelectMyRegion/style';

const SelectMyTypes = () => {
  // 유저가 선택한 카테고리 필터링 리스트
  const [myTypeArray, setMyTypeArray] = useState<string[]>([]);
  return (
      <S.CategoryContainer>
        {typesArray.map((type, index) =>
          type && myTypeArray.includes(type) ? (
            <S.CategoryBtn
              onClick={() =>
                setMyTypeArray(myTypeArray.filter((item) => item !== type))
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
        <S.CategoryBtn
          bg={'white'}
          text={'#7b7b7b'}
          border={'#F4F4F4'}
          onClick={() => setMyTypeArray([])}
        >
          전체 초기화
        </S.CategoryBtn>
        <S.CategoryBtn
          bg={'white'}
          text={'#7b7b7b'}
          border={'#F4F4F4'}
          onClick={() => setMyTypeArray(typesArray)}
        >
          전체 선택
        </S.CategoryBtn>
      </S.CategoryContainer>
  );
};

export default SelectMyTypes;

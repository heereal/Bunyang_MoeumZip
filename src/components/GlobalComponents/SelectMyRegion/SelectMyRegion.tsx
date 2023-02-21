import { regionArray } from '@/common/categoryList';
import * as S from './style';
import { useRecoilState } from 'recoil';
import { myRegionArrayState } from '@/store/selectors';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { FaUndo } from 'react-icons/fa';

const SelectMyRegion = () => {
  // 유저가 선택한 카테고리 필터링 리스트
  const [myRegionArray, setMyRegionArray] =
    useRecoilState<any>(myRegionArrayState);

  return (
    <S.CategoryContainer>
      {regionArray.map((region, index) =>
        region && myRegionArray.includes(region) ? (
          <S.CategoryBtn
            onClick={() =>
              setMyRegionArray(
                myRegionArray.filter((item: any) => item !== region),
              )
            }
            key={index}
            bg={'#F1F6FF'}
            text={'#3D7FFF'}
            border={'#3D7FFF'}
          >
            {region}
          </S.CategoryBtn>
        ) : (
          <S.CategoryBtn
            onClick={() => setMyRegionArray([...myRegionArray, region])}
            key={index}
            bg={'white'}
            text={'#7b7b7b'}
            border={'#F4F4F4'}
          >
            {region}
          </S.CategoryBtn>
        ),
      )}
      <S.SelectAllOrNoneContainer>
        <S.SelectBtn onClick={() => setMyRegionArray(regionArray)}>
          <BsFillCheckCircleFill size="15" />
          <span>전체 선택</span>
        </S.SelectBtn>
        <S.SelectBtn onClick={() => setMyRegionArray([])}>
          <FaUndo size="13" />
          <span>전체 초기화</span>
        </S.SelectBtn>
      </S.SelectAllOrNoneContainer>
      {/* <S.CategoryBtn
        bg={'white'}
        text={'#7b7b7b'}
        border={'#F4F4F4'}
        onClick={() => setMyRegionArray([])}
      >
        전체 초기화
      </S.CategoryBtn>
      <S.CategoryBtn
        bg={'white'}
        text={'#7b7b7b'}
        border={'#F4F4F4'}
        onClick={() => setMyRegionArray(regionArray)}
      >
        전체 선택
      </S.CategoryBtn> */}
    </S.CategoryContainer>
  );
};

export default SelectMyRegion;

import { regionArray } from '@/common/categoryList';
import * as S from './style';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentUserState, myRegionArrayState } from '@/store/selectors';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { FaUndo } from 'react-icons/fa';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const SelectMyRegion = ({ path }: SelectCategoryProps) => {
  const router = useRouter();

  // 유저가 선택한 카테고리 필터링 리스트
  const [myRegionArray, setMyRegionArray] =
    useRecoilState<any>(myRegionArrayState);

  // 현재 로그인한 유저의 firestore 유저 정보
  const currentUser = useRecoilValue(currentUserState);

  // 마이페이지일 때만 setState 실행
  useEffect(() => {
    if (router.pathname === '/signup') return;
    setMyRegionArray(currentUser.regions);
    // eslint-disable-next-line
  }, []);

  return (
    <S.CategoryContainer path={path}>
      {regionArray.map((region, index) =>
        region && myRegionArray?.includes(region) ? (
          <S.CategoryBtn
            onClick={() =>
              setMyRegionArray(
                myRegionArray.filter((item: string) => item !== region),
              )
            }
            key={index}
            bg={'#F8FAFF'}
            text={'#356EFF'}
            border={'#356EFF'}
          >
            {region}
          </S.CategoryBtn>
        ) : (
          <S.CategoryBtn
            onClick={() => setMyRegionArray([...myRegionArray, region])}
            key={index}
            bg={'white'}
            text={'#505050'}
            border={'#D8D8D8'}
          >
            {region}
          </S.CategoryBtn>
        ),
      )}
      <S.SelectAllOrNoneContainer>
        <S.SelectBtn
          color={myRegionArray?.length === 17 ? '#356EFF' : '#505050'}
          onClick={() => setMyRegionArray(regionArray)}
        >
          <BsFillCheckCircleFill size="13" />
          <span>전체 선택</span>
        </S.SelectBtn>
        <S.SelectBtn
          color={myRegionArray?.length === 0 ? '#356EFF' : '#505050'}
          onClick={() => setMyRegionArray([])}
        >
          <FaUndo size="11" />
          <span>전체 초기화</span>
        </S.SelectBtn>
      </S.SelectAllOrNoneContainer>
    </S.CategoryContainer>
  );
};

export default SelectMyRegion;

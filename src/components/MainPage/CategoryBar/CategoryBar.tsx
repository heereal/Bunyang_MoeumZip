import { regionArray, typesArray } from '@/common/categoryList';
import { selectedRegionList, selectedTypeList } from '@/store/selectors';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import * as S from './style';
import InfoLinkBtn from '../InfoLinkBtn/InfoLinkBtn';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';
import { BsCheckCircleFill } from 'react-icons/bs';
import { IoReload } from 'react-icons/io5';
import { useSession } from 'next-auth/react';
import { useQuery } from 'react-query';
import { getUsersList } from '@/common/api';

const CategoryBar = () => {
  const [isRegionToggleOpen, setIsRegionToggleOpen] = useState<boolean>(false);
  const [isTypeToggleOpen, setIsTypeToggleOpen] = useState<boolean>(false);
  const [currentTab, SetCurrentTab] = useState<number>(0);

  // 로그인 여부 확인
  const { data: session }: any = useSession();

  // Users 데이터 불러오기
  const { data: users, isLoading }: any = useQuery('users', getUsersList, {
    enabled: !!session, // session이 true인 경우에만 useQuery를 실행함
  });

  // 현재 유저의 데이터 불러오기
  const currentUser = users?.find(
    (item: ItemJ) =>
      item.userEmail === session?.user?.email &&
      item.provider === session?.user?.provider,
  );

  const userRegionArray = currentUser?.regions;
  const userTypeArray = currentUser?.types;

  // 회원가입한 유저의 카테고리 필터링 리스트

  // 유저가 선택한 카테고리 필터링 리스트
  const [myRegionArray, setMyRegionArray] = useState<any>([]);
  const [myTypeArray, setMyTypeArray] = useState<any>([]);

  useEffect(() => {
    if (currentUser) {
      setMyRegionArray(userRegionArray);
      setMyTypeArray(userTypeArray);
    }
    // eslint-disable-next-line
  }, [userRegionArray, userTypeArray]);

  // 선택한 지역, 분양형태가 바뀔 때마다 recoil defaultValue를 업데이트
  const [selectedRegionArray, setSelectedRegionArray] =
    useRecoilState(selectedRegionList);
  const [selectedTypeArray, setSelectedTypeArray] =
    useRecoilState(selectedTypeList);

  useEffect(() => {
    setSelectedRegionArray(myRegionArray);
    setSelectedTypeArray(myTypeArray);
    // eslint-disable-next-line
  }, [myRegionArray, myTypeArray]);

  // 지역, 분양형태 카테고리 Tabs를 누를 때마다 Open, Close 전환
  const openToggleHandler = () => {
    setIsRegionToggleOpen(!isRegionToggleOpen);
    if (isTypeToggleOpen) {
      return setIsTypeToggleOpen(false);
    }
  };

  const openTypeToggleHandler = () => {
    setIsTypeToggleOpen(!isTypeToggleOpen);
    if (isRegionToggleOpen) {
      return setIsRegionToggleOpen(false);
    }
  };

  // 카테고리 Tab 분류
  const categoryList = [
    {
      name:
        myRegionArray.length !== 0 && myRegionArray.length === 1
          ? myRegionArray[0]
          : myRegionArray.length > 1
          ? myRegionArray[0] + '+' + (myRegionArray.length - 1).toString()
          : '지역',
      category: regionArray,
    },
    {
      name:
        myTypeArray.length !== 0 && myTypeArray.length === 1
          ? myTypeArray[0]
          : myTypeArray.length > 1
          ? myTypeArray[0] + '+' + (myTypeArray.length - 1).toString()
          : '분양형태',
      category: typesArray,
    },
  ];

  // 선택한 카테고리 Tab으로 변경
  const selectedCategory = (index: number) => {
    SetCurrentTab(index);
  };

  return (
    <S.CategorySection>
      <S.CategoryContainer>
        <S.CategoryTabList>
          {categoryList.map((item, index) => (
            <S.CategoryTabs
              key={item.name}
              onClick={() => selectedCategory(index)}
            >
              {/* index===0 은 지역 Tab, 1은 분양형태 Tab */}
              {index === 0 ? (
                <S.RegionTab
                  bd={
                    isRegionToggleOpen || item.name !== '지역'
                      ? '#356EFF'
                      : '#D8D8D8'
                  }
                  bg={isRegionToggleOpen ? '#fFFFFF' : '#ffffff'}
                  onClick={openToggleHandler}
                >
                  <S.TabNameBox>
                    <S.TabName
                      color={
                        isRegionToggleOpen || item.name !== '지역'
                          ? '#356EFF'
                          : '#505050'
                      }
                    >
                      {item.name}
                    </S.TabName>
                    {isRegionToggleOpen || item.name !== '지역' ? (
                      <RiArrowUpSLine
                        style={{
                          fontSize: 25,
                          color: '#356EFF',
                        }}
                      />
                    ) : (
                      <RiArrowDownSLine
                        style={{
                          fontSize: 25,
                          color: '#505050',
                        }}
                      />
                    )}
                  </S.TabNameBox>
                </S.RegionTab>
              ) : (
                <S.TypeTab
                  bd={
                    isTypeToggleOpen || item.name !== '분양형태'
                      ? '#356EFF'
                      : '#D8D8D8'
                  }
                  bg={isTypeToggleOpen ? '#fFFFFF' : '#ffffff'}
                  onClick={openTypeToggleHandler}
                >
                  <S.TabNameBox>
                    <S.TabName
                      color={
                        isTypeToggleOpen || item.name !== '분양형태'
                          ? '#356EFF'
                          : '#505050'
                      }
                    >
                      {item.name}
                    </S.TabName>
                    {isTypeToggleOpen || item.name !== '분양형태' ? (
                      <RiArrowUpSLine
                        style={{
                          fontSize: 25,
                          color: '#356EFF',
                        }}
                      />
                    ) : (
                      <RiArrowDownSLine
                        style={{
                          fontSize: 25,
                          color: '#505050',
                        }}
                      />
                    )}
                  </S.TabNameBox>
                </S.TypeTab>
              )}
            </S.CategoryTabs>
          ))}
        </S.CategoryTabList>
        {/*  지역 카테고리 선택 */}
        {isRegionToggleOpen && (
          <S.RegionCategoryContainer>
            <S.RegionCategoryBox>
              {regionArray.map((region, index) =>
                region && myRegionArray.includes(region) ? (
                  <S.CategoryBtn
                    onClick={() =>
                      setMyRegionArray(
                        myRegionArray.filter((item: string) => item !== region),
                      )
                    }
                    key={index}
                    bg={'#F0F4FF'}
                    bd={'#356EFF'}
                    color={'#356EFF'}
                  >
                    {region}
                  </S.CategoryBtn>
                ) : (
                  <S.CategoryBtn
                    onClick={() => setMyRegionArray([...myRegionArray, region])}
                    key={index}
                    bg={'transparent'}
                    bd={'#d8d8d8'}
                    color={'#505050'}
                  >
                    {region}
                  </S.CategoryBtn>
                ),
              )}
            </S.RegionCategoryBox>
            <S.CommonBtnBox>
              <S.CategoryCommonBtn
                color={myRegionArray.length === 17 ? '#356EFF' : '#505050'}
                onClick={() => setMyRegionArray(regionArray)}
              >
                <BsCheckCircleFill
                  style={{
                    fontSize: 12,
                  }}
                />
                <div>전체 선택</div>
              </S.CategoryCommonBtn>
              <S.CategoryCommonBtn
                color={'#505050'}
                onClick={() => setMyRegionArray([])}
              >
                <IoReload style={{ fontSize: 12 }} />
                <div>초기화</div>
              </S.CategoryCommonBtn>
            </S.CommonBtnBox>
          </S.RegionCategoryContainer>
        )}

        {/* 분양 형태 카테고리 선택 */}
        {isTypeToggleOpen && (
          <S.TypeCategoryContainer>
            <S.TypeCategoryBox>
              {typesArray.map((region, index) =>
                region && myTypeArray.includes(region) ? (
                  <S.CategoryBtn
                    onClick={() =>
                      setMyTypeArray(
                        myTypeArray.filter((item: string) => item !== region),
                      )
                    }
                    key={index}
                    bg={'#F0F4FF'}
                    bd={'#356EFF'}
                    color={'#356EFF'}
                  >
                    {region}
                  </S.CategoryBtn>
                ) : (
                  <S.CategoryBtn
                    onClick={() => setMyTypeArray([...myTypeArray, region])}
                    key={index}
                    bg={'transparent'}
                    bd={'#d8d8d8'}
                    color={'#505050'}
                  >
                    {region}
                  </S.CategoryBtn>
                ),
              )}
            </S.TypeCategoryBox>
            <S.CommonBtnBox>
              <S.CategoryCommonBtn
                color={myTypeArray.length === 11 ? '#356EFF' : '#505050'}
                onClick={() => setMyTypeArray(typesArray)}
              >
                <BsCheckCircleFill
                  style={{
                    fontSize: 12,
                  }}
                />
                <div>전체 선택</div>
              </S.CategoryCommonBtn>
              <S.CategoryCommonBtn
                color={'#505050'}
                onClick={() => setMyTypeArray([])}
              >
                <IoReload style={{ fontSize: 12 }} />
                <div>초기화</div>
              </S.CategoryCommonBtn>
            </S.CommonBtnBox>
          </S.TypeCategoryContainer>
        )}
      </S.CategoryContainer>
      <InfoLinkBtn />
    </S.CategorySection>
  );
};

export default CategoryBar;

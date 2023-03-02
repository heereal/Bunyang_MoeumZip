import { regionArray, typesArray } from '@/common/categoryList';
import { selectedRegionList, selectedTypeList } from '@/store/selectors';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import * as S from './style';
import InfoLinkBtn from '../InfoLinkBtn/InfoLinkBtn';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';
import { BsCheckCircleFill } from 'react-icons/bs';
import { IoReload } from 'react-icons/io5';

const CategoryBar = () => {
  const [isRegionToggleOpen, setIsRegionToggleOpen] = useState<boolean>(false);
  const [isTypeToggleOpen, setIsTypeToggleOpen] = useState<boolean>(false);
  const [currentTab, SetCurrentTab] = useState<number>(0);

  // 유저가 선택한 카테고리 필터링 리스트
  const [myRegionArray, setMyRegionArray] = useState<any>([]);
  const [myTypeArray, setMyTypeArray] = useState<any>([]);

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
      <div>
        <S.CategoryTabList>
          {categoryList.map((item, index) => (
            <S.CategoryTabs
              key={item.name}
              onClick={() => selectedCategory(index)}
            >
              {/* index===0 은 지역 Tab, 1은 분양형태 Tab */}
              {index === 0 ? (
                <S.RegionTab
                  bd={isRegionToggleOpen ? '#3d7fff' : '#bcc0cb'}
                  bg={isRegionToggleOpen ? '#f1f6ff' : '#ffffff'}
                  onClick={openToggleHandler}
                >
                  <S.TabNameBox>
                    <S.TabName
                      color={isRegionToggleOpen ? '#3d7fff' : '#7B7B7B'}
                    >
                      {item.name}
                    </S.TabName>
                    {isRegionToggleOpen ? (
                      <RiArrowUpSLine
                        style={{
                          fontSize: 25,
                          color: '#3d7fff',
                        }}
                      />
                    ) : (
                      <RiArrowDownSLine
                        style={{
                          fontSize: 25,
                          color: '#7B7B7B',
                        }}
                      />
                    )}
                  </S.TabNameBox>
                </S.RegionTab>
              ) : (
                <S.TypeTab
                  bd={isTypeToggleOpen ? '#3d7fff' : '#bcc0cb'}
                  bg={isTypeToggleOpen ? '#f1f6ff' : '#ffffff'}
                  onClick={openTypeToggleHandler}
                >
                  <S.TabNameBox>
                    <S.TabName color={isTypeToggleOpen ? '#3d7fff' : '#7B7B7B'}>
                      {item.name}
                    </S.TabName>
                    {isTypeToggleOpen ? (
                      <RiArrowUpSLine
                        style={{
                          fontSize: 25,
                          color: '#3d7fff',
                        }}
                      />
                    ) : (
                      <RiArrowDownSLine
                        style={{
                          fontSize: 25,
                          color: '#7B7B7B',
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
          <S.CategoryContainer>
            <S.CategoryBox>
              {regionArray.map((region, index) =>
                region && myRegionArray.includes(region) ? (
                  <S.CategoryBtn
                    onClick={() =>
                      setMyRegionArray(
                        myRegionArray.filter((item: string) => item !== region),
                      )
                    }
                    key={index}
                    bg={'#F1F6FF'}
                    bd={'#3d7fff'}
                    color={'#3d7fff'}
                  >
                    {region}
                  </S.CategoryBtn>
                ) : (
                  <S.CategoryBtn
                    onClick={() => setMyRegionArray([...myRegionArray, region])}
                    key={index}
                    bg={'transparent'}
                    bd={'#F4F4F4'}
                    color={'#7b7b7b'}
                  >
                    {region}
                  </S.CategoryBtn>
                ),
              )}
            </S.CategoryBox>
            <S.CommonBtnBox>
              <S.CategoryCommonBtn
                bg={'transparent'}
                onClick={() => setMyRegionArray(regionArray)}
              >
                <BsCheckCircleFill
                  style={{
                    fontSize: 12,
                    color: myRegionArray.length === 17 ? '#3d7fff' : '#BCC0CB',
                  }}
                />
                <p>전체 선택</p>
              </S.CategoryCommonBtn>
              <S.CategoryCommonBtn
                bg={'transparent'}
                onClick={() => setMyRegionArray([])}
              >
                <IoReload style={{ fontSize: 12, color: '#BCC0CB' }} />
                <p>초기화</p>
              </S.CategoryCommonBtn>
            </S.CommonBtnBox>
          </S.CategoryContainer>
        )}

        {/* 분양 형태 카테고리 선택 */}
        {isTypeToggleOpen && (
          <S.CategoryContainer>
            <S.CategoryBox>
              {typesArray.map((region, index) =>
                region && myTypeArray.includes(region) ? (
                  <S.CategoryBtn
                    onClick={() =>
                      setMyTypeArray(
                        myTypeArray.filter((item: string) => item !== region),
                      )
                    }
                    key={index}
                    bg={'#F1F6FF'}
                    bd={'#3d7fff'}
                    color={'#3d7fff'}
                  >
                    {region}
                  </S.CategoryBtn>
                ) : (
                  <S.CategoryBtn
                    onClick={() => setMyTypeArray([...myTypeArray, region])}
                    key={index}
                    bg={'transparent'}
                    bd={'#F4F4F4'}
                    color={'#7b7b7b'}
                  >
                    {region}
                  </S.CategoryBtn>
                ),
              )}
            </S.CategoryBox>
            <S.CommonBtnBox>
              <S.CategoryCommonBtn
                bg={'transparent'}
                onClick={() => setMyTypeArray(typesArray)}
              >
                <BsCheckCircleFill
                  style={{
                    fontSize: 12,
                    color: myTypeArray.length === 17 ? '#3d7fff' : '#BCC0CB',
                  }}
                />
                <p>전체 선택</p>
              </S.CategoryCommonBtn>
              <S.CategoryCommonBtn
                bg={'transparent'}
                onClick={() => setMyTypeArray([])}
              >
                <IoReload style={{ fontSize: 12, color: '#BCC0CB' }} />
                <p>초기화</p>
              </S.CategoryCommonBtn>
            </S.CommonBtnBox>
          </S.CategoryContainer>
        )}
      </div>
      <InfoLinkBtn />
    </S.CategorySection>
  );
};

export default CategoryBar;

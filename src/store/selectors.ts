import { atom } from 'recoil';

// categoryBar에서 선택된 categoryList
export const selectedCategoryList: any = atom({
  key: 'selectedCategoryList',
  default: [],
});

export const pathState = atom({
  key: 'path',
  default: '/',
});

// 유저가 선택한 관심 지역 리스트
export const myRegionArrayState = atom({
  key: 'myRegion',
  default: [],
});

// 유저가 선택한 관심 분양 형태 리스트
export const myTypeArrayState = atom({
  key: 'myTypeArray',
  default: [],
});

export const MapState = atom({
  key: 'naverMap',
  default: null,
});

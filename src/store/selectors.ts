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

export const zoomState = atom({
  key: 'zoom',
  default: 8,
});

export const centerState = atom({
  key: 'center',
  default: { y: 36.2262411, x: 127.65289439 },
});

export const hideState = atom({
  key: 'hide',
  default: true,
});

export const Mapstate = atom({
  key: 'map',
  default: {},
});

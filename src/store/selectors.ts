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

// 현재 로그인한 유저의 firestore 유저 정보
export const currentUserState = atom<any>({
  key: 'currentUser',
  default: {},
});

// 전체 유저 리스트
export const usersListState = atom<any>({
  key: 'usersList',
  default: [],
});

// 유저가 선택한 지역 / 분양형태 필터 리스트
export const selectedRegionList = atom({
  key: 'selectedRegion',
  default: []
})

export const selectedTypeList = atom({
  key: 'selectedType',
  default: []
})
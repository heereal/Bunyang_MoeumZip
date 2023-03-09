import { useCallback } from 'react';
import { atom, selector } from 'recoil';

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
  default: 7,
});

export const centerState = atom({
  key: 'center',
  default: { y: 35.7262411, x: 127.95289439 },
});

export const hideState = atom({
  key: 'hide',
  default: true,
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

// Main Page - 유저가 선택한 지역 카테고리 리스트
export const selectedRegionList = atom({
  key: 'selectedRegion',
  default: [],
});

// Main Page - 유저가 선택한 분양형태 카테고리 리스트
export const selectedTypeList = atom({
  key: 'selectedType',
  default: [],
});

import { atom } from 'recoil';

// categoryBar에서 선택된 categoryList
export const selectedCategoryList: any = atom({
  key: 'selectedCategoryList',
  default: []
})

export const pathState = atom({
  key: 'path',
  default: '/',
});

import { atom, selector } from 'recoil';

// categoryBar에서 선택된 categoryList
export const selectedCategoryList: any = atom({
    key: 'selectedCategoryList',
    default: []
})


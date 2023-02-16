import { db } from '@/common/firebase';
import { collection, doc, getDocs, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { atom, selector } from 'recoil';

// export const getHomeList = async () => {
//     const docRef = doc(db, 'HomeList');
//     const docSnap = await getDocs(docRef);
//     return docSnap.data();
//   };


// const getHomeList: any = async () => {
//     const abc: any = [];
//     const querySnapshot = await getDocs(collection(db, 'HomeList'));
//     querySnapshot.forEach((doc) => {
//         abc.push(doc.data());
//     });
//     return abc;
// };


// export const homeData: any = atom<string[]>({
//     key: 'homeData',
//     default: selector({
//         key: 'homeData/Default',
//         get: async () => {
//             return await getHomeList()
//         }
//     })
// })


// useEffect(() => {
//     testst()
// }, []);

// export const subscriptionList: any = atom({
//     key: 'subscriptionList',
//     default: []
// })


// 여기서 getStaticProps 사용 가능?? 
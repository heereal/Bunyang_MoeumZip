// import axios from 'axios';
import { useState } from 'react';

// const useSubscription = () => {
//   const [homeList, setHomeList] = useState<any>([]);
//   console.log(homeList);

//   const homeListHandler = async () => {
//     // 공고문 리스트 가져오기
//     const defaultList = await axios
//       // rewrites 써서 Network창에서 API KEY 숨김
//       .get(`/api/default`)
//       .then((res) => res.data.data);

//     // 공고문 상세정보 전체 리스트 가져오기
//     const detailList = await axios
//       // rewrites 써서 Network창에서 API KEY 숨김
//       .get(`/api/detail`)
//       .then((res) =>
//         res.data.data.filter((item: any) => item.PBLANC_NO >= 2023000000),
//       );

//     // Default + Detail List 합치기
//     const combineHomeList = await Promise.all(
//       defaultList.map(async (item: any) => {
//         return {
//           ...item,
//           detail: detailList.filter((i: any) => i.PBLANC_NO === item.PBLANC_NO),
//         };
//       }),
//     );
//     setHomeList(combineHomeList);
//   };
//   return { homeListHandler, homeList };
// };

// export default useSubscription;

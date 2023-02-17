import { useEffect } from 'react';
import { atom } from 'recoil';

export const markers = atom({
  key: 'makers',
  default: [1],
});

// useEffect(() => {
//     testst()
// }, []);

// export const subscriptionList: any = atom({
//     key: 'subscriptionList',
//     default: []
// })

// 여기서 getStaticProps 사용 가능??

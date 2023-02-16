import { useEffect } from 'react';
import { atom } from 'recoil';

export const mapState = atom({
  key: 'mapState',
  default: [1, 2, 3, 4, 5, 6, 7, 8, 9],
});

// useEffect(() => {
//     testst()
// }, []);

// export const subscriptionList: any = atom({
//     key: 'subscriptionList',
//     default: []
// })

// 여기서 getStaticProps 사용 가능??

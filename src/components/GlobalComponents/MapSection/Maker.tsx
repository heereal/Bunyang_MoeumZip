import { mapState } from '@/store/selectors';
import Script from 'next/script';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

const Maker = ({ homeList }: any) => {
  // useEffect(() => {
  //   setTimeout(() => {
  //     JwapyoMaker(homeList);
  //   }, 100);
  // }, []);

  // const [test, SetTest] = useRecoilState(mapState);

  // console.log(test);

  // const arr: any[] = [];
  // const JwapyoMaker = (homelist: any) => {
  //   for (let i = 0; i < homeList.length; i++) {
  //     naver.maps.Service.geocode(
  //       { query: homeList[i].HSSPLY_ADRES },
  //       function (status, response) {
  //         if (status === naver.maps.Service.Status.ERROR) {
  //           return alert('Something wrong!');
  //         }
  //         const result = response.v2,
  //           items = result.addresses;
  //         arr.push({
  //           data: {
  //             ...homeList[i],
  //             jwapyo: { x: items[0]?.x, y: items[0]?.y },
  //           },
  //         });
  //       },
  //     );
  //   }
  //   return console.log(arr);
  // };

  // var marker = new naver.maps.Marker({
  //   position: new naver.maps.LatLng(37.3595704, 127.105399),
  // });

  return <></>;
};

export default Maker;

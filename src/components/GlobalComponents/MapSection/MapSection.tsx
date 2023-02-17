import { getDummyData } from '@/common/api';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Section } from './style';
const MapSection = () => {
  // 맵 로드 시 제어할 boolean state
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  const router = useRouter();

  const { data } = useQuery('dummy', getDummyData);
  const [coordnates, setCoordnate] = useState<any>([]);

  const arr: any = [];
  // 최초 로드
  useEffect(() => {
    const $script = document.createElement('script');
    $script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&libraries=services,clusterer&autoload=false`;
    $script.addEventListener('load', () => setMapLoaded(true));
    document.head.appendChild($script);
    setCoordnate(data?.data);
  }, [data]);

  // 로드 완료 시 useEffect
  useEffect(() => {
    if (!mapLoaded) return;
    kakao.maps.load(() => {
      console.log('로드 완료!');
      let container = document.getElementById('map');
      let options = {
        center: new kakao.maps.LatLng(36.5171433799167, 128.05261753988),
        level: 13,
      };
      // router.asPath.length < 3 ? 13 : 5,
      if (container !== null) {
        let map = new kakao.maps.Map(container, options);
        const geocoder = new kakao.maps.services.Geocoder();

        var markers = coordnates.map((result: any) => {
          return new kakao.maps.Marker({
            position: new kakao.maps.LatLng(
              result.COORDINATES[0].Y,
              result.COORDINATES[0].X,
            ),
          });
        });
        // 주소 => 좌표 찾아주는 함수
        // geocoder.addressSearch(
        //   '서울시 은평구 진관동 149-4 일원(은평뉴타운 3-14)',
        //   (result: any, status: any) => {
        //     if (status === kakao.maps.services.Status.OK) {
        //       console.log(result[0]);
        //     }
        //   },
        // );

        const clusterer = new kakao.maps.MarkerClusterer({
          map: map,
          markers: markers,
          gridSize: 35,
          averageCenter: true,
          minLevel: 10,
          disableClickZoom: true,
          styles: [
            {
              width: '50px',
              height: '50px',
              background: 'black',
              borderRadius: '30px',
              color: 'white',
              textAlign: 'center',
              lineHeight: '54px',
              opacity: 0.7,
            },
          ],
        });

        clusterer.addMarkers(markers);

        // for (let i = 0; i < coordnates?.length; i++) {
        //   const markerPosition = new kakao.maps.LatLng(
        //     coordnates[i]?.COORDINATES[0].Y,
        //     coordnates[i]?.COORDINATES[0].X,
        //   );
        //   const marker = new kakao.maps.Marker({
        //     map: map,
        //     position: markerPosition,
        //     clickable: true,
        //   });
        //   marker.setMap(map);
        // }
      }
    });
  }, [mapLoaded, coordnates, router]);

  // for (let i = 0; i < homeList?.length; i++) {
  //   geocoder.addressSearch(
  //     homeList[i].HSSPLY_ADRES,
  //     (result: any, status: any) => {
  //       if (status === kakao.maps.services.Status.OK) {
  //         const markerPosition = new kakao.maps.LatLng(
  //           result[0].y,
  //           result[0].x,
  //         );
  //         const marker = new kakao.maps.Marker({
  //           map: map,
  //           position: markerPosition,
  //           clickable: true,
  //           title: `/detail/${homeList[i].PBLANC_NO}`,
  //         });
  //         marker.setMap(map);

  //         kakao.maps.event.addListener(marker, 'click', () => {
  //           router.push(marker.getTitle());
  //         });
  //       }
  //     },
  //   );
  // }

  return (
    <>
      <Section id="map" />
    </>
  );
};
export default MapSection;

import { getDummyData } from '@/common/api';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Section } from './style';
const MapSection = () => {
  // 맵 로드 시 제어할 boolean state
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  const router: any = useRouter();

  console.log(router.pathname);

  const { data } = useQuery('dummy', getDummyData);
  const [coordnates, setCoordnate] = useState<any>([]);

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
        center: new kakao.maps.LatLng(36.3171433799167, 127.05261753988),
        level: 13,
      };
      // router.asPath.length < 3 ? 13 : 5,
      if (container !== null) {
        let map = new kakao.maps.Map(container, options);
        const geocoder = new kakao.maps.services.Geocoder();
        var zoomControl = new kakao.maps.ZoomControl();
        map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

        coordnates.map((result: any) => {
          const marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(
              result.COORDINATES[0].Y,
              result.COORDINATES[0].X,
            ),

            title: `detail/${result.PBLANC_NO}`,
            opacity: 0.01,
            zIndex: 99,
            clickable: true,
          });
          marker.setMap(map);
          kakao.maps.event.addListener(marker, 'click', () => {
            setTimeout(() => {
              router.pathname === '/'
                ? router.push(marker.getTitle())
                : router.push(marker.getTitle().split('/')[1]);
            }, 100);
          });
        });

        // 클러스터에 들어갈 마커 배열
        const markers = coordnates.map((result: any) => {
          return new kakao.maps.Marker({
            position: new kakao.maps.LatLng(
              result.COORDINATES[0].Y,
              result.COORDINATES[0].X,
            ),
            clickable: true,
          });
        });

        const clusterer = new kakao.maps.MarkerClusterer({
          map: map,
          markers: markers,
          gridSize: 35,
          averageCenter: true,
          minLevel: 10,
          disableClickZoom: true,
          minClusterSize: 1,
          clickable: true,
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

        kakao.maps.event.addListener(
          clusterer,
          'clusterclick',
          (cluster: any) => {
            // 현재 지도 레벨에서 1레벨 확대한 레벨
            var level = map.getLevel() - 1;

            // 지도를 클릭된 클러스터의 마커의 위치를 기준으로 확대합니다
            map.setLevel(level, { anchor: cluster.getCenter() });
          },
        );

        // 주소 => 좌표 찾아주는 함수
        // geocoder.addressSearch(
        //   ' 인천광역시 미추홀구 주안동 1545-2번지 일대 ',
        //   (result: any, status: any) => {
        //     if (status === kakao.maps.services.Status.OK) {
        //       console.log(result[0]);
        //     }
        //   },
        // );
      }
    });
  }, [mapLoaded, coordnates, router]);

  return (
    <>
      <Section id="map" />
    </>
  );
};
export default MapSection;

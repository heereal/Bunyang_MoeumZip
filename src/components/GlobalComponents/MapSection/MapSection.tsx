import { getDummyData } from '@/common/api';
import { pathState } from '@/store/selectors';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';
import { Section } from './style';
const MapSection = () => {
  // 맵 로드 시 제어할 boolean state
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  const router = useRouter();
  const [path] = useRecoilState(pathState);

  const { data } = useQuery('dummy', getDummyData);
  const detail = data?.data.find((home: HomeP) => home.PBLANC_NO === path);

  const [coordnates, setCoordnate] = useState<[]>([]);
  const [center, setCenter] = useState({
    y: 36.3171433799167,
    x: 127.65261753988,
  });
  const [zoomLevel, setZoomLevel] = useState(12);
  const [isOpen, setIsOpen] = useState(false);

  console.log(isOpen);

  // 최초 로드
  useEffect(() => {
    const $script = document.createElement('script');
    $script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&libraries=services,clusterer&autoload=false`;
    $script.addEventListener('load', () => setMapLoaded(true));
    document.head.appendChild($script);
    setCoordnate(data?.data);
  }, [data]);

  // path 값이 바뀌면  센터와 줌레벨 이 바뀜
  useEffect(() => {
    if (path !== '/') {
      setCenter({ y: detail?.COORDINATES[0].Y, x: detail?.COORDINATES[0].X });
      setZoomLevel(6);
    } else {
      setCenter({
        y: 36.3171433799167,
        x: 127.65261753988,
      });
      setZoomLevel(13);
    }
  }, [path]);

  useEffect(() => {
    if (zoomLevel < 10) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [zoomLevel]);

  // 로드 완료 시 useEffect
  useEffect(() => {
    if (!mapLoaded) return;
    kakao.maps.load(() => {
      console.log('로드 완료!');
      let container = document.getElementById('map');
      let options = {
        center: new kakao.maps.LatLng(center.y, center.x),
        level: zoomLevel,
      };
      // router.asPath.length < 3 ? 13 : 5,
      if (container !== null) {
        let map = new kakao.maps.Map(container, options);
        const geocoder = new kakao.maps.services.Geocoder();
        var zoomControl = new kakao.maps.ZoomControl();
        map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
        kakao.maps.event.addListener(map, 'zoom_changed', () => {
          const level = map.getLevel();
          setZoomLevel(level);
        });

        // 지도가 이동, 확대, 축소로 인해 중심좌표가 변경되면 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다

        // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
        const mapTypeControl = new kakao.maps.MapTypeControl();

        // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
        // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
        map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
        // kakao.maps.event.addListener(map, 'center_changed', () => {
        //   // 지도의 중심좌표를 얻어옵니다
        //   var latlng: any = map.getCenter();
        //   setCenter({ x: latlng.La, y: latlng.Ma });
        // });
        coordnates.map((result: HomeP) => {
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

          // 마커 클릭시 센터 변경 및 줌 레벨 변경됨
          kakao.maps.event.addListener(marker, 'click', () => {
            setTimeout(() => {
              router.pathname === '/'
                ? router.push(marker.getTitle())
                : router.push(marker.getTitle().split('/')[1]);
            }, 100);
            setCenter({
              y: result.COORDINATES[0].Y,
              x: result.COORDINATES[0].X,
            });
            setZoomLevel(6);
          });

          if (isOpen) {
            const iwContent =
              '<div style="padding:5px;">Hello World! <br><a href="https://map.kakao.com/link/map/Hello World!" style="color:blue" target="_blank">큰지도보기</a> <a href="https://map.kakao.com/link/to/Hello World!" style="color:blue" target="_blank">길찾기</a></div>'; // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다

            // 인포윈도우를 생성합니다
            const infowindow = new kakao.maps.InfoWindow({
              content: iwContent,
            });

            // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
            infowindow.open(map, marker);
          }
        });

        // 클러스터에 들어갈 마커 배열
        const markers = coordnates.map((result: HomeP) => {
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
          (cluster: kakao.maps.Cluster) => {
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
  }, [mapLoaded, coordnates, router, isOpen]);

  return (
    <>
      <Section id="map" />
    </>
  );
};
export default MapSection;

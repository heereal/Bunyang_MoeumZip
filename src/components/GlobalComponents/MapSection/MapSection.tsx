import { getHomeList } from '@/common/api';
import { pathState } from '@/store/selectors';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';
import { Section } from './style';
import * as ReactDOMServer from 'react-dom/server';
import Overlay from './Overlay';

const MapSection = () => {
  // 맵 로드 시 제어할 boolean state
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  const router = useRouter();
  const [path, setPath] = useRecoilState(pathState);
  const { data } = useQuery('homelist', getHomeList);
  const detail = data?.allHomeData.find(
    (home: HomeP) => home.PBLANC_NO === path,
  );
  const [coordnates, setCoordnates] = useState<[]>([]);
  const [center, setCenter] = useState({
    y: 36.3171433799167,
    x: 127.65261753988,
  });
  const [zoomLevel, setZoomLevel] = useState(12);

  const pathHadnler = (marker: any) => {
    router.push(marker.getTitle());
    setTimeout(() => {
      setPath(marker.getTitle());
    }, 300);
  };

  // 최초 로드
  useEffect(() => {
    const $script = document.createElement('script');
    $script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&libraries=services,clusterer&autoload=false`;
    $script.addEventListener('load', () => setMapLoaded(true));
    document.head.appendChild($script);

    if (data) {
      setCoordnates(data?.allHomeData);
    }
    // path 값이 바뀌면  센터와 줌레벨 이 바뀜

    if (path === '/' || !detail) {
      setCenter({
        y: 36.3171433799167,
        x: 127.65261753988,
      });
      setZoomLevel(12);
    } else {
      setCenter({
        y: Number(detail?.COORDINATES.y),
        x: Number(detail?.COORDINATES.x),
      });
      setZoomLevel(4);
    }
  }, [data, path]);

  // 로드 완료 시 useEffect
  useEffect(() => {
    if (!mapLoaded) return;
    kakao.maps.load(() => {
      let container = document.getElementById('map');
      let options = {
        center: new kakao.maps.LatLng(center.y, center.x),
        level: zoomLevel,
      };

      if (container !== null && coordnates) {
        let map = new kakao.maps.Map(container, options);
        var zoomControl = new kakao.maps.ZoomControl();
        map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
        kakao.maps.event.addListener(map, 'zoom_changed', () => {
          const level = map.getLevel();
          setZoomLevel(level);
        });

        // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
        const mapTypeControl = new kakao.maps.MapTypeControl();

        // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
        // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
        map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

        coordnates?.map((result: any) => {
          const marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(
              Number(result.COORDINATES.y),
              Number(result.COORDINATES.x),
            ),

            title: `/detail/${result.PBLANC_NO}`,
            opacity: 0.01,
            clickable: true,
            zIndex: 2,
          });

          // 커스텀 오버레이에 표시할 내용입니다
          // HTML 문자열 또는 Dom Element 입니다
          var content = ReactDOMServer.renderToString(
            <Overlay result={result} />,
          );

          // 커스텀 오버레이가 표시될 위치입니다
          var position = new kakao.maps.LatLng(
            Number(result.COORDINATES.y),
            Number(result.COORDINATES.x),
          );

          // 커스텀 오버레이를 생성합니다
          var customOverlay = new kakao.maps.CustomOverlay({
            position: position,
            content: content,
            xAnchor: 0.5,
            yAnchor: 1.7,
          });

          // 커스텀 오버레이를 지도에 표시합니다
          customOverlay.setMap(map);

          // 마커 클릭시 센터 변경 및 줌 레벨 변경됨
          kakao.maps.event.addListener(marker, 'click', () => {
            pathHadnler(marker);
            setZoomLevel(4);

            setCenter({
              y: Number(result.COORDINATES.y),
              x: Number(result.COORDINATES.x),
            });
          });
        });

        // 클러스터에 들어갈 마커 배열
        const markers = coordnates?.map((result: any) => {
          return new kakao.maps.Marker({
            position: new kakao.maps.LatLng(
              Number(result.COORDINATES.y),
              Number(result.COORDINATES.x),
            ),
            clickable: true,
          });
        });

        const clusterer = new kakao.maps.MarkerClusterer({
          map: map,
          markers: markers,
          gridSize: 35,
          averageCenter: true,
          minLevel: 12,
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
            const level = map.getLevel() - 1;
            // 지도를 클릭된 클러스터의 마커의 위치를 기준으로 확대합니다
            map.setLevel(level, { anchor: cluster.getCenter() });
          },
        );
      }
    });
  // eslint-disable-next-line
  }, [mapLoaded, coordnates, path, router]);

  return (
    <>
      <Section
        style={{
          display:
            router.asPath === '/admin/nemo042116' || !mapLoaded
              ? 'none'
              : 'block',
        }}
        id="map"
      />
    </>
  );
};
export default MapSection;

import { centerState, zoomState } from '@/store/selectors';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { MapBox } from './style';

type Props = {
  mapId?: string;
  onLoad?: (map: NaverMap) => void;
};

const Map = ({ mapId = 'map', onLoad }: Props) => {
  const router = useRouter();
  const mapRef = useRef<NaverMap | null>(null);
  const [zoomLevel] = useRecoilState(zoomState);
  const [initialCenter] = useRecoilState(centerState);

  // 초기 지도 옵션
  const initializeMap = () => {
    const mapOptions = {
      center: new window.naver.maps.LatLng(initialCenter),
      zoom: zoomLevel,
      scaleControl: true,
      minZoom: 7,
      zoomControl: true,

      zoomControlOptions: {
        //줌 컨트롤의 옵션
        position: naver.maps.Position.TOP_RIGHT,
        style: naver.maps.ZoomControlStyle.SMALL,
      },
      mapDataControl: true,
      mapTypeControl: true,
      mapTypeControlOptions: {
        mapTypeIds: [
          naver.maps.MapTypeId.NORMAL,
          naver.maps.MapTypeId.TERRAIN,
          naver.maps.MapTypeId.SATELLITE,
          naver.maps.MapTypeId.HYBRID,
        ],
        position: naver.maps.Position.TOP_LEFT,
        style: naver.maps.MapTypeControlStyle.BUTTON,
      },

      logoControlOptions: {
        position: naver.maps.Position.BOTTOM_LEFT,
      },
    };

    const map = new window.naver.maps.Map(mapId, mapOptions);
    mapRef.current = map;

    if (onLoad) {
      onLoad(map);
    }
  };

  useEffect(() => {
    return () => {
      mapRef.current?.destroy();
    };
  }, []);

  return (
    <>
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NCP_CLIENT_ID}&submodules=geocoder,panorama`}
        onReady={initializeMap}
      />
      <MapBox
        id={mapId}
        minHeight={router.asPath === '/' ? '700px' : '250px'}
        display1200={router.asPath === '/admin/nemo042116' ? 'none' : 'block'}
        display768={
          router.asPath.includes('search') || router.asPath.includes('detail')
            ? 'none'
            : 'block'
        }
      />
    </>
  );
};

export default Map;

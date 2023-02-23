import { centerState, hideState, Mapstate, zoomState } from '@/store/selectors';
import Script from 'next/script';
import { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';

type Props = {
  mapId?: string;
  onLoad?: (map: NaverMap) => void;
};

const NewMap = ({ mapId = 'map', onLoad }: Props) => {
  const mapRef = useRef<NaverMap | null>(null);
  const [zoomLevel] = useRecoilState(zoomState);
  const [initialCenter] = useRecoilState(centerState);
  const [hideMarker, setHideMarker] = useRecoilState(hideState);

  // 초기 지도 옵션
  const initializeMap = () => {
    const mapOptions = {
      center: new window.naver.maps.LatLng(initialCenter),
      zoom: zoomLevel,
      scaleControl: false,
      mapDataControl: false,
      logoControlOptions: {
        position: naver.maps.Position.BOTTOM_LEFT,
      },
    };

    const map = new window.naver.maps.Map(mapId, mapOptions);
    mapRef.current = map;

    naver.maps.Event.addListener(map, 'zoom_changed', () => {
      const currentZoom = map.getZoom();
      if (currentZoom > 12) {
        setHideMarker(false);
      } else {
        setHideMarker(true);
      }
    });

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
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NCP_CLIENT_ID}`}
        onReady={initializeMap}
      />
      <div id={mapId} style={{ width: '40%', height: '100%' }} />
    </>
  );
};

export default NewMap;

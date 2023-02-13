import { INITIAL_CENTER, INITIAL_ZOOM } from '@/hooks/useMap';
import Script from 'next/script';
import { useEffect, useRef } from 'react';

const Map = ({
  mapId = 'map',
  initialCenter = INITIAL_CENTER,
  initialZoom = INITIAL_ZOOM,
  onLoad,
}: MapProps) => {
  const mapRef = useRef<NaverMap | null>(null);

  const initializeMap = () => {
    const mapOption = {
      center: new window.naver.maps.LatLng(...initialCenter),
      zoom: initialZoom,
      minZoom: 9,
      scaleControl: true,
      mapDataControl: false,
      logoControlOptions: {
        position: naver.maps.Position.BOTTOM_LEFT,
      },
    };
    /** https://navermaps.github.io/maps.js.ncp/docs/tutorial-2-Getting-Started.html */
    const map = new window.naver.maps.Map(mapId, mapOption);
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
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NCP_CLIENT_ID}`}
        onReady={initializeMap}
      />
      <div id="map" style={{ width: '40%', height: '40%' }}></div>
    </>
  );
};

export default Map;

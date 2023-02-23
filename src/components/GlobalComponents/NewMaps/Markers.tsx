import { centerState, hideState, zoomState } from '@/store/selectors';
import { DocumentData } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import Marker from './Marker';

interface MarkersProps {
  map: NaverMap | undefined;
  home: DocumentData | undefined;
}

const Markers = ({ map, home }: MarkersProps) => {
  const router = useRouter();
  const [zoomLevel] = useRecoilState(zoomState);
  const [initialCenter] = useRecoilState(centerState);
  const [hideMarker] = useRecoilState(hideState);

  const detail = home?.find(
    (home: HomeP) => home.PBLANC_NO === router.asPath.split('/')[2],
  );

  useEffect(() => {
    if (router.asPath === '/') {
      if (map) {
        map.updateBy(initialCenter, zoomLevel);
      }
    } else {
      if (map) {
        const coord = new naver.maps.LatLng({
          lat: Number(detail?.COORDINATES.y),
          lng: Number(detail?.COORDINATES.x),
        });
        map.updateBy(coord, 16);
      }
    }
  }, [router.asPath]); //eslint-disable-line

  if (!map || !home || hideMarker) return null;
  return (
    <>
      {home?.map(
        (
          list: { COORDINATES: { x: string; y: string }; PBLANC_NO: string },
          i: number,
        ) => {
          return (
            <Marker
              key={i}
              coordinates={list.COORDINATES}
              map={map}
              title={list.PBLANC_NO}
              onClick={() => {
                router.push(`/detail/${list.PBLANC_NO}`);
              }}
            />
          );
        },
      )}
    </>
  );
};

export default Markers;

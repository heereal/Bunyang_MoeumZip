import { getHomeList } from '@/common/api';
import { centerState, zoomState } from '@/store/selectors';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';
import Map from './Map';
import Markers from './Markers';

const MapSection = () => {
  const router = useRouter();
  const [home, setHome] = useState<any>();
  const [naverMap, setNaverMap] = useState<NaverMap>();
  const [zoomLevel] = useRecoilState(zoomState);
  const [initialCenter] = useRecoilState(centerState);
  const { data } = useQuery('homelist', getHomeList, {
    onSuccess(data) {
      setHome(data?.allHomeData);
    },
  });
  const onLoadMap = (map: NaverMap) => {
    setNaverMap(map);
  };

  const detail = home?.find(
    (home: HomeP) => home.PBLANC_NO === router.asPath.split('/')[2],
  );

  useEffect(() => {
    if (router.asPath === '/') {
      if (naverMap) {
        naverMap.updateBy(initialCenter, zoomLevel);
      }
    } else {
      if (naverMap) {
        const coord = new naver.maps.LatLng({
          lat: Number(detail?.COORDINATES.y),
          lng: Number(detail?.COORDINATES.x),
        });
        naverMap.updateBy(coord, 16);
      }
    }
  }, [router.asPath]); //eslint-disable-line

  return (
    <>
      <Map onLoad={onLoadMap} />
      <Markers map={naverMap} home={home} />
    </>
  );
};

export default MapSection;

import { getHomeList } from '@/common/api';
import { centerState, zoomState } from '@/store/selectors';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';
import Map from './Map';
import Markers from './Markers';
import { MapContainer } from './style';

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
    // 지도 메인으로 갔을떄 줌 다시 떙겨오는 로직
    // if (router.asPath === '/') {
    //   if (naverMap) {
    //     naverMap.updateBy(initialCenter, zoomLevel);
    //   }
    // } else {
    //   if (naverMap) {
    //     const coord = new naver.maps.LatLng({
    //       lat: Number(detail?.COORDINATES.y),
    //       lng: Number(detail?.COORDINATES.x),
    //     });
    //     naverMap.updateBy(coord, 16);
    //   }
    // }

    if (naverMap) {
      const coord = new naver.maps.LatLng({
        lat: Number(detail?.COORDINATES.y),
        lng: Number(detail?.COORDINATES.x),
      });
      naverMap.updateBy(coord, 16);
    }
  }, [router.asPath]); //eslint-disable-line

  return (
    <MapContainer
      display1200={router.asPath === '/admin/nemo042116' ? 'none' : 'block'}
      display768={
        router.asPath.includes('search') || router.asPath.includes('detail')
          ? 'none'
          : 'block'
      }
    >
      <Map onLoad={onLoadMap} />
      <Markers map={naverMap} home={home} />
    </MapContainer>
  );
};

export default MapSection;

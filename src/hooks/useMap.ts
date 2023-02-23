import { MapState } from '@/store/selectors';
import { useCallback } from 'react';
import { useRecoilState } from 'recoil';

export const INITIAL_CENTER: Coordinates = [37.5262411, 126.99289439];
export const INITIAL_ZOOM = 10;

export const useMap = () => {
  const [naverMap, setNaverMap] = useRecoilState(MapState);
  const initializeMap = useCallback((map: any) => {
    setNaverMap(map);
  }, []);
};

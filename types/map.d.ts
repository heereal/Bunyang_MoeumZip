declare type NaverMap = naver.maps.Map;
declare type Coordinates = [Lat: number, Lng: number];

declare interface MapProps {
  mapId?: string;
  initialCenter?: Coordinates;
  initialZoom?: number;
  onLoad?: (map: NaverMap) => void;
}

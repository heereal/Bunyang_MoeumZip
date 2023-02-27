import { DocumentData } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import * as ReactDOMServer from 'react-dom/server';
import Overlay from './Overlay';

interface MarkersProps {
  map: any;
  home: DocumentData | undefined;
}

const Markers = ({ map, home }: MarkersProps) => {
  const router = useRouter();

  useEffect(() => {
    if (map) {
      // NOTE: 'naver is not defined' 오류를 피하기 위한 hack 코드.  dynamic import를 사용
      import('./cluster').then(({ MarkerClustering }) => {
        var htmlMarker1 = {
            content: [
              `<div style='width: 40px; height: 40px; border-radius: 50%;  background: #b08fc5;
                           display: flex; align-items: center; justify-content: center'>`,
              `<span style='color: white; font-size: 0.875rem'>1</span>`,
              `</div>`,
            ].join(''),
            size: new naver.maps.Size(40, 40),
            anchor: new naver.maps.Point(20, 20),
          },
          htmlMarker2 = {
            content: [
              `<div style='width: 80px; height: 80px; border-radius: 50%;  background: skyblue; opacity:0.6; 
                           display: flex; align-items: center; justify-content: center'>`,
              `<span style='color: white; font-size: 1.2rem'>2</span>`,
              `</div>`,
            ].join(''),
            size: new naver.maps.Size(40, 40),
            anchor: new naver.maps.Point(20, 20),
          };

        // NOTE: home 데이터를 이용하여 markers 배열 생성
        const markers: naver.maps.Marker[] = [];
        home?.forEach((item: any) => {
          const marker = new naver.maps.Marker({
            map: map,
            position: new naver.maps.LatLng(
              Number(item?.COORDINATES.y),
              Number(item?.COORDINATES.x),
            ),
          });
          markers.push(marker);
          naver.maps.Event.addListener(marker, 'click', () => {
            router.push(`/detail/${item.PBLANC_NO}`);
          });

          const contentString = ReactDOMServer.renderToString(
            <Overlay result={item} />,
          );

          const infowindow = new naver.maps.InfoWindow({
            content: contentString,
            maxWidth: 300,
            backgroundColor: '#eee',
            // anchorSize: new naver.maps.Size(20, 20),
            // anchorSkew: true,
            // anchorColor: '#eee',
            pixelOffset: new naver.maps.Point(0, 25),
          });

          naver.maps.Event.addListener(marker, 'click', function (e) {
            if (marker !== null && router.asPath !== '/') {
            }
          });

          naver.maps.Event.addListener(marker, 'mouseover', function (e) {
            if (marker !== null) {
              infowindow.open(map, marker);
            }
          });
          naver.maps.Event.addListener(marker, 'mouseout', function (e) {
            if (marker !== null || router.asPath === '/') {
              infowindow.close();
            }
          });
        });

        const markerClustering = new MarkerClustering({
          minClusterSize: 1,
          maxZoom: 11,
          map: map,
          markers: markers,
          disableClickZoom: false,
          gridSize: 120,
          icons: [htmlMarker1, htmlMarker2],
          indexGenerator: [3, 5],
          stylingFunction: function (clusterMarker: any, count: number) {
            // NOTE: MarkerClustering.js가 자바스크립트라 임시로 any 적용
            clusterMarker.getElement().querySelector('span').textContent =
              count;
          },
        });
      });
    }
  }, [map, home]); // eslint-disable-line
  return null;
};

export default Markers;

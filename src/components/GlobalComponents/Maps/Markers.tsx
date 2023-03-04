import { DocumentData } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import * as ReactDOMServer from 'react-dom/server';
import ClusterLarge from './Cluster/ClusterLarge';
import ClusterMid from './Cluster/ClusterMid';
import ClusterSmall from './Cluster/ClusterSmall';
import MarkerIcon from './MarkerIcon';
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
      import('./Cluster/cluster').then(({ MarkerClustering }) => {
        var htmlMarker1 = {
            content: ReactDOMServer.renderToString(<ClusterSmall />),
            size: new naver.maps.Size(40, 40),
            anchor: new naver.maps.Point(20, 20),
          },
          htmlMarker2 = {
            content: ReactDOMServer.renderToString(<ClusterMid />),
            size: new naver.maps.Size(40, 40),
            anchor: new naver.maps.Point(20, 20),
          },
          htmlMarker3 = {
            content: ReactDOMServer.renderToString(<ClusterLarge />),
            size: new naver.maps.Size(40, 40),
            anchor: new naver.maps.Point(20, 20),
          };

        // NOTE: home 데이터를 이용하여 markers 배열 생성
        const markers: naver.maps.Marker[] = [];
        home?.forEach((item: any) => {
          const markerIcon = ReactDOMServer.renderToString(
            <MarkerIcon result={item} />,
          );
          const marker = new naver.maps.Marker({
            map: map,
            position: new naver.maps.LatLng(
              Number(item?.COORDINATES.y),
              Number(item?.COORDINATES.x),
            ),
            icon: {
              content: markerIcon,

              size: new naver.maps.Size(38, 58),
              anchor: new naver.maps.Point(0, 0),
            },
          });
          markers.push(marker);
          naver.maps.Event.addListener(marker, 'click', () => {
            router.push(`/detail/${item.PBLANC_NO}`);
            const detailBody = document.querySelector('#topBtnScroll');
            detailBody?.scroll(0, 0);
          });

          const contentString = ReactDOMServer.renderToString(
            <Overlay result={item} />,
          );

          const infowindow = new naver.maps.InfoWindow({
            content: contentString,
            backgroundColor: '#fff',
            // anchorSize: new naver.maps.Size(20, 20),
            // anchorSkew: true,
            // anchorColor: '#eee',
            pixelOffset: new naver.maps.Point(0, 25),
            borderWidth: 1,
            borderColor: '#bcc0cb',
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
          icons: [htmlMarker1, htmlMarker2, htmlMarker3],
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

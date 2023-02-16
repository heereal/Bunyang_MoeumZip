/*global kakao*/
import { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

const MapSection = ({ homeList }: any) => {
  const [markers, setMarkers] = useState<any>();
  const arr: any = [];

  useEffect(() => {
    // setTimeout(() => {
    locationMaker(homeList);
    console.log('셋타임:', arr);
    // }, 100);
    console.log('유즈이펙트:', arr);
    console.log('marker:', markers);
  }, []);

  const locationMaker = async (homeList: any) => {
    const geocoder = new kakao.maps.services.Geocoder();
    const callback = (result: any, status: any) => {
      if (status === kakao.maps.services.Status.OK) {
        arr.push({ lat: result[0].y, lng: result[0].x });
      }
    };
    for (let i = 0; i < homeList.length; i++) {
      await geocoder.addressSearch(homeList[i].HSSPLY_ADRES, callback);
    }
    console.log('함수안:', arr);
  };

  const test = [
    { lat: '37.2769009099865', lng: '127.021909087615' },
    { lat: '37.5400875049541', lng: '127.207009307124' },
    { lat: '37.4567426294639', lng: '126.691753660242' },
    { lat: '35.9721877201378', lng: '127.005572793693' },
    { lat: '37.6015470116904', lng: '127.136706537006' },
    { lat: '36.9123592529789', lng: '127.511972178453' },
    { lat: '36.6353213789325', lng: '127.4465356096' },
    { lat: '37.4274340999713', lng: '126.654086157635' },
  ];

  console.log('밖:', arr);

  return (
    <Map
      center={{ lat: 36.5171433799167, lng: 128.05261753988 }}
      style={{ width: '100%', height: '360px' }}
      level={13}
    >
      {test?.map((list: any, i: number) => {
        return (
          <div key={i}>
            <MapMarker
              position={{ lat: list?.lat, lng: list?.lng }}
            ></MapMarker>
          </div>
        );
      })}
    </Map>
  );
};

export default MapSection;

import React, { useEffect } from 'react';

interface MarkerProps {
  coordinates: { x: string; y: string };
  map: NaverMap;
  onClick?: () => void;
  title: string;
}

const Marker = ({ coordinates, map, onClick, title }: MarkerProps) => {
  useEffect(() => {
    let marker: naver.maps.Marker | null = null;
    if (map) {
      marker = new naver.maps.Marker({
        map: map,
        position: new naver.maps.LatLng(
          Number(coordinates.y),
          Number(coordinates.x),
        ),
      });
    }

    if (onClick) {
      naver.maps.Event.addListener(marker, 'click', onClick);
    }

    return () => {
      marker?.setMap(null);
    };
  }, [map]); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
};

export default Marker;

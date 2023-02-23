import { DocumentData } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Marker from './Marker';

interface MarkersProps {
  map: NaverMap | undefined;
  home: DocumentData | undefined;
}

const Markers = ({ map, home }: MarkersProps) => {
  const router = useRouter();
  if (!map || !home) return <div>isLoading...</div>;
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

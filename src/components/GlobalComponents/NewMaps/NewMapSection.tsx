import { getHomeList } from '@/common/api';
import { useState } from 'react';
import { useQuery } from 'react-query';
import Markers from './Markers';
import NewMap from './NewMap';

const NewMapSection = () => {
  const [home, setHome] = useState<any>();
  const [naverMap, setNaverMap] = useState<NaverMap>();

  const { data } = useQuery('homelist', getHomeList, {
    onSuccess(data) {
      setHome(data?.allHomeData);
    },
  });
  const onLoadMap = (map: NaverMap) => {
    setNaverMap(map);
  };

  return (
    <>
      <NewMap onLoad={onLoadMap} />
      <Markers map={naverMap} home={home} />
    </>
  );
};

export default NewMapSection;

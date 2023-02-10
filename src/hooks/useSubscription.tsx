import axios from 'axios';
import { useState } from 'react';

const useSubscription = () => {
  const [homeList, setHomeList] = useState<any>([]);

  const BASE_URL = 'https://api.odcloud.kr/api/ApplyhomeInfoDetailSvc/v1';
  const METHOD_APT_ALL = 'getAPTLttotPblancDetail';
  const METHOD_APT_DETAIL = 'getAPTLttotPblancMdl';
  const SERVICE_KEY = process.env.NEXT_PUBLIC_HOME_API_KEY;

  const homeListHandler = async () => {
    // 공고문 리스트 가져오기
    const defaultList = await axios
      .get(
        `${BASE_URL}/${METHOD_APT_ALL}?page=1&perPage=1500&&cond%5BRCRIT_PBLANC_DE%3A%3AGTE%5D=2023-01-01&serviceKey=${SERVICE_KEY}`,
      )
      .then((res) => res.data.data);

    // 공고문 상세정보 전체 리스트 가져오기
    const detailList = await axios
      .get(
        `${BASE_URL}/${METHOD_APT_DETAIL}?page=1&perPage=10000&serviceKey=${SERVICE_KEY}`,
      )
      .then((res) =>
        res.data.data.filter((item) => item.PBLANC_NO >= 2023000000),
      );

    // Default + Detail List 합치기
    const combineHomeList = await Promise.all(
      defaultList.map(async (item) => {
        return {
          ...item,
          detail: detailList.filter((i) => i.PBLANC_NO === item.PBLANC_NO),
        };
      }),
    );
    setHomeList(combineHomeList);
  };

  return { homeListHandler, homeList };
};

export default useSubscription;

import axios from "axios";
import { currentData } from "@/common/utils";
import { useState } from 'react';

const useSubscription = () => {

  const [test2, setTest2] = useState<any[]>([]);

  const BASE_URL = 'https://api.odcloud.kr/api/ApplyhomeInfoDetailSvc/v1';
  const METHOD = 'getAPTLttotPblancDetail';
  const SERVICE_KEY = process.env.NEXT_PUBLIC_HOME_API_KEY

  const today = currentData();

  const getDetailInfo2 = async (PBLANC_NO: string) => {
    return await axios
      .get(
        `${BASE_URL}/getAPTLttotPblancMdl?page=1&perPage=10000&serviceKey=${SERVICE_KEY}`,
      )
      .then((res) => res.data.data);
  };

  const testst = async () => {
    const firstData = await axios
      .get(
        `${BASE_URL}/${METHOD}?page=1&perPage=1500&&cond%5BRCRIT_PBLANC_DE%3A%3AGTE%5D=2023-01-01&serviceKey=${SERVICE_KEY}`,
      )
      .then((res) => res.data.data);

    const firstDataKeyArray = await firstData.map((item: any) => item.PBLANC_NO)

    const secondData = await axios
    .get(
      `${BASE_URL}/getAPTLttotPblancMdl?page=1&perPage=10000&serviceKey=${SERVICE_KEY}`,
    )
    .then((res) => res.data.data);

    const finalData = await secondData.filter((item: any) => item.PBLANC_NO && firstDataKeyArray.includes(item.PBLANC_NO))

    // const teeeest = await Promise.all(
    //   firstData.map(async (item: any) => {
    //     return {
    //       ...item,
    //       plus: await getDetailInfo2(item.PBLANC_NO),
    //     };
    //   }),
    // );
    setTest2(finalData);
  };

  return {testst, test2};
};

export default useSubscription;

import axios from 'axios';
import * as S from './style';
import { LAWD_CD_Code } from '@/common/LAWD_CD';
import { useEffect, useState } from 'react';

const SERVICE_KEY = process.env.NEXT_PUBLIC_HOME_API_KEY;

const APTRealPrice = ({ detail }: any) => {
  // LAWD_CD_Code를 객체에서 배열로 변경한 것
  const [LAWD_CDList, setLAWD_CDList] = useState([]);

  const LAWD_CD: any = LAWD_CDList.find(
    (item: string) => item.split(':')[1] === detail.HSSPLY_ADRES.split(' ')[1],
  );
  console.log('LAWD_CD:', LAWD_CD?.split(':')[0]);

  const getAPTRealPriceList = async () => {
    await axios
      .get(
        `/api/APTRealPrice?numOfRows=1000&LAWD_CD=${
          LAWD_CD?.split(':')[0]
        }&DEAL_YMD=202301&serviceKey=${SERVICE_KEY}`,
      )
      .then((res) => console.log('성공?', res.data.response.body));
  };

  useEffect(() => {
    getAPTRealPriceList();
  }, [LAWD_CD]);

  useEffect(() => {
    const array: any = [];
    // object 를 array 로 변경함
    for (const [key, value] of Object.entries(LAWD_CD_Code)) {
      array.push(`${key}:${value}`);
    }
    setLAWD_CDList(array);
  }, []);

  return (
    <S.Wrapper>
      <button onClick={getAPTRealPriceList}>✨클릭하세요✨</button>
      APTRealPrice
    </S.Wrapper>
  );
};

export default APTRealPrice;

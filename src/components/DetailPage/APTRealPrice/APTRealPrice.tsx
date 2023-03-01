import axios from 'axios';
import * as S from './style';
import { LAWD_CD_Code } from '@/common/LAWD_CD';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

const SERVICE_KEY = process.env.NEXT_PUBLIC_HOME_API_KEY;

const APTRealPrice = ({ detail }: any) => {
  const [dongList, setDongList] = useState([]);

  // '시군구' 정보 기준으로 현재 디테일 페이지에 해당하는 지역 코드 찾기
  const LAWD_CD: any = LAWD_CD_Code.find(
    (item: string) => item.split(':')[1] === detail.HSSPLY_ADRES.split(' ')[1],
  );

  // '시군구' 정보를 기준으로 아파트 매매 실거래가 정보를 가져옴
  const getAPTRealPriceList = async () => {
    const data = await axios
      .get(
        `/api/APTRealPrice?numOfRows=1000&LAWD_CD=${
          LAWD_CD?.split(':')[0]
        }&DEAL_YMD=202302&serviceKey=${SERVICE_KEY}`,
      )
      .then((res) => res.data.response.body.items.item);
    return data;
  };

  const { data, refetch } = useQuery('APTRealPriceList', getAPTRealPriceList, {
    enabled: !!LAWD_CD, // LAWD_CD이 있는 경우에만 useQuery를 실행함
    // 지역코드로 불러온 아파트 매매 실거래가 리스트에서 '읍면동' 기준으로 필터링하기
    onSuccess: (data) => {
      setDongList(
        data?.filter(
          (item: any) =>
            (item.법정동.split(' ')[0] === ''
              ? item.법정동.split(' ')[1]
              : item.법정동.split(' ')[0]) ===
            (detail.HSSPLY_ADRES.split('(').length > 1
              ? detail.HSSPLY_ADRES.split('(')[1].slice(0, 3)
              : detail.HSSPLY_ADRES.split(' ')[2]),
        ),
      );
    },
  });
  console.log('data:', data);

  useEffect(() => {
    refetch();
    // eslint-disable-next-line
  }, [detail]);

  // 유효성 검사 위한 주석이니 삭제하지 말아 주세요😇
  // console.log(
  //   '디테일 페이지 동 주소:',
  //   detail.HSSPLY_ADRES.split('(').length > 1
  //     ? detail.HSSPLY_ADRES.split('(')[1].slice(0, 3)
  //     : detail.HSSPLY_ADRES.split(' ')[2],
  // );

  // 유효성 검사 위한 주석이니 삭제하지 말아 주세요😇
  // data?.map((item: any) =>
  //   console.log(
  //     item.법정동.split(' ')[0] === ''
  //       ? item.법정동.split(' ')[1]
  //       : item.법정동.split(' ')[0],
  //   ),
  // );

  return (
    <S.Wrapper>
      {dongList.length === 0
        ? '해당 지역의 최근 아파트 매매 실거래가 정보가 없습니다.'
        : dongList?.map((item: any, index) => (
            <div key={index}>
              {item.아파트} | {item.법정동}
              {item.도로명} | 거래금액: {item.거래금액}만원
            </div>
          ))}
    </S.Wrapper>
  );
};

export default APTRealPrice;

import { useEffect } from 'react';
import * as S from './style';

const APTRealPrice = ({ detail, dongList, APTRealPriceRefetch }: any) => {
  useEffect(() => {
    APTRealPriceRefetch();
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
        : dongList?.map((item: any, index: any) => (
            <div key={index}>
              {item.아파트} | {item.법정동}
              {item.도로명} | 거래금액: {item.거래금액}만원
            </div>
          ))}
    </S.Wrapper>
  );
};

export default APTRealPrice;

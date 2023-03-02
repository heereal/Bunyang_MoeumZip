import * as S from './style';

const APTRealPrice = ({ dongList }: any) => {
  // 유효성 검사 위한 주석이니 삭제하지 말아 주세요😇
  // console.log(
  //   '디테일 페이지 동 주소:',
  //   detail.HSSPLY_ADRES.split('(').length > 1
  //     ? detail.HSSPLY_ADRES.split('(')[1].slice(0, 3)
  //     : detail.HSSPLY_ADRES.split(' ')[2],
  // );

  // 유효성 검사 위한 주석이니 삭제하지 말아 주세요😇
  // APTRealPriceList?.map((item: any) =>
  //   console.log(
  //     item.법정동.split(' ')[0] === ''
  //       ? item.법정동.split(' ')[1]
  //       : item.법정동.split(' ')[0],
  //   ),
  // );

  return (
    <S.Wrapper>
      {dongList?.length === 0 ? (
        '해당 지역의 최근 아파트 매매 실거래가 정보가 없습니다.'
      ) : (
        <S.Table>
          <thead>
            <S.TableRow>
              <S.TableHead>계약일</S.TableHead>
              <S.TableHead>아파트명</S.TableHead>
              <S.TableHead>주소</S.TableHead>
              {/* <S.TableHead>층</S.TableHead> */}
              <S.TableHead>전용면적</S.TableHead>
              <S.TableHead>거래금액</S.TableHead>
            </S.TableRow>
          </thead>
          {dongList?.map((item: any, index: any) => (
            <tbody key={index}>
              <S.TableRow>
                <S.TableData>
                  {item.년}-
                  {item.월.toString().length === 1 ? `0${item.월}` : item.월}-
                  {item.일.toString().length === 1 ? `0${item.일}` : item.일}
                </S.TableData>
                <S.TableData>
                  {item.아파트} <span>({item.층}층)</span>
                </S.TableData>
                <S.TableData>
                  {item.법정동} {item.도로명}
                </S.TableData>
                {/* <S.TableData>{item.층}</S.TableData> */}
                <S.TableData>{item.전용면적}㎡</S.TableData>
                <S.TableData>{item.거래금액}만원</S.TableData>
              </S.TableRow>
            </tbody>
          ))}
        </S.Table>
      )}
    </S.Wrapper>
  );
};

export default APTRealPrice;

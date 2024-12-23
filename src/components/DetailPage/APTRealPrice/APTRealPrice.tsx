import NoResult from '@/components/GlobalComponents/NoResult/NoResult';
import * as S from './style';

const APTRealPrice = ({ dongList }: any) => {

  return (
    <S.Wrapper>
      {dongList?.length === 0 || dongList === undefined ? (
        <div style={{ padding: 30 }}>
          <NoResult
            text="해당 지역의 최근 아파트 매매 실거래가 정보가 없습니다.
        "
          />
        </div>
      ) : (
        <S.Table>
          <thead>
            <S.TableRow>
              <S.TableHead>계약일</S.TableHead>
              <S.TableHead>아파트명</S.TableHead>
              <S.TableHead>법정동</S.TableHead>
              <S.TableHead>전용면적</S.TableHead>
              <S.TableHead>거래금액</S.TableHead>
            </S.TableRow>
          </thead>
          {dongList?.map((item: any, index: number) => (
            <tbody key={index}>
              <S.TableRow>
                <S.TableData>
                  {item.dealYear}-
                  {item.dealMonth.toString().length === 1 ? `0${item.dealMonth}` : item.dealMonth}-
                  {item.dealDay.toString().length === 1 ? `0${item.dealDay}` : item.dealDay}
                </S.TableData>
                <S.TableData>
                  <div>{item.aptNm}</div> <span>({item.floor}층)</span>
                </S.TableData>
                <S.TableData>
                  {item.umdNm} 
                  {/* {item.도로명} */}
                </S.TableData>
                <S.TableData>{item.excluUseAr}㎡</S.TableData>
                <S.TableData>{item.dealAmount}만 원</S.TableData>
              </S.TableRow>
            </tbody>
          ))}
        </S.Table>
      )}
    </S.Wrapper>
  );
};

export default APTRealPrice;

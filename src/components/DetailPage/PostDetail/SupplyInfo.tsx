import * as S from './style';

const SupplyInfo = ({ home }: any) => {
  return (
    <>
      <S.ArticleHead>공급개요 </S.ArticleHead>
      <S.ArticleBox>
        <S.SPLtable>
          <S.SPLNUM style={{ width: '10%', backgroundColor: '#f4f4f4' }}>
            주택번호
          </S.SPLNUM>
          <S.SPLhead color="#f4f4f4">주거전용면적</S.SPLhead>
          <S.SPLhead color="#f4f4f4">공급면적</S.SPLhead>
          <S.SPLhead color="#f4f4f4" style={{ flexDirection: 'column' }}>
            <div style={{ padding: 5 }}>공급세대수</div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                padding: 5,
              }}
            >
              <div style={{ width: '33%' }}>일반</div>
              <div style={{ width: '33%' }}>특별</div>
              <div style={{ width: '33%' }}>총계</div>
            </div>
          </S.SPLhead>
          <S.SPLhead color="#f4f4f4">공급금액(최고가 기준)</S.SPLhead>
        </S.SPLtable>
        {home?.DETAIL.map((item: any) => {
          return (
            <S.SPLtable key={item.MODEL_NO}>
              <S.SPLNUM style={{ width: '10%', backgroundColor: '#f4f4f4' }}>
                {item.MODEL_NO}
              </S.SPLNUM>
              {item.HOUSE_TY ? (
                <S.SPLhead style={{ width: '90%' }}>
                  <S.SPLTY>
                    {item.HOUSE_TY}
                    <a style={{ fontSize: 18, padding: 3 }}>㎡</a>
                  </S.SPLTY>
                  <S.SPLTY>
                    {item.SUPLY_AR !== null ? item.SUPLY_AR : '-'}
                    {item.SUPLY_AR !== null ? (
                      <>
                        <a style={{ fontSize: 18, padding: 3 }}>㎡</a>
                        <a>({Math.round(item.SUPLY_AR / 3.3)}평)</a>
                      </>
                    ) : null}
                  </S.SPLTY>
                  <S.SPLTY style={{ border: 'none' }}>
                    <S.TYDetail style={{ width: '33%' }}>
                      {item.SUPLY_HSHLDCO}
                    </S.TYDetail>
                    <S.TYDetail style={{ width: '33%' }}>
                      {item.SPSPLY_HSHLDCO}
                    </S.TYDetail>
                    <S.TYDetail style={{ width: '33%' }}>
                      {item.SUPLY_HSHLDCO + item.SPSPLY_HSHLDCO}
                    </S.TYDetail>
                  </S.SPLTY>
                  <S.SPLTY>{item.LTTOT_TOP_AMOUNT}만원</S.SPLTY>
                </S.SPLhead>
              ) : (
                <S.SPLhead style={{ width: '90%' }}>
                  <S.SPLTY>
                    {item.EXCLUSE_AR}
                    <a style={{ fontSize: 18, padding: 3 }}>㎡</a>
                  </S.SPLTY>
                  <S.SPLTY>
                    {item.EXCLUSE_AR}
                    <a style={{ fontSize: 18, padding: 3 }}>㎡</a>(
                    {Math.round(item.EXCLUSE_AR / 3.3)}평)
                  </S.SPLTY>
                  <S.SPLTY style={{ border: 'none' }}>
                    <S.TYDetail style={{ width: '33%' }}>
                      {item.SUPLY_HSHLDCO}
                    </S.TYDetail>
                    <S.TYDetail style={{ width: '33%' }}>
                      {item.SPSPLY_HSHLDCO}
                    </S.TYDetail>
                    <S.TYDetail style={{ width: '33%' }}>
                      {item.SUPLY_HSHLDCO}
                    </S.TYDetail>
                  </S.SPLTY>
                  <S.SPLTY>{item.SUPLY_AMOUNT}만원</S.SPLTY>
                </S.SPLhead>
              )}
            </S.SPLtable>
          );
        })}
      </S.ArticleBox>
    </>
  );
};

export default SupplyInfo;

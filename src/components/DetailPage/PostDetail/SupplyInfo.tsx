import * as S from './style';
interface PropsP {
  home: HomeP | undefined;
}
const SupplyInfo = ({ home }: PropsP) => {
  return (
    <>
      <S.ArticleHead>공급개요 </S.ArticleHead>
      <S.ArticleBox>
        <S.SPLtable>
          <S.SPLNUM style={{ width: '10%', backgroundColor: '#f0f4ff' }}>
            번호
          </S.SPLNUM>
          <S.SPLhead color="#f0f4ff">주거전용면적</S.SPLhead>
          <S.SPLhead color="#f0f4ff">공급면적</S.SPLhead>
          <S.SPLhead color="#f0f4ff" style={{ flexDirection: 'column' }}>
            <div style={{ padding: 5 }}>공급세대수</div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <div style={{ width: '33.3%' }}>일반</div>
              <div style={{ width: '33.3%' }}>특별</div>
              <div style={{ width: '33.3%' }}>총계</div>
            </div>
          </S.SPLhead>
          <S.SPLhead
            color="#f0f4ff"
            style={{
              flexDirection: 'column',
            }}
          >
            <div>공급금액</div>
            <div>(최고가 기준)</div>
          </S.SPLhead>
        </S.SPLtable>
        {home?.DETAIL.map((item: ItemJ) => {
          return (
            <S.SPLtable key={item.MODEL_NO}>
              <S.SPLNUM style={{ width: '10%', backgroundColor: '#f0f4ff' }}>
                {item.MODEL_NO}
              </S.SPLNUM>
              {item.HOUSE_TY ? (
                <S.SPLhead style={{ width: '90%' }}>
                  <S.SPLTY>{item.HOUSE_TY}</S.SPLTY>
                  <S.SPLTY style={{ flexDirection: 'column' }}>
                    {item.SUPLY_AR !== null ? `${item.SUPLY_AR}㎡` : '-'}
                    {item.SUPLY_AR !== null ? (
                      <>
                        <div>
                          (
                          {typeof item.SUPLY_AR === 'string'
                            ? Math.round(Number(item.SUPLY_AR) / 3.3)
                            : null}
                          평)
                        </div>
                      </>
                    ) : null}
                  </S.SPLTY>
                  <S.SPLTY
                    style={{
                      border: 'none',
                      flexDirection: 'row',
                    }}
                  >
                    <S.TYDetail style={{ width: '33.3%' }}>
                      {item.SUPLY_HSHLDCO}
                    </S.TYDetail>
                    <S.TYDetail style={{ width: '33.3%' }}>
                      {item.SPSPLY_HSHLDCO}
                    </S.TYDetail>
                    <S.TYDetail style={{ width: '33.3%' }}>
                      {item.SUPLY_HSHLDCO + item.SPSPLY_HSHLDCO}
                    </S.TYDetail>
                  </S.SPLTY>
                  <S.SPLTY>{item.LTTOT_TOP_AMOUNT}만원</S.SPLTY>
                </S.SPLhead>
              ) : (
                <S.SPLhead style={{ width: '90%' }}>
                  <S.SPLTY>
                    <span>{item.EXCLUSE_AR}㎡</span>
                  </S.SPLTY>
                  <S.SPLTY>
                    <div>{item.EXCLUSE_AR}㎡</div>
                    <div>
                      (
                      {typeof item.EXCLUSE_AR === 'number'
                        ? Math.round(item.EXCLUSE_AR / 3.3)
                        : null}
                      평)
                    </div>
                  </S.SPLTY>
                  <S.SPLTY style={{ border: 'none', flexDirection: 'row' }}>
                    <S.TYDetail style={{ width: '33.3%' }}>
                      {item.SUPLY_HSHLDCO}
                    </S.TYDetail>
                    <S.TYDetail style={{ width: '33.3%' }}>
                      {item.SPSPLY_HSHLDCO}
                    </S.TYDetail>
                    <S.TYDetail style={{ width: '33.3%' }}>
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

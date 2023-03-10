import * as S from './style';
interface PropsP {
  home: HomeP | undefined;
}
const SupplyInfo = ({ home }: PropsP) => {
  return (
    <>
      <S.ArticleHead>공급개요 </S.ArticleHead>
      <S.ArticleBox>
        <tbody>
          <tr>
            <S.BoxTitleNumTitle rowSpan={2}>번호</S.BoxTitleNumTitle>
            <S.BoxTitleSupply rowSpan={2}>주거전용면젹</S.BoxTitleSupply>
            <S.BoxTitleSupply rowSpan={2}>공급면적</S.BoxTitleSupply>
            <S.BoxTitleSupply colSpan={3}>공급세대수</S.BoxTitleSupply>
            <S.BoxTitleSupply>공급금액</S.BoxTitleSupply>
          </tr>
          <tr>
            <S.BoxTitleDetail>일반</S.BoxTitleDetail>
            <S.BoxTitleDetail>특별</S.BoxTitleDetail>
            <S.BoxTitleDetail>총계</S.BoxTitleDetail>
            <S.BoxTitleSupply>(최고가 기준)</S.BoxTitleSupply>
          </tr>

          {home?.DETAIL.map((item: ItemJ) => {
            return (
              <tr key={item.MODEL_NO}>
                <S.BoxTitleNum>{item.MODEL_NO}</S.BoxTitleNum>
                {item.HOUSE_TY ? (
                  <>
                    <S.BoxContentDate>{item.HOUSE_TY}</S.BoxContentDate>
                    <S.BoxContentDate>
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
                    </S.BoxContentDate>

                    <S.BoxContentSupply>
                      {item.SUPLY_HSHLDCO}
                    </S.BoxContentSupply>
                    <S.BoxContentSupply>
                      {item.SPSPLY_HSHLDCO}
                    </S.BoxContentSupply>
                    <S.BoxContentSupply>
                      {item.SUPLY_HSHLDCO + item.SPSPLY_HSHLDCO}
                    </S.BoxContentSupply>

                    <S.BoxContentDate>
                      {item.LTTOT_TOP_AMOUNT}만원
                    </S.BoxContentDate>
                  </>
                ) : (
                  <>
                    <S.BoxContentDate>{item.EXCLUSE_AR}㎡</S.BoxContentDate>
                    <S.BoxContentDate>{item.EXCLUSE_AR}㎡</S.BoxContentDate>
                    <S.BoxContentDate>
                      (
                      {typeof item.EXCLUSE_AR === 'number'
                        ? Math.round(item.EXCLUSE_AR / 3.3)
                        : null}
                      평)
                    </S.BoxContentDate>
                    <S.BoxContentSupply>
                      {item.SUPLY_HSHLDCO}
                    </S.BoxContentSupply>
                    <S.BoxContentSupply>
                      {item.SPSPLY_HSHLDCO}
                    </S.BoxContentSupply>
                    <S.BoxContentSupply>
                      {item.SUPLY_HSHLDCO}
                    </S.BoxContentSupply>
                    <S.BoxContentDate>{item.SUPLY_AMOUNT}만원</S.BoxContentDate>
                  </>
                )}
              </tr>
            );
          })}
        </tbody>
      </S.ArticleBox>
    </>
  );
};

export default SupplyInfo;

import * as S from './style';
interface PropsP {
  home: HomeP | undefined;
}
const LHDetail = ({ home }: PropsP) => {
  return (
    <>
      <S.ArticleHead>공급일정</S.ArticleHead>
      <S.ArticleBox>
        <tbody>
          <tr>
            <S.BoxTitleLH>모집공고일</S.BoxTitleLH>
            <S.BoxContentLH style={{ borderTop: '1.3px solid #8e8e8e' }}>
              {home?.RCRIT_PBLANC_DE.slice(0, 4)}-
              {home?.RCRIT_PBLANC_DE.slice(4, 6)}-
              {home?.RCRIT_PBLANC_DE.slice(4, 6)}
            </S.BoxContentLH>
          </tr>

          <tr>
            <S.BoxTitleLH>서류 접수 기간</S.BoxTitleLH>
            <S.BoxContentLH>
              {home?.RCEPT_BGNDE}~{home?.RCEPT_ENDDE}
            </S.BoxContentLH>
          </tr>

          <tr>
            <S.BoxTitleLH>당첨자 발표일</S.BoxTitleLH>
            <S.BoxContentLH>{home?.PRZWNER_PRESNATN_DE}</S.BoxContentLH>
          </tr>
        </tbody>
      </S.ArticleBox>
      {home?.DETAIL[0]?.REGISTER[0].SIL_OFC_GUD_FCTS && (
        <S.ArticleHead>유의사항</S.ArticleHead>
      )}
      <S.ArticleBox>
        <S.BoxContentLH>
          {home?.DETAIL[0]?.REGISTER[0].SIL_OFC_GUD_FCTS && (
            <>
              <S.BoxTitleLH>유의사항</S.BoxTitleLH>
              <S.BoxContentLH
                style={{
                  textAlign: 'left',
                  lineHeight: '25px',
                  padding: '10px',
                  flexWrap: 'wrap',
                }}
              >
                {home?.DETAIL[0]?.REGISTER[0].SIL_OFC_GUD_FCTS}
              </S.BoxContentLH>
            </>
          )}
        </S.BoxContentLH>
      </S.ArticleBox>
    </>
  );
};

export default LHDetail;

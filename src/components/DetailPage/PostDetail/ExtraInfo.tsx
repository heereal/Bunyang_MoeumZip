import * as S from './style';

interface PropsP {
  home: HomeP | undefined;
}

export const ExtraInfo = ({ home }: PropsP) => {
  return (
    <>
      <S.ArticleHead>기타사항</S.ArticleHead>
      <S.ArticleBox>
        <S.SPLtable>
          <S.SPLhead color="#f4f4f4" style={{ width: '33.3%' }}>
            시행사
          </S.SPLhead>
          <S.SPLhead color="#f4f4f4" style={{ width: '33.3%' }}>
            시공사
          </S.SPLhead>
          <S.SPLhead color="#f4f4f4" style={{ width: '33.3%' }}>
            사업주체 전화번호
          </S.SPLhead>
        </S.SPLtable>
        <S.SPLtable>
          <S.SPLhead color="#ffffff" style={{ width: '33.3%' }}>
            {home?.BSNS_MBY_NM}
          </S.SPLhead>
          <S.SPLhead color="#ffffff" style={{ width: '33.3%' }}>
            {home?.CNSTRCT_ENTRPS_NM}
          </S.SPLhead>
          {home?.MDHS_TELNO.length === 8 ? (
            <S.SPLhead color="#ffffff" style={{ width: '33.3%' }}>
              {home?.MDHS_TELNO.slice(0, 4)}-{home?.MDHS_TELNO.slice(4, 8)}
            </S.SPLhead>
          ) : (
            <S.SPLhead color="#ffffff" style={{ width: '33.3%' }}>
              {home?.MDHS_TELNO.slice(0, 3)}-{home?.MDHS_TELNO.slice(3, 6)}-
              {home?.MDHS_TELNO.slice(6, 12)}
            </S.SPLhead>
          )}
        </S.SPLtable>
      </S.ArticleBox>
    </>
  );
};

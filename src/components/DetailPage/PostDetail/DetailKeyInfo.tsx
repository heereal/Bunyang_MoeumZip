import Link from 'next/link';
import * as S from './style';

interface PropsP {
  home: HomeP | undefined;
}

const DetailKeyInfo = ({ home }: PropsP) => {
  return (
    <>
      <S.ArticleHead>입주자모집공고 주요정보</S.ArticleHead>
      <S.ArticleBox>
        <tbody>
          <tr>
            <S.ArticleTitle colSpan={4}>{home?.HOUSE_NM}</S.ArticleTitle>
          </tr>
          <tr>
            <S.BoxTitle>공급위치</S.BoxTitle>
            <S.BoxContent>{home?.HSSPLY_ADRES}</S.BoxContent>
          </tr>
          <tr>
            <S.BoxTitle>공급규모</S.BoxTitle>
            <S.BoxContent>{home?.TOT_SUPLY_HSHLDCO}</S.BoxContent>
          </tr>
          <tr>
            <S.BoxTitle>관련문의</S.BoxTitle>
            <S.BoxContent>사업주체 또는 분양사무실로 문의</S.BoxContent>
          </tr>
          <tr>
            <S.BoxTitle>문의처</S.BoxTitle>
            {home?.MDHS_TELNO.length === 8 ? (
              <S.BoxContent>
                ☎ {home?.MDHS_TELNO.slice(0, 4)}-{home?.MDHS_TELNO.slice(4, 8)}
              </S.BoxContent>
            ) : (
              <S.BoxContent>
                ☎ {home?.MDHS_TELNO.slice(0, 3)}-{home?.MDHS_TELNO.slice(3, 7)}-
                {home?.MDHS_TELNO.slice(7, 12)}
              </S.BoxContent>
            )}
          </tr>
        </tbody>
      </S.ArticleBox>

      {home && (
        <a
          href={home.PBLANC_URL}
          target="_blank"
          rel="noreferrer"
          style={{ all: 'unset' }}
        >
          <S.infoBox>모집공고문 보기</S.infoBox>
        </a>
      )}
    </>
  );
};

export default DetailKeyInfo;

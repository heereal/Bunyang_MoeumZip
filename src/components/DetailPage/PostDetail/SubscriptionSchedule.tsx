import React from 'react';
import * as S from './style';

interface PropsP {
  home: HomeP | undefined;
}

const SubscriptionSchedule = ({ home }: PropsP) => {
  return (
    <>
      <S.ArticleHead>청약일정</S.ArticleHead>
      <S.ArticleBox>
        <tbody>
          <tr>
            <S.BoxTitle>모집공고일</S.BoxTitle>
            <S.BoxContent
              style={{ borderTop: '1.3px solid #8e8e8e' }}
              colSpan={4}
            >
              {home?.RCRIT_PBLANC_DE}
            </S.BoxContent>
          </tr>
          {home?.HOUSE_SECD === '02' ||
            home?.HOUSE_SECD === '06' ||
            home?.HOUSE_SECD === '03' ||
            (home?.HOUSE_SECD === '04' ? null : (
              <>
                <tr>
                  <S.BoxTitle rowSpan={4}>청약접수</S.BoxTitle>
                  <S.BoxTitleDate>구분</S.BoxTitleDate>
                  <S.BoxTitleDate>해당지역</S.BoxTitleDate>
                  <S.BoxTitleDate>기타경기</S.BoxTitleDate>
                  <S.BoxTitleDate>기타지역</S.BoxTitleDate>
                </tr>

                <tr>
                  <S.BoxContentDate>특별공급</S.BoxContentDate>
                  <S.BoxContentDate colSpan={3}>
                    {home?.SPSPLY_RCEPT_BGNDE} ~{home?.SPSPLY_RCEPT_ENDDE}
                  </S.BoxContentDate>
                </tr>
                <tr>
                  <S.BoxContentDate>1순위</S.BoxContentDate>
                  <S.BoxContentDate>
                    {home?.GNRL_RNK1_CRSPAREA_RCEPT_PD}
                  </S.BoxContentDate>
                  <S.BoxContentDate>
                    {home?.GNRL_RNK1_ETC_GG_RCPTDE_PD}
                  </S.BoxContentDate>
                  <S.BoxContentDate>
                    {home?.GNRL_RNK1_ETC_AREA_RCPTDE_PD}
                  </S.BoxContentDate>
                </tr>
                <tr>
                  <S.BoxContentDate>2순위</S.BoxContentDate>
                  <S.BoxContentDate>
                    {home?.GNRL_RNK2_CRSPAREA_RCEPT_PD}
                  </S.BoxContentDate>
                  <S.BoxContentDate>
                    {home?.GNRL_RNK2_ETC_GG_RCPTDE_PD}
                  </S.BoxContentDate>
                  <S.BoxContentDate>
                    {home?.GNRL_RNK2_ETC_AREA_RCPTDE_PD}
                  </S.BoxContentDate>
                </tr>
              </>
            ))}

          <tr>
            <S.BoxTitle color="#f4f4f4">당첨자 발표일</S.BoxTitle>
            <S.BoxContent colSpan={4}>{home?.PRZWNER_PRESNATN_DE}</S.BoxContent>
          </tr>
          <tr>
            <S.BoxTitle color="#f4f4f4">계약일</S.BoxTitle>
            <S.BoxContent colSpan={4}>
              {home?.CNTRCT_CNCLS_BGNDE} ~ {home?.CNTRCT_CNCLS_ENDDE}
            </S.BoxContent>
          </tr>
        </tbody>
      </S.ArticleBox>
      <S.info>
        *특별공급 종류에 따라 접수기간 및 장소가 다를 수 있으니 모집공고를
        반드시 확인하시기 바랍니다.
      </S.info>
    </>
  );
};

export default SubscriptionSchedule;

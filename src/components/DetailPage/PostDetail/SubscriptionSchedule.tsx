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
        <S.Article>
          <S.BoxTitle color="#f0f4ff">모집공고일</S.BoxTitle>
          <S.BoxContent>{home?.RCRIT_PBLANC_DE}</S.BoxContent>
        </S.Article>
        {home?.HOUSE_SECD === '02' ||
          home?.HOUSE_SECD === '06' ||
          home?.HOUSE_SECD === '03' ||
          (home?.HOUSE_SECD === '04' ? null : (
            <S.Article>
              <S.BoxTitle color="#f0f4ff" style={{ height: 204 }}>
                청약접수
              </S.BoxTitle>
              <S.BoxContent style={{ paddingLeft: 0 }}>
                <S.Table>
                  <S.THead>
                    <S.Tbody
                      style={{
                        backgroundColor: '#f0f4ff',
                        color: '#356EFF',
                        fontWeight: 600,
                      }}
                    >
                      구분
                    </S.Tbody>
                    <S.Tbody
                      style={{
                        backgroundColor: '#f0f4ff',
                        color: '#356EFF',
                        fontWeight: 600,
                      }}
                    >
                      해당지역
                    </S.Tbody>
                    <S.Tbody
                      style={{
                        backgroundColor: '#f0f4ff',
                        color: '#356EFF',
                        fontWeight: 600,
                      }}
                    >
                      기타경기{' '}
                    </S.Tbody>
                    <S.Tbody
                      style={{
                        backgroundColor: '#f0f4ff',
                        color: '#356EFF',
                        fontWeight: 600,
                      }}
                    >
                      기타지역
                    </S.Tbody>
                  </S.THead>
                  {home?.SPSPLY_RCEPT_BGNDE && (
                    <S.THead>
                      <S.Tbody
                        style={{
                          borderRight: '2px solid #e8eaef',
                          marginLeft: 1,
                        }}
                      >
                        특별공급
                      </S.Tbody>

                      <div
                        style={{
                          textAlign: 'center',
                          width: '70%',
                          height: '100%',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        {home?.SPSPLY_RCEPT_BGNDE} ~ {home?.SPSPLY_RCEPT_ENDDE}
                      </div>
                    </S.THead>
                  )}
                  <S.THead>
                    <S.Tbody>1순위</S.Tbody>
                    <S.Tbody>{home?.GNRL_RNK1_CRSPAREA_RCEPT_PD}</S.Tbody>
                    <S.Tbody>{home?.GNRL_RNK1_ETC_GG_RCPTDE_PD} </S.Tbody>
                    <S.Tbody>{home?.GNRL_RNK1_ETC_AREA_RCPTDE_PD}</S.Tbody>
                  </S.THead>
                  <S.THead>
                    <S.Tbody>2순위</S.Tbody>
                    <S.Tbody>{home?.GNRL_RNK2_CRSPAREA_RCEPT_PD}</S.Tbody>
                    <S.Tbody>{home?.GNRL_RNK2_ETC_GG_RCPTDE_PD} </S.Tbody>
                    <S.Tbody>{home?.GNRL_RNK2_ETC_AREA_RCPTDE_PD}</S.Tbody>
                  </S.THead>
                </S.Table>
              </S.BoxContent>
            </S.Article>
          ))}

        <S.Article>
          <S.BoxTitle color="#f4f4f4">당첨자 발표일</S.BoxTitle>
          <S.BoxContent>{home?.PRZWNER_PRESNATN_DE}</S.BoxContent>
        </S.Article>
        <S.Article>
          <S.BoxTitle color="#f4f4f4">계약일</S.BoxTitle>
          <S.BoxContent>
            {home?.CNTRCT_CNCLS_BGNDE} ~ {home?.CNTRCT_CNCLS_ENDDE}
          </S.BoxContent>
        </S.Article>
      </S.ArticleBox>
      <S.info>
        *특별공급 종류에 따라 접수기간 및 장소가 다를 수 있으니 모집공고를
        반드시 확인하시기 바랍니다.
      </S.info>
    </>
  );
};

export default SubscriptionSchedule;

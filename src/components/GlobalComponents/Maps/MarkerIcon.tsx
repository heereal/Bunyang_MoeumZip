import { getToday } from '@/common/utils';
import Image from 'next/image';
import * as S from './style';
import Apply_today from 'public/assets/Apply_today.png';
import Apply_upcomming from 'public/assets/Apply_upcomming.png';
import LH_today from 'public/assets/LH_today.png';
import LH_upcomming from 'public/assets/LH_upcomming.png';

const MarkerIcon = ({ result }: any) => {
  const today = getToday();
  return (
    <S.MarkerIconContainer>
      {result?.RCEPT_BGNDE <= today &&
        result?.RCEPT_ENDDE >= today &&
        result?.API === '청약홈' && (
          <>
            <Image
              src={Apply_today}
              alt={'청약가능'}
              height={65}
              quality={100}
            />
            <S.MarkerTest>
              {result?.HOUSE_DTL_SECD_NM.includes('행복주택') ||
              result?.HOUSE_DTL_SECD_NM === '공공임대' ||
              result?.HOUSE_DTL_SECD_NM === '국민임대' ||
              result?.HOUSE_DTL_SECD_NM === '영구임대' ||
              result?.HOUSE_DTL_SECD_NM === '민간임대' ||
              result?.HOUSE_DTL_SECD_NM === '공공지원민간임대'
                ? '임대'
                : result?.HOUSE_DTL_SECD_NM === '분양주택' ||
                  result?.HOUSE_DTL_SECD_NM === '민영' ||
                  result?.HOUSE_DTL_SECD_NM === '국민'
                ? '분양'
                : result?.HOUSE_DTL_SECD_NM === '신혼희망타운'
                ? '신희타'
                : result?.HOUSE_DTL_SECD_NM === '도시형생활주택'
                ? '도시형'
                : result?.HOUSE_DTL_SECD_NM === '계약취소'
                ? '계약취소'
                : result?.HOUSE_SECD_NM === '무순위'
                ? '무순위'
                : ''}
            </S.MarkerTest>
          </>
        )}
      {result?.RCEPT_BGNDE <= today &&
        result?.RCEPT_ENDDE >= today &&
        result?.API === 'LH' && (
          <>
            <Image src={LH_today} alt={'청약가능'} height={65} quality={100} />
            <S.MarkerTest>
              {result?.HOUSE_DTL_SECD_NM.includes('행복주택') ||
              result?.HOUSE_DTL_SECD_NM === '공공임대' ||
              result?.HOUSE_DTL_SECD_NM === '국민임대' ||
              result?.HOUSE_DTL_SECD_NM === '영구임대' ||
              result?.HOUSE_DTL_SECD_NM === '민간임대' ||
              result?.HOUSE_DTL_SECD_NM === '공공지원민간임대'
                ? '임대'
                : result?.HOUSE_DTL_SECD_NM === '분양주택' ||
                  result?.HOUSE_DTL_SECD_NM === '민영' ||
                  result?.HOUSE_DTL_SECD_NM === '국민'
                ? '분양'
                : result?.HOUSE_DTL_SECD_NM === '신혼희망타운'
                ? '신희타'
                : result?.HOUSE_DTL_SECD_NM === '도시형생활주택'
                ? '도시형'
                : result?.HOUSE_DTL_SECD_NM === '계약취소'
                ? '계약취소'
                : result?.HOUSE_SECD_NM === '무순위'
                ? '무순위'
                : ''}
            </S.MarkerTest>
          </>
        )}
      {result?.RCEPT_BGNDE > today && result?.API === 'LH' && (
        <>
          <Image
            src={Apply_upcomming}
            alt={'청약가능'}
            height={65}
            quality={100}
          />
          <S.MarkerTest>
            {result?.HOUSE_DTL_SECD_NM.includes('행복주택') ||
            result?.HOUSE_DTL_SECD_NM === '공공임대' ||
            result?.HOUSE_DTL_SECD_NM === '국민임대' ||
            result?.HOUSE_DTL_SECD_NM === '영구임대' ||
            result?.HOUSE_DTL_SECD_NM === '민간임대' ||
            result?.HOUSE_DTL_SECD_NM === '공공지원민간임대'
              ? '임대'
              : result?.HOUSE_DTL_SECD_NM === '분양주택' ||
                result?.HOUSE_DTL_SECD_NM === '민영' ||
                result?.HOUSE_DTL_SECD_NM === '국민'
              ? '분양'
              : result?.HOUSE_DTL_SECD_NM === '신혼희망타운'
              ? '신희타'
              : result?.HOUSE_DTL_SECD_NM === '도시형생활주택'
              ? '도시형'
              : result?.HOUSE_DTL_SECD_NM === '계약취소'
              ? '계약취소'
              : result?.HOUSE_SECD_NM === '무순위'
              ? '무순위'
              : ''}
          </S.MarkerTest>
        </>
      )}
      {result?.RCEPT_BGNDE > today && result?.API === '청약홈' && (
        <>
          <Image
            src={LH_upcomming}
            alt={'청약가능'}
            height={65}
            quality={100}
          />
          <S.MarkerTest>
            {result?.HOUSE_DTL_SECD_NM.includes('행복주택') ||
            result?.HOUSE_DTL_SECD_NM === '공공임대' ||
            result?.HOUSE_DTL_SECD_NM === '국민임대' ||
            result?.HOUSE_DTL_SECD_NM === '영구임대' ||
            result?.HOUSE_DTL_SECD_NM === '민간임대' ||
            result?.HOUSE_DTL_SECD_NM === '공공지원민간임대'
              ? '임대'
              : result?.HOUSE_DTL_SECD_NM === '분양주택' ||
                result?.HOUSE_DTL_SECD_NM === '민영' ||
                result?.HOUSE_DTL_SECD_NM === '국민'
              ? '분양'
              : result?.HOUSE_DTL_SECD_NM === '신혼희망타운'
              ? '신희타'
              : result?.HOUSE_DTL_SECD_NM === '도시형생활주택'
              ? '도시형'
              : result?.HOUSE_DTL_SECD_NM === '계약취소'
              ? '계약취소'
              : result?.HOUSE_SECD_NM === '무순위'
              ? '무순위'
              : ''}
          </S.MarkerTest>
        </>
      )}
    </S.MarkerIconContainer>
  );
};

export default MarkerIcon;

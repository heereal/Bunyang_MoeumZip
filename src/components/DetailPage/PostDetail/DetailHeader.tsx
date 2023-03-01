import * as S from './style';

const DetailHeader = ({ bookmarksList, editBookmark, home, email }: any) => {
  return (
    <S.PageHeader>
      <S.BmrkBox>
        <S.BmrBtn
          onClick={() => editBookmark.mutate()}
          style={{
            color: bookmarksList?.usersList.includes(email)
              ? ' #FFEF5A     '
              : '#ffffff',
          }}
        >
          ★
        </S.BmrBtn>
      </S.BmrkBox>
      <S.HeaderBox>
        <S.HeaderTagBox>
          {home?.HOUSE_DTL_SECD_NM ? (
            <S.HeaderTag>{home?.HOUSE_DTL_SECD_NM}</S.HeaderTag>
          ) : (
            ''
          )}
          <S.HeaderTag>{home?.HOUSE_SECD_NM}</S.HeaderTag>
          <S.HeaderTag>{home?.SUBSCRPT_AREA_CODE_NM}</S.HeaderTag>
        </S.HeaderTagBox>
        <S.HeaderTitle>{home?.HOUSE_NM}</S.HeaderTitle>
        <S.HeaderAdres>{home?.FOR_COORDINATES_ADRES}</S.HeaderAdres>
        <S.HeaderBmrk>
          ★{bookmarksList?.usersList ? bookmarksList?.usersList?.length : '0'}
          명이 관심을 갖고 있어요
        </S.HeaderBmrk>
      </S.HeaderBox>
    </S.PageHeader>
  );
};

export default DetailHeader;
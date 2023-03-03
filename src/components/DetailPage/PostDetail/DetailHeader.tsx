import * as S from './style';

interface DetailHeaderProps {
  bookmarksList: any;
  editBookmark: any;
  home: HomeP | undefined;
  email: string | null | undefined;
}

const DetailHeader = ({
  bookmarksList,
  editBookmark,
  home,
  email,
}: DetailHeaderProps) => {
  return (
    <S.PageHeader>
      <S.BmrkBox>
        <S.BmrBtn
          onClick={() => editBookmark.mutate()}
          style={{
            color:
              typeof email === 'string' &&
              bookmarksList?.usersList.includes(email)
                ? ' #FFEF5A     '
                : '#ffffff',
          }}
        >
          <div>★ 북마크 추가하기</div>
        </S.BmrBtn>
      </S.BmrkBox>
      <S.HeaderBox>
        <S.HeaderTagBox>
          {home?.HOUSE_DTL_SECD_NM ? (
            <S.HeaderTag>{home?.HOUSE_DTL_SECD_NM}</S.HeaderTag>
          ) : (
            ''
          )}
          {home?.HOUSE_SECD_NM ? (
            <S.HeaderTag>{home?.HOUSE_SECD_NM}</S.HeaderTag>
          ) : (
            ''
          )}
          {home?.SUBSCRPT_AREA_CODE_NM ? (
            <S.HeaderTag>{home?.SUBSCRPT_AREA_CODE_NM}</S.HeaderTag>
          ) : (
            ''
          )}
        </S.HeaderTagBox>
        <S.HeaderTitle>{home?.HOUSE_NM}</S.HeaderTitle>
        <S.HeaderAdres>{home?.FOR_COORDINATES_ADRES}</S.HeaderAdres>
        <S.HeaderBmrk>
          <p style={{ color: '#FFEF5A ' }}>★</p>
          {bookmarksList?.usersList ? bookmarksList?.usersList?.length : '0'}
          명이 관심을 갖고 있어요
        </S.HeaderBmrk>
      </S.HeaderBox>
    </S.PageHeader>
  );
};

export default DetailHeader;

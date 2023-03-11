import { useRouter } from 'next/router';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { AiOutlineLeft } from 'react-icons/ai';
import * as S from './style';

interface DetailHeaderProps {
  bookmarksList: any;
  editBookmark: any;
  home: HomeP | undefined;
  session: any;
}

const DetailHeader = ({
  bookmarksList,
  editBookmark,
  home,
  session,
}: DetailHeaderProps) => {
  const router = useRouter();
  return (
    <S.PageHeader>
      <S.BmrkBox>
        <S.BmrkBackBtn>
          <AiOutlineLeft
            color="white"
            size={24}
            title="뒤로가기"
            onClick={() => router.back()}
          />
        </S.BmrkBackBtn>
        <S.BmrkBtn
          onClick={() => editBookmark.mutate()}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
            backgroundColor: bookmarksList?.usersList.includes(
              `${session?.user?.provider}_${session?.user?.email}`,
            )
              ? 'rgba(255, 255, 255, 0.2)'
              : 'transparent',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 4,
            }}
          >
            {bookmarksList?.usersList.includes(
              `${session?.user.provider}_${session?.user.email}`,
            ) ? (
              <>
                <div>
                  <AiFillStar size={16} color="yellow" />
                </div>
                <p
                  style={{
                    color: '#ffffff',
                    fontSize: 11,
                  }}
                >
                  북마크 추가 완료
                </p>
              </>
            ) : (
              <>
                <div>
                  <AiOutlineStar size={16} color="white" />
                </div>

                <p
                  style={{
                    color: '#ffffff',
                    fontSize: 11,
                  }}
                >
                  북마크 추가하기
                </p>
              </>
            )}
          </div>
        </S.BmrkBtn>
      </S.BmrkBox>
      <S.BmrkBoxMobile>
        <S.BmrkBackBtnMobile>
          <AiOutlineLeft
            color="white"
            size={24}
            title="뒤로가기"
            onClick={() => router.back()}
          />
        </S.BmrkBackBtnMobile>
        <S.BmrkBtnMobile
          onClick={() => editBookmark.mutate()}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
            backgroundColor: bookmarksList?.usersList.includes(
              `${session?.user?.provider}_${session?.user?.email}`,
            )
              ? 'rgba(255, 255, 255, 0.2)'
              : 'transparent',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 4,
            }}
          >
            {bookmarksList?.usersList.includes(
              `${session?.user.provider}_${session?.user.email}`,
            ) ? (
              <>
                <div>
                  <AiFillStar size={16} color="yellow" />
                </div>
              </>
            ) : (
              <>
                <div>
                  <AiOutlineStar size={20} color="white" />
                </div>
              </>
            )}
          </div>
        </S.BmrkBtnMobile>
      </S.BmrkBoxMobile>
      <S.HeaderBox>
        <S.HeaderTagBox>
          {home?.HOUSE_DTL_SECD_NM === home?.HOUSE_SECD_NM ? (
            <S.HeaderTag>{home?.HOUSE_DTL_SECD_NM} | </S.HeaderTag>
          ) : home?.HOUSE_DTL_SECD_NM && home?.HOUSE_SECD_NM ? (
            <>
              <S.HeaderTag>{home?.HOUSE_DTL_SECD_NM} | </S.HeaderTag>
              <S.HeaderTag>{home?.HOUSE_SECD_NM} | </S.HeaderTag>
            </>
          ) : !home?.HOUSE_DTL_SECD_NM ? (
            <S.HeaderTag>{home?.HOUSE_SECD_NM} | </S.HeaderTag>
          ) : !home?.HOUSE_SECD_NM ? (
            <S.HeaderTag>{home?.HOUSE_DTL_SECD_NM} |</S.HeaderTag>
          ) : (
            ''
          )}

          <S.HeaderTag>{home?.SUBSCRPT_AREA_CODE_NM}</S.HeaderTag>
        </S.HeaderTagBox>
        <S.HeaderTitle>{home?.HOUSE_NM}</S.HeaderTitle>
        <S.HeaderAdres>{home?.FOR_COORDINATES_ADRES}</S.HeaderAdres>
        {bookmarksList?.usersList.includes(
          `${session?.user.provider}_${session?.user.email}`,
        ) ? (
          <S.HeaderBmrk>
            <AiFillStar size={18} color="yellow" />
            {bookmarksList?.usersList ? bookmarksList?.usersList?.length : '0'}
            명이 관심을 갖고 있어요
          </S.HeaderBmrk>
        ) : (
          <S.HeaderBmrk>
            <AiFillStar size={18} color="yellow" />
            {bookmarksList?.usersList ? bookmarksList?.usersList?.length : '0'}
            명이 관심을 갖고 있어요
          </S.HeaderBmrk>
        )}
      </S.HeaderBox>
    </S.PageHeader>
  );
};

export default DetailHeader;

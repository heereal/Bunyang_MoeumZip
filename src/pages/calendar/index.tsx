import { db } from '@/common/firebase';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import { doc, getDoc } from 'firebase/firestore';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import * as S from '../../styles/claendar.style';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import Calendar from '../../../public/assets/calendar.png';
import { RxDotFilled } from 'react-icons/rx';
import { calendarColorList } from '@/common/categoryList';

const Calender = ({ homeList }: HomeP) => {
  const router = useRouter();

  return (
    <>
      <S.CalendarWrapper>
        <NextSeo
          title="청약캘린더 -"
          description="청약일정을 캘린더에서 한 눈에 확인 가능합니다."
          canonical="https://www.by-zip.com/calendar"
          openGraph={{
            url: 'https://www.by-zip.com/admin/calendar',
          }}
        />
        <S.CalendarContainer>
          <S.CalendarHeader>
            <S.CalendarDescContainer>
              <S.Title>청약 일정을 확인해 보세요.</S.Title>
              <S.CategoryContainer>
                {calendarColorList.map((item, index) => (
                  <S.Category key={index} color={item.color}>
                    <RxDotFilled size="20" style={{ marginRight: 2 }} />
                    {item.cate}
                  </S.Category>
                ))}
              </S.CategoryContainer>
            </S.CalendarDescContainer>
            <S.CalendarIcon>
              <Image
                className="calendarIcon"
                src={Calendar}
                alt="calendarIcon"
                height={80}
                quality={100}
                priority={true}
              />
            </S.CalendarIcon>
          </S.CalendarHeader>
          <S.FullCalendarContainer>
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              headerToolbar={{
                left: 'prev',
                center: 'title',
                right: 'next',
              }}
              initialView="dayGridMonth"
              nowIndicator={true}
              fixedWeekCount={false} // 달에 따라 4-6주를 보여줌 (6주로 고정x)
              weekends={false} // 토요일 일요일 제거
              locale={'ko'} // 한글 표기
              contentHeight="auto" // 스크롤 생성되지 않고 높이 자동 조절
              events={homeList}
              eventClick={(e) => router.push(`/detail/${e.event.id}`)}
            />
          </S.FullCalendarContainer>
        </S.CalendarContainer>
        <S.HeaderBackground />
      </S.CalendarWrapper>
    </>
  );
};

export default Calender;

export const getStaticProps: GetStaticProps = async () => {
  const docRef = doc(db, 'HomeList', 'homeData');
  const docSnap = await getDoc(docRef);
  const getHomeList = docSnap.data();

  const homeList: any = [];
  // 캘린더에 이벤트를 보여주기 위해 기존 분양 데이터를 재가공함
  getHomeList?.allHomeData.map((item: HomeP) =>
    homeList.push({
      title: item.HOUSE_NM,
      date: item.RCEPT_ENDDE,
      id: item.PBLANC_NO,
      borderColor: 'transparent',
      backgroundColor:
        item.HOUSE_DTL_SECD_NM.includes('행복주택') ||
        item.HOUSE_DTL_SECD_NM === '공공임대' ||
        item.HOUSE_DTL_SECD_NM === '국민임대' ||
        item.HOUSE_DTL_SECD_NM === '영구임대' ||
        item.HOUSE_DTL_SECD_NM === '민간임대' ||
        item.HOUSE_DTL_SECD_NM === '공공지원민간임대'
          ? '#DAF8FF'
          : item.HOUSE_DTL_SECD_NM === '분양주택' ||
            item.HOUSE_DTL_SECD_NM === '민영' ||
            item.HOUSE_DTL_SECD_NM === '국민'
          ? '#FFECD7'
          : item.HOUSE_DTL_SECD_NM === '신혼희망타운'
          ? '#FFE9FF'
          : item.HOUSE_DTL_SECD_NM === '도시형생활주택'
          ? '#FFFCE0'
          : item.HOUSE_DTL_SECD_NM === '계약취소'
          ? '#D4E3FF'
          : item.HOUSE_SECD_NM === '무순위'
          ? '#F4F2F2'
          : '#b1b7bdac',

      textColor:
        item.HOUSE_DTL_SECD_NM.includes('행복주택') ||
        item.HOUSE_DTL_SECD_NM === '공공임대' ||
        item.HOUSE_DTL_SECD_NM === '국민임대' ||
        item.HOUSE_DTL_SECD_NM === '영구임대' ||
        item.HOUSE_DTL_SECD_NM === '민간임대' ||
        item.HOUSE_DTL_SECD_NM === '공공지원민간임대'
          ? '#25AAC8'
          : item.HOUSE_DTL_SECD_NM === '분양주택' ||
            item.HOUSE_DTL_SECD_NM === '민영' ||
            item.HOUSE_DTL_SECD_NM === '국민'
          ? '#FF971D'
          : item.HOUSE_DTL_SECD_NM === '신혼희망타운'
          ? '#FB39FF'
          : item.HOUSE_DTL_SECD_NM === '도시형생활주택'
          ? '#D4BF00'
          : item.HOUSE_DTL_SECD_NM === '계약취소'
          ? '#2B54A3'
          : item.HOUSE_SECD_NM === '무순위'
          ? '#5C5C5C'
          : 'white',
    }),
  );

  return {
    props: { homeList },
    // ISR - 12시간 마다 데이터 업데이트
    revalidate: 43200,
  };
};

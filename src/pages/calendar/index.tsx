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

const Calender = ({ homeList }: any) => {
  const router = useRouter();

  const array: any = [];
  console.log('homeList:', homeList);

  // 캘린더에 이벤트를 보여주기 위해 기존 분양 데이터를 재가공함
  homeList.allHomeData.map((item: any) =>
    array.push({
      title: item.HOUSE_NM,
      date: item.RCEPT_ENDDE,
      id: item.PBLANC_NO,
      borderColor: 'transparent',
      backgroundColor:
        item.HOUSE_DTL_SECD_NM === '행복주택' ||
        item.HOUSE_DTL_SECD_NM === '공공임대' ||
        item.HOUSE_DTL_SECD_NM === '국민임대' ||
        item.HOUSE_DTL_SECD_NM === '영구임대' ||
        item.HOUSE_DTL_SECD_NM === '민간임대' ||
        item.HOUSE_DTL_SECD_NM === '공공지원민간임대'
          ? '#EFF4FF'
          : item.HOUSE_DTL_SECD_NM === '분양주택' ||
            item.HOUSE_DTL_SECD_NM === '민영' ||
            item.HOUSE_DTL_SECD_NM === '국민'
          ? '#FFECEC'
          : item.HOUSE_DTL_SECD_NM === '신혼희망타운'
          ? '#F9EDFF'
          : item.HOUSE_DTL_SECD_NM === '도시형생활주택'
          ? '#FFFCE0'
          : item.HOUSE_DTL_SECD_NM === '계약취소'
          ? '#E8FFF2'
          : '#b1b7bdac',

      textColor:
        item.HOUSE_DTL_SECD_NM === '행복주택' ||
        item.HOUSE_DTL_SECD_NM === '공공임대' ||
        item.HOUSE_DTL_SECD_NM === '국민임대' ||
        item.HOUSE_DTL_SECD_NM === '영구임대' ||
        item.HOUSE_DTL_SECD_NM === '민간임대' ||
        item.HOUSE_DTL_SECD_NM === '공공지원민간임대'
          ? '#356EFF'
          : item.HOUSE_DTL_SECD_NM === '분양주택' ||
            item.HOUSE_DTL_SECD_NM === '민영' ||
            item.HOUSE_DTL_SECD_NM === '국민'
          ? '#FF4141'
          : item.HOUSE_DTL_SECD_NM === '신혼희망타운'
          ? '#AF1DF3'
          : item.HOUSE_DTL_SECD_NM === '도시형생활주택'
          ? '#D4BF00'
          : item.HOUSE_DTL_SECD_NM === '계약취소'
          ? '#24CE71'
          : 'white',
    }),
  );

  return (
    <>
      <S.CalendarWrapper>
        <NextSeo
          title="청약캘린더 -"
          description="청약일정을 캘린더에서 한 눈에 확인 가능합니다."
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
              selectable={true}
              fixedWeekCount={false} // 매달에 따라 4-6주를 보여줌 (6주로 고정x)
              weekends={false} // 토요일 일요일 제거
              locale={'ko'} // 한글 표기
              // aspectRatio={1} // 종횡비-너비가 높이의 두 배
              // height={"800"}
              events={array}
              // eventDisplay={'list-item'}
              // eventColor="#6096B4"
              // eventMouseEnter={(e)=>e.target.style={}}
              eventClick={(e) => router.push(`/detail/${e.event.id}`)}
            />
          </S.FullCalendarContainer>
        </S.CalendarContainer>
      </S.CalendarWrapper>
      <S.HeaderBackground />
    </>
  );
};

export default Calender;

export const getStaticProps: GetStaticProps = async () => {
  const docRef = doc(db, 'HomeList', 'homeData');
  const docSnap = await getDoc(docRef);
  const homeList = docSnap.data();

  return {
    props: { homeList },
    // ISR - 1시간 마다 데이터 업데이트
    revalidate: 3600,
  };
};

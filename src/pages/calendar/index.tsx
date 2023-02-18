import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import * as S from '../../styles/claendar.style';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/common/firebase';
import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';

const Calender = () => {
  const [homeList, setHomeList] = useState([]);

  const getHomeList = async () => {
    const docRef = doc(db, 'HomeList', 'homeData');
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  };

  const { data } = useQuery('TEST', getHomeList);

  const array: any = [];
  homeList.map((item: any) =>
    array.push({
      title: item.HOUSE_NM,
      date: item.RCEPT_ENDDE,
    }),
  );

  useEffect(() => {
    if (data) setHomeList(data.allHomeData);
  }, [data]);

  return (
    <S.CalendarContainer>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        headerToolbar={{
          left: 'prev',
          center: 'title',
          right: 'next',
          // right: 'dayGridMonth,timeGridWeek'
        }}
        initialView="dayGridMonth"
        nowIndicator={true}
        editable={true}
        selectable={true}
        locale={'ko'} // 한글 표기
        // aspectRatio={2} // 종횡비-너비가 높이의 두 배
        // height={"90%"}
        initialEvents={[{ title: 'nice event', start: new Date() }]}
        events={array}
        // events={[
        //   {
        //     title: '최종프로젝트',
        //     date: '2023-02-01',
        //   },
        // ]}
      />
    </S.CalendarContainer>
  );
};

export default Calender;

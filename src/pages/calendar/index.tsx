import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import * as S from '../../styles/claendar.style';

const Calender = () => {
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
        events={[
          {
            title: '최종프로젝트',
            date: '2023-02-01',
          },
        ]}
      />
    </S.CalendarContainer>
  );
};

export default Calender;

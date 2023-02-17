import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'

const Calender = () => {
  return (
    <FullCalendar
    plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
    headerToolbar={{
      left: 'prev',
      center: 'title',
      right: 'next',
      // right: 'dayGridMonth,timeGridWeek'
    }}
    initialView='dayGridMonth'
    nowIndicator={true}
    editable={true}
    selectable={true}
    // aspectRatio={2} // 종횡비-너비가 높이의 두 배
    // height={"90%"} 
    initialEvents={[
      { title: 'nice event', start: new Date() }
    ]}
  />
  );
};
 
export default Calender;
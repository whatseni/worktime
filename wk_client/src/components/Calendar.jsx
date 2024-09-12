import React, { useEffect, useState } from 'react';
import ScheduleRegister from './ScheduleRegister';
import { Calendar as MyCalendar } from 'my_calendar';

const formatDate = (input) => {
  const date = new Date(input);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
  const day = String(date.getDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}
export default function Calendar({ timeDatas }) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [hasTimeDate, setHasTimeDate] = useState(false);
  const [timeData, setTimeData] = useState([]);
  const [yearMonth, setYearMonth] = useState(null);
  const [isMount, setIsMount] = useState(false);

  const onDateClick = (date) => {
    // TODO :: 해당 날짜에 근무 시간 존재하는지 체크
    onOpenScheduleModal(formatDate(date));
  }

  const onEventClick = (event) => {

  }
  const onMonthEvent = (year, month) => {
    // setTimeData(response)
  }

  const onOpenScheduleModal = (selected) => {
    setSelectedDate(selected)
    setOpenModal(true);
  }

  useEffect(() => {
    setIsMount(true);
    return () => setIsMount(false)
  }, [])

  useEffect(() => {
    if (isMount) {
      // TODO :: timeData 뿌리기
      // handleMonthEvents(new Date().getFullYear(), new Date().getMonth())
      // setTimeData(response)
    }
  }, [timeData])



  return (
    <>
      {/* <FullCalendar plugins={[dayGridPlugin, interactionPlugin]} locale="ko" height="auto"
        dateClick={onDateClick}
        headerToolbar={{
          left: 'prev',
          center: 'title',
          right: 'next',
        }}
      /> */}
      <MyCalendar onMonthEvent={onMonthEvent} events={timeData} onDateClick={onDateClick} onEventClick={onEventClick} />
      <ScheduleRegister open={openModal} setOpenModal={setOpenModal} date={selectedDate} hasTimeDate={hasTimeDate} timeData={timeData} />
    </>
  );
}
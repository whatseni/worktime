import React, { useState } from 'react';
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction';
import ScheduleRegister from './ScheduleRegister';

const formatDate = (input) => {
  const date = new Date(input);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
  const day = String(date.getDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}
export default function Calendar() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const onDateClick = ({ date }) => {
    onOpenScheduleModal(formatDate(date));
  }
  const onOpenScheduleModal = (selected) => {
    setSelectedDate(selected)
    setOpenModal(true);
  }

  return (
    <>
      <FullCalendar plugins={[dayGridPlugin, interactionPlugin]} locale="ko" height="auto"
        dateClick={onDateClick}
        headerToolbar={{
          left: 'prev',
          center: 'title',
          right: 'next',
        }}
      />
      <ScheduleRegister open={openModal} setOpenModal={setOpenModal} date={selectedDate} />
    </>
  );
}
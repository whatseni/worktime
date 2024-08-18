import React, { useState } from 'react';
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction';
import ScheduleRegister from './ScheduleRegister';

export default function Calendar() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const onDateClick = ({ date }) => {
    console.log(date)
    onOpenScheduleModal(date);
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
"use client";

import { DateSelectArg, EventClickArg, EventInput } from "@fullcalendar/core/index.js";
import FullCalendar from "@fullcalendar/react";
import { useRef, useState } from "react"
import Modal from "./calendar/Modal";


interface CalendarEvent extends EventInput {
  extendedProps: {
    calendar: string;
  };
}

export default function Calendar() {

  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const calendarRef = useRef<FullCalendar>(null);

  const handleDateSelect = (selectInfo: DateSelectArg) => {

  }

  const handleEventClick = (clickInfo: EventClickArg) => {

  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white">
      <div className="custom-calendar">
        {/* <FullCalendar 

        /> */}
        <Modal />
      </div>
    </div>
  )
}
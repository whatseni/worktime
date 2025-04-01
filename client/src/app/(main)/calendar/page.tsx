"use client"

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import React, { useEffect, useRef, useState } from "react";
import { DatesSetArg, EventContentArg, EventInput } from "@fullcalendar/core/index.js";
import axios from "axios";
import { useSession } from "@/src/context/LoginContext";

interface CalendarEvent extends EventInput {
  extendedProps: {
    diff: string
  }
}

export default function Calendar() {
  const calendarRef = useRef<FullCalendar>(null);
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  const today = new Date();
  const [year, setYear] = useState<number>(today.getFullYear());
  const [month, setMonth] = useState<number>(today.getMonth() + 1);

  const [total, setTotal] = useState(0);

  const { getId, getCompany } = useSession();

  const handleDateSet = (dateInfo: DatesSetArg) => {
    const monthStart = dateInfo.view.currentStart;
    const year = monthStart.getFullYear();
    const month = monthStart.getMonth() + 1;
    setYear(year);
    setMonth(month);
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios(`${process.env.NEXT_PUBLIC_DEV_URL}/api/time?company=${getCompany()}&year=${year}&month=${month}&userId=${getId()}`)
      setEvents(response.data.data.data)
      setTotal(response.data.data.totalTime)
    }

    fetchData();
  }, [year, month])
  

  return (
    <>
      <div className="rounded-2xl border border-gray-200 bg-white m-4">
        <div className="custom-calendar">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev,next",
              center: "title",
              right: ""
            }}
            events={events}
            datesSet={handleDateSet}
            eventContent={renderEventContent}
          />
        </div>
      </div>
      <div className="rounded-2xl border border-gray-200 bg-blue-light-400 w-[20%] text-white">
        시간 
      </div>
    </>
  )
}

const renderEventContent = (eventInfo: EventContentArg) => {
  return (
    <div className="event-fc-color flex fc-event-main fc-bg-primary rounded-sm">
      <div className="fc-event-title">{eventInfo.event.extendedProps.diff}</div>
    </div>
  )
}
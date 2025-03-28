"use client"

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect, useRef, useState } from "react";
import { EventInput } from "@fullcalendar/core/index.js";

interface CalendarEvent extends EventInput {
  extendedProps: {
    startTime: string,
    endTime: string,
    diff: string
  }
}

export default function Calendar() {
  const calendarRef = useRef<FullCalendar>(null);
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    const fetchData = async () => {

    }

    fetchData();
  }, [])

  return (
    <div className="rounded-2xl border border-gray-200 bg-white">
      <div className="custom-calendar m-4">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next",
            center: "title",
            right: ""
          }}
          events={events}
          contentHeight={400}
        />
      </div>
    </div>
  )
}
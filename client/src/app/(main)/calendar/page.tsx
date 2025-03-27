import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useRef, useState } from "react";
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

  return (
    <div className="rounded-2xl border border-gray-200 bg-white">
      <div className="custom-calendar">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next addEventButton",
            center: "title",
            right: "dayGridMonth"
          }}
          events={events}
        />
      </div>
    </div>
  )
}
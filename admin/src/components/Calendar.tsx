"use client";

import { DateSelectArg, EventClickArg, EventContentArg, EventInput } from "@fullcalendar/core/index.js";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect, useRef, useState } from "react"
import CalendarModal from "./calendar/CalendarModal";
import axios from "axios";

interface CalendarEvent extends EventInput {
  extendedProps: {
    startTime: string,
    endTime: string,
    diff: string
  }
}

export default function Calendar() {

  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  const [eventId, setEventId] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventStartTime, setEventStartTime] = useState("");
  const [eventEndTime, setEventEndTime] = useState("");
  
  const calendarRef = useRef<FullCalendar>(null);
  const today = new Date();
  const [year, setYear] = useState<number>(today.getFullYear());
  const [month, setMonth] = useState<number>(today.getMonth() + 1);
  
  const [isOpen, setIsOpen] = useState(false);
  
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    resetModalFields();
    setEventDate(selectInfo.startStr);
    openModal();
  }

  const handleEventClick = (clickInfo: EventClickArg) => {
    const event = clickInfo.event;
    console.log(event)
    // setEventId(event.id)
    openModal();
  }

  const handleAddEvents = async (selected: any) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_DEV_URL}/api/time?company=${"PB"}`, {
      date: eventDate,
      start: eventStartTime,
      end: eventEndTime,
      selected: selected,
      company: "PB"
    });
  }

  const handleDeleteEvent = async (selected: any) => {
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_DEV_URL}/api/time?company=${"PB"}`, {
      data: {
        eventId: eventId
      }
    })
  }

  const resetModalFields = () => {
    setEventDate("");
    setEventStartTime("");
    setEventEndTime("");
  }

  const handleDatesSet = (dateInfo: any) => {
    const monthStart = dateInfo.view.currentStart;
    const year = monthStart.getFullYear();
    const month = monthStart.getMonth() + 1;
    setYear(year);
    setMonth(month);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_DEV_URL}/api/time?company=PB&year=${year}&month=${month}`);
        setEvents(response.data.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchData();
  },[year, month])

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
          selectable={true}
          select={handleDateSelect}
          eventClick={handleEventClick}
          eventContent={renderEventContent}
          customButtons={{
            addEventButton: {
              text: "등록 +",
              click: openModal
            }
          }}
          datesSet={handleDatesSet}
        />
        <CalendarModal isOpen={isOpen} onClose={closeModal} selectedEvent={selectedEvent} 
        eventDate={eventDate} setEventDate={setEventDate}
        eventStartTime={eventStartTime} eventEndTime={eventEndTime}
        setEventStartTime={setEventStartTime} setEventEndTime={setEventEndTime}
        handleAddEvents={handleAddEvents}
        />
      </div>
    </div>
  )
}

const renderEventContent = (eventInfo: EventContentArg) => {
  return (
    <div
      className="event-fc-color flex fc-event-main fc-bg-primary p-1 rounded-sm"
    >
      <div className="fc-daygrid-event-dot"></div>
      <div className="fc-event-title">{eventInfo.event.title}</div>
      <div className="fc-event-time text-gray-500">{eventInfo.event.extendedProps.diff}</div>
    </div>
  )
}
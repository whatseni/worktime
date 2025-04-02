"use client";

import { DateSelectArg, EventClickArg, EventContentArg, EventInput } from "@fullcalendar/core/index.js";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect, useRef, useState } from "react"
import CalendarModal from "./calendar/CalendarModal";
import axios from "axios";
import { toast } from "react-toastify";
import { useSession } from "../context/AdminContext";

interface CalendarEvent extends EventInput {
  extendedProps: {
    staffId: string,
    startTime: string,
    endTime: string,
    diff: string
  }
}

function formatDate(date: any) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
}

export default function Calendar() {
  const { getCompany } = useSession();

  const [events, setEvents] = useState<CalendarEvent[]>([]);

  const [eventId, setEventId] = useState<string | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<string>("");
  const [eventDate, setEventDate] = useState<any>("");
  const [eventStartTime, setEventStartTime] = useState("");
  const [eventEndTime, setEventEndTime] = useState("");
  
  const calendarRef = useRef<FullCalendar>(null);
  const today = new Date();
  const [year, setYear] = useState<number>(today.getFullYear());
  const [month, setMonth] = useState<number>(today.getMonth() + 1);
  
  const [isOpen, setIsOpen] = useState(false);
  
  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setEventId(null);
    setSelectedStaff("");
  }

  const [change, setChange] = useState(false);

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    resetModalFields();
    setEventDate(selectInfo.startStr);
    openModal();
  }

  const handleEventClick = (clickInfo: EventClickArg) => {
    const event = clickInfo.event;
    setEventId(event.id);
    setSelectedStaff(event.extendedProps.staffId);
    setEventDate(formatDate(event.start));
    setEventStartTime(event.extendedProps.startTime);
    setEventEndTime(event.extendedProps.endTime);
    openModal();
  }

  const handleAddEvents = async (selected: any) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_DEV_URL}/api/time`, {
      date: eventDate,
      start: eventStartTime,
      end: eventEndTime,
      selected: selected,
      company: getCompany(),
      id: eventId
    });

    if (response.data.code === 200) {
      setChange(prev => !prev);
      toast.success("스케줄 생성 성공.");
      closeModal()
    } else if (response.data.code === "400") {
      toast.error("스케줄 생성 실패. 다시 확인바람.");
    }
  }

  const handleDeleteEvent = async () => {
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_DEV_URL}/api/time?id=${eventId}`)
    if (response.data.code === 200) {
      setChange(prev => !prev);
      closeModal();
      toast.success("스케줄 삭제 성공.");
    } else if (response.data.code === "400") {
      toast.error("스케줄 삭제 실패. 다시 확인바람.");
    }
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
        if (response.data.code === 200)
          setEvents(response.data.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchData();
  },[year, month, change])

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
        <CalendarModal isOpen={isOpen} onClose={closeModal} eventId={eventId}
        selectedStaff={selectedStaff} setSelectedStaff={setSelectedStaff}
        eventDate={eventDate} setEventDate={setEventDate}
        eventStartTime={eventStartTime} eventEndTime={eventEndTime}
        setEventStartTime={setEventStartTime} setEventEndTime={setEventEndTime}
        handleAddEvents={handleAddEvents} handleDeleteEvent={handleDeleteEvent}
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
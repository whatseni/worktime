import { Fragment, SetStateAction, useCallback, useContext, useEffect, useMemo, useState } from "react";
import Calendar from "./calendar/Calendar";
import { Event, Views } from "react-big-calendar";
import { Box } from "@mui/material";
import { toast } from "react-toastify";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import ScheduleRegister from "./calendar/ScheduleRegister";
import { handleGetAllUserTimeMonth } from "../utils/api";
import { CurrentAdminContext } from "./context/adminContext";
import ScheduleModal from "./calendar/ScheduleModal";
import { CalEventType } from "../types/apiPayload";

dayjs.extend(utc);

export default function CalendarComponent() {
  const [events, setEvents] = useState<Event[] | undefined>([]);
  const [date, setDate] = useState<Date>(new Date());

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [defaultStart, setDefaultStart] = useState<Date | undefined>();
  const [defaultEnd, setDefaultEnd] = useState<Date | undefined>();
  const [selectEventId, setSelectEventId] = useState<string | undefined>("");
  
  const { currentAdmin, currentCompany } = useContext(CurrentAdminContext);

  const { defaultDate, views } = useMemo(() => {
    const today = new Date();
    return {
      defaultDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
      views: [Views.MONTH],
    };
  }, []);

  const onNavigate = useCallback((newDate: SetStateAction<Date>) => setDate(newDate), [setDate])

  const onSelectEvent = useCallback((calEvent: CalEventType) => {
    setDefaultStart(calEvent.start)
    setDefaultEnd(calEvent.end)
    setModalOpen(true)
    setSelectEventId(calEvent.id)
  }, [])

  useEffect(() => {
  const fetchData = async () => {
    try {
      const eventsResult = await handleGetAllUserTimeMonth({ date, company: "PB"})
      if (eventsResult && Array.isArray(eventsResult)) {
        const events: any = eventsResult.map((event: Event) => ({
          ...event,
          start: dayjs.utc(event.start).local().toDate(), // 로컬 시간으로 변환
          end: dayjs.utc(event.end).local().toDate(),
        }));
        
        setEvents(events);
      } else {
        toast.error("근무 일정 데이터를 불러오는 데 실패했습니다.");
      }
      
    } catch (error) {
      toast.error("데이터를 불러오는 중 문제가 발생했습니다.");
    }
  };

  fetchData();
  }, [date]);

  return (
    <Fragment>
      <ScheduleRegister />
      <ScheduleModal open={modalOpen} setOpen={setModalOpen} defaultStart={defaultStart} defaultEnd={defaultEnd} selectEventId={selectEventId}/>
      <Box sx={{
        height: "80vh",
        padding: "20px",
      }}>
        <Calendar defaultDate={defaultDate} views={views} events={events} onNavigate={onNavigate} date={date} onSelectEvent={onSelectEvent} />
      </Box>
    </Fragment>
    
  )
}
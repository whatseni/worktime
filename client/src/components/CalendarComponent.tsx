import { SetStateAction, useCallback, useContext, useEffect, useMemo, useState } from "react";
import Calendar from "./Calendar";
import { Event, Views } from "react-big-calendar";
import { Box, Typography } from "@mui/material";
import { handleGetAllTimeByMonth, handleGetScheduleByMonth } from "../utils/api";
import { CurrentUserContext } from "../context/userContext";
import { EventType } from "../types/apiPayload";
import { toast } from "react-toastify";
import ScheduleModal from "./ScheduleModal";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export default function CalendarComponent() {
  const [events, setEvents] = useState<EventType[] | undefined>([]);
  const [date, setDate] = useState(new Date());
  const [allTime,setAllTime] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [defaultStart, setDefaultStart] = useState<any>();
  const [defaultEnd, setDefaultEnd] = useState<any>();
  const [selectEventId, setSelectEventId] = useState<string>("");

  const { currentUser, currentPhone } = useContext(CurrentUserContext);

  const { defaultDate, views } = useMemo(() => {
    const today = new Date();
    return {
      defaultDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
      views: [Views.MONTH],
    };
  }, []);

  const onNavigate = useCallback((newDate: SetStateAction<Date>) => setDate(newDate), [setDate])

  const onSelectEvent = useCallback((calEvent: any) => {
    if (calEvent) {
      setDefaultStart(calEvent.start)
      setDefaultEnd(calEvent.end)
      setModalOpen(true)
      setSelectEventId(calEvent.id)
    }
  }, [])

  useEffect(() => {
  const fetchData = async () => {
    try {
      const [eventsResult, timeResult] = await Promise.all([
        handleGetScheduleByMonth({ user: currentUser, phone: currentPhone, date }),
        handleGetAllTimeByMonth({ user: currentUser, phone: currentPhone, date }),
      ]);

      if (eventsResult && Array.isArray(eventsResult)) {
        const events: any = eventsResult.map((event: { start: string | number | Date; end: string | number | Date; }) => ({
          ...event,
          start: dayjs.utc(event.start).local().toDate(), // 로컬 시간으로 변환
          end: dayjs.utc(event.end).local().toDate(),
        }));
        
        setEvents(events);
      } else {
        toast.error("근무 일정 데이터를 불러오는 데 실패했습니다.");
      }

      if (timeResult !== null && typeof timeResult === "string") {
        setAllTime(timeResult);
      } else {
        toast.error("근무 총 시간을 불러오는 데 실패했습니다.");
      }
    } catch (error) {
      toast.error("데이터를 불러오는 중 문제가 발생했습니다.");
    }
  };

  fetchData();
  }, [date, modalOpen]);

  return (
    <Box sx={{
      height: "80vh",
      width: "90vw"
    }} >
      <ScheduleModal open={modalOpen} setOpen={setModalOpen} defaultStart={defaultStart} defaultEnd={defaultEnd} selectEventId={selectEventId}/>
      <Calendar defaultDate={defaultDate} views={views} events={events} onNavigate={onNavigate} date={date} onSelectEvent={onSelectEvent} />
      <Box display="flex" flexDirection="row" justifyContent="center" width="100%">
        <Typography variant="h5">이번 달 총 시간 : {allTime}</Typography>
      </Box>
    </Box>
  )
}
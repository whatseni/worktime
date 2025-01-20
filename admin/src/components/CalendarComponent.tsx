import { Fragment, SetStateAction, useCallback, useContext, useEffect, useMemo, useState } from "react";
import Calendar from "./calendar/Calendar";
import { Event, Views } from "react-big-calendar";
import { Box, Typography } from "@mui/material";
import { toast } from "react-toastify";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import ScheduleRegister from "./calendar/ScheduleRegister";
import { handleGetAllUserTimeMonth } from "../utils/api";

dayjs.extend(utc);

export default function CalendarComponent() {
  const [events, setEvents] = useState<any[]| undefined>([]);
  const [date, setDate] = useState(new Date());

  const { defaultDate, views } = useMemo(() => {
    const today = new Date();
    return {
      defaultDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
      views: [Views.MONTH],
    };
  }, []);

  const onNavigate = useCallback((newDate: SetStateAction<Date>) => setDate(newDate), [setDate])

  const onSelectEvent = useCallback((calEvent: Event) => {
    console.log(calEvent)
  }, [])

  useEffect(() => {
  const fetchData = async () => {
    try {
      await handleGetAllUserTimeMonth({ date, company: 'PB'})
      
    } catch (error) {
      toast.error("데이터를 불러오는 중 문제가 발생했습니다.");
    }
  };

  fetchData();
  }, [date]);

  return (
    <Fragment>
      <ScheduleRegister />
      <Box sx={{
        height: "80vh",
        padding: "20px",
      }}>
        <Calendar defaultDate={defaultDate} views={views} events={events} onNavigate={onNavigate} date={date} onSelectEvent={onSelectEvent} />
      </Box>
    </Fragment>
    
  )
}
import { SetStateAction, useCallback, useContext, useEffect, useMemo, useState } from "react";
import Calendar from "./Calendar";
import { Event, Views } from "react-big-calendar";
import { Box } from "@mui/material";
import { handleGetScheduleByMonth } from "../utils/api";
import { CurrentUserContext } from "../context/userContext";
import { EventType } from "../types/apiPayload";

export default function CalendarComponent() {
  const [isMount, setIsMount] = useState<boolean>(true);
  const [events, setEvents] = useState<EventType[] | undefined>([]);
  const [date, setDate] = useState(new Date())
  const { currentUser, currentPhone, currentCompany } = useContext(CurrentUserContext)
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
    setIsMount(true);
    return () => setIsMount(false)
  }, [])

  useEffect(() => {
    const result = handleGetScheduleByMonth({ user: currentUser, phone: currentPhone, company: currentCompany })
    if (!result && isMount) {
      setEvents(result);
    }
  }, [])
  return (
    <Box sx={{
      height: "80vh",
      width: "90vw"
    }} >
      <Calendar defaultDate={defaultDate} views={views} events={events} onNavigate={onNavigate} date={date} onSelectEvent={onSelectEvent} />
    </Box>
  )
}
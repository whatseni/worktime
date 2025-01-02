import { Calendar } from "my_calendar";
import { useEffect, useState } from "react"
import { formatYearMonth } from "../../utils/format";
import { useSession } from "../context/sessionContext";
import EventModal from "./EventModal";

export default function CalendarComponent() {

  const { getSessionCompany } = useSession();
  const [isMount, setIsMount] = useState(true);

  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth() + 1);

  const [monthEvents, setMonthEvents] = useState([]);
  const [selectEvent, setSelectEvent] = useState(null);

  const [openEventModal, setOpenEventModal] = useState(false);

  // 월 변경
  const onChangeMonth = (year, month) => {
    setCurrentYear(year);
    setCurrentMonth(month + 1);
  }

  // 날짜 내 이벤트 클릭
  const onClickEvent = async (clickevent, event) => {
    clickevent.stopPropagation();
    setSelectEvent(event.date);
    setOpenEventModal(true);
  }

  const handleGetScheduleByMonth = async (year, month) => {
    // const response = await axios.post('/time/get-alluser-time-month', {
    //   date: formatYearMonth(year, month),
    //   company: getSessionCompany()
    // })
    console.log(response)
  }
  useEffect(() => {
    handleGetScheduleByMonth(currentYear, currentMonth);
  }, [currentMonth, currentYear])
  return (
    <>
      <EventModal open={openEventModal} onClose={() => setOpenEventModal(false)} info={selectEvent}/>
      <Calendar onChangeMonth={onChangeMonth} events={monthEvents} onClickEvent={onClickEvent} />
    </>
  )
}
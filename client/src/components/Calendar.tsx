import dayjs from "dayjs"
import {
  Calendar as BigCalendar,
  CalendarProps,
  dayjsLocalizer,
} from "react-big-calendar";
import 'react-big-calendar/lib/css/react-big-calendar.css'
const djLocalizer = dayjsLocalizer(dayjs);

export default function Calendar(props: Omit<CalendarProps, "localizer">) {
  return <BigCalendar {...props} localizer={djLocalizer} />
}
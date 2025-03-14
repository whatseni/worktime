import dayjs from "dayjs"
import utc from "dayjs/plugin/utc";
import {
  Calendar as BigCalendar,
  CalendarProps,
  dayjsLocalizer,
} from "react-big-calendar";
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { CalEventType } from "../../types/apiPayload";

dayjs.extend(utc); // UTC 플러그인 확장
const djLocalizer = dayjsLocalizer(dayjs);

export default function Calendar(props: Omit<CalendarProps<CalEventType>, "localizer">) {
  return <BigCalendar {...props} localizer={djLocalizer} />
}
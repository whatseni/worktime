import { Helmet } from "react-helmet-async";
import EmployeeCalendar from "../components/EmployeeCalendar";

export default function Calendar() {
  return (
    <>
      <Helmet>
        <title>월별 근무 시간표 | 관리자용</title>
      </Helmet>
      <EmployeeCalendar/>
    </>
  )
}
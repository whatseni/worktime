import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid'
import { Box } from "@mui/material";

export default function EmployeeCalendar() {
  return (
    <Box sx={{ p: 2 }}>
      <FullCalendar initialView="dayGridMonth" plugins={[dayGridPlugin]} locale="ko"/>
    </Box>
  )
}
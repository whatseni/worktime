import { useMemo } from "react";
import Calendar from "./Calendar";
import { Views } from "react-big-calendar";
import { Box } from "@mui/material";

export default function CalendarComponent() {
  const { defaultDate, views } = useMemo(() => ({
    defaultDate: new Date(2025, 1, 15),
    views: [Views.MONTH]
  }), [])
  return (
    <Box sx={{
      height: "80vh",
      width: "90vw"
    }} >
      <Calendar defaultDate={defaultDate} views={views} />
    </Box>
  )
}
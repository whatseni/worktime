import { Helmet } from "react-helmet-async";
import EmployeeCalendar from "../components/EmployeeCalendar";
import { Box, Container, Typography } from "@mui/material";

export default function Calendar() {
  return (
    <>
      <Helmet>
        <title>월별 근무 시간표 | 관리자용</title>
      </Helmet>
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">월별 근로 시간표</Typography>
        </Box>
        <EmployeeCalendar />
      </Container>
    </>
  )
}
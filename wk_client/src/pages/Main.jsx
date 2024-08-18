import { Typography, Box } from "@mui/material";
import CommonLayout from "../components/CommonLayout";
import Calendar from "../components/Calendar";

export default function Main() {
  return (
    <CommonLayout>
      <Box display="flex" flexDirection="row" justifyContent="space-between" width="100%" marginBottom="1em">
        <Typography variant="4">회사</Typography>
        <Typography variant="4">홍길동</Typography>
      </Box>
      <Calendar />
    </CommonLayout>
  )
}
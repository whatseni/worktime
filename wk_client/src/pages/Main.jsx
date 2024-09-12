import { Typography, Box } from "@mui/material";
import CommonLayout from "../components/CommonLayout";
import Calendar from "../components/Calendar";
import { useEffect } from "react";

export default function Main() {

  useEffect(() => {
    // TODO :: 유저 정보 가져오기
    // TODO :: 유저 근무 정보 가져오기
  })
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
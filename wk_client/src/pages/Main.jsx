import { Typography, Box } from "@mui/material";
import CommonLayout from "../components/CommonLayout";
import Calendar from "../components/Calendar";
import { useSelector } from "react-redux";


export default function Main() {
  const { currentUser, company } = useSelector((state) => state.user);
  return (
    <CommonLayout>
      <Box display="flex" flexDirection="row" justifyContent="space-between" width="100%" marginBottom="1em">
        <Typography variant="4">{company ? company : "찾을 수 없음"}</Typography>
        <Typography variant="4">{currentUser ? currentUser : "찾을 수 없음"}</Typography>
      </Box>
      <Calendar />
    </CommonLayout>
  )
}
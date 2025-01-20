import { Box, Typography } from "@mui/material";
import CommonLayout from "../components/CommonLayout";
import CalendarComponent from "../components/CalendarComponent";
import ScheduleRegister from "../components/ScheduleRegister";
import { useContext } from "react";
import { CurrentUserContext } from "../context/userContext";

export default function MainPage() {
  const { currentUser, currentCompany } = useContext(CurrentUserContext);

  return (
    <CommonLayout>
      <Box display="flex" flexDirection="row" justifyContent="space-between" width="100%" marginBottom="1em">
        <Typography variant="h6">{currentUser ? currentUser : "Not Found"}</Typography>
        <Typography variant="h5">{currentCompany ? currentCompany : "Not Found"}</Typography>
      </Box>
      <ScheduleRegister />
      <CalendarComponent />
    </CommonLayout>
  )
}
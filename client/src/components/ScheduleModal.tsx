import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useContext, useState } from "react";
import { AdapterDayjs } from './../../node_modules/@mui/x-date-pickers/AdapterDayjs/AdapterDayjs';
import { CurrentUserContext } from "../context/userContext";
import { handleDeleteSchedule, handleUpdateSchedule } from "../utils/api";
import dayjs, { Dayjs } from "dayjs";

export default function ScheduleModal() {
  const [open, setOpen] = useState<boolean>(false);
  const [start, setStart] = useState<Dayjs | null>((dayjs('2022-04-17T15:30')));
  const [end, setEnd] = useState<Dayjs | null>((dayjs('2022-04-18T15:30')));
  const { currentUser, currentPhone, currentCompany } = useContext(CurrentUserContext)
  const onClickUpdateButton = () => {
    const result = handleUpdateSchedule({
      user: currentUser,
      phone: currentPhone,
      company: currentCompany,
      date: "",
      start: "",
      end: ""
    });
  }
  const onClickDeleteButton = () => {
    const result = handleDeleteSchedule({
      user: currentUser,
      phone: currentPhone,
      company: currentCompany,
      date: "",
    });
  }
  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>시간 확인</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker label="click start date" value={start} onChange={(newValue) => setStart(newValue)} />
            <DateTimePicker label="click end date" value={end} onChange={(newValue) => setStart(newValue)} />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClickDeleteButton} variant="outlined">삭제하기</Button>
          <Button onClick={onClickUpdateButton} variant="contained">수정하기</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
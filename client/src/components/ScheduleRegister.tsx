import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useContext, useState } from "react";
import { AdapterDayjs } from './../../node_modules/@mui/x-date-pickers/AdapterDayjs/AdapterDayjs';
import { handleRegisterSchedule } from "../utils/api";
import { CurrentUserContext } from "../context/userContext";
import dayjs, { Dayjs } from "dayjs";
import { toast } from "react-toastify";

export default function ScheduleRegister() {
  const [open, setOpen] = useState<boolean>(false);
  const [start, setStart] = useState<Dayjs | null>(null);
  const [end, setEnd] = useState<Dayjs | null>(null);
  const { currentUser, currentPhone, currentCompany } = useContext(CurrentUserContext);
  const onClickRegisterButton = () => {
    const result = handleRegisterSchedule(
      { user: currentUser, phone: currentPhone, company: currentCompany, date: "", start: start, end: end }
    )
    if (!result) {
      toast.success("등록 성공")
    }
  }
  return (
    <>
      <Button onClick={() => setOpen(true)}>등록</Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>등록</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker label="click start date" onChange={(newValue) => setStart(newValue)} />
            <DateTimePicker label="click end date" onChange={(newValue) => setEnd(newValue)} />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} variant="outlined">취소하기</Button>
          <Button onClick={onClickRegisterButton} variant="contained">등록하기</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
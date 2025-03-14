import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useContext, useState } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs/AdapterDayjs';
import dayjs, { Dayjs } from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { toast } from "react-toastify";
import { handleRegisterSchedule } from "../../utils/api";
import { CurrentAdminContext } from "../context/adminContext";
import SelectUserInput from "./SelectUserInput";
import { ReturnCode } from "../../types/ReturnCode";
import { SelectUserType } from "../../types/apiPayload";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function ScheduleRegister() {
  const [open, setOpen] = useState<boolean>(false);
  const [start, setStart] = useState<Dayjs | null>(null);
  const [end, setEnd] = useState<Dayjs | null>(null);

  const [selectUser, setSelectUser] = useState<SelectUserType | null>(null);

  const { currentCompany } = useContext(CurrentAdminContext);
 
  const onClickRegisterButton = async () => {
    if (!start || !end) {
      toast.error("시작 날짜와 종료 날짜를 선택하세요.");
      return;
    }

    if (end.isBefore(start)) {
      toast.error("종료 시간은 시작 시간보다 늦어야 합니다.");
      return;
    }

    try {
      const response = await handleRegisterSchedule({
        userName: selectUser?.userName,
        userPhone: selectUser?.userPhone,
        userCompany: "PB",
        date: start.utc().format("YYYY-MM-DD"), // UTC 기준 날짜
        start: start.utc().format("HH:mm"),    // UTC 기준 시간
        end: end.utc().format("HH:mm"),
      });

      if (response === ReturnCode.SUCCESS) {
        toast.success("등록 성공");
      } else {
        toast.error("등록 실패");
      }
    } catch (error) {
      toast.error("등록 중 오류가 발생했습니다.");
    }
    setOpen(false);
  };
  return (
    <>
      <Box display="flex" justifyContent="flex-end" width="100%" margin="20px 0" paddingRight="20px">
        <Button onClick={() => setOpen(true)} variant="contained">근무 시간 등록</Button>
      </Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>등록</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", flexWrap: "wrap", gap: "20px"}}>
          <SelectUserInput setSelectUser={setSelectUser}/>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker label="시작 시간" onChange={(newValue) => setStart(newValue ? newValue.tz("Asia/Seoul") : null)} />
            <DateTimePicker label="종료 시간" onChange={(newValue) => setEnd(newValue ? newValue.tz("Asia/Seoul") : null)} />
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
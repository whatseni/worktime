import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { SetStateAction, useContext, useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { toast } from "react-toastify";
import { CurrentAdminContext } from "../context/adminContext";
import { handleDeleteSchedule, handleUpdateSchedule } from "../../utils/api";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs/AdapterDayjs";

dayjs.extend(utc);
dayjs.extend(timezone);

interface ScheduleModalProps {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  defaultStart: Date | undefined;
  defaultEnd: Date | undefined;
  selectEventId: string | undefined;
}
export default function ScheduleModal({open, setOpen, defaultStart, defaultEnd, selectEventId}: ScheduleModalProps) {
  const [start, setStart] = useState<Dayjs | null>(null);
  const [end, setEnd] = useState<Dayjs | null>(null);
  const { currentCompany } = useContext(CurrentAdminContext)

  useEffect(() => {
    setStart(defaultStart ? dayjs(defaultStart).tz("Asia/Seoul") : null);
    setEnd(defaultEnd ? dayjs(defaultEnd).tz("Asia/Seoul") : null);
  }, [defaultStart, defaultEnd]);

  
  const onClickUpdateButton = async () => {
    try {
      const result = await handleUpdateSchedule({
        id: selectEventId,
        date: start?.utc().format("YYYY-MM-DD"), // UTC 기준 날짜
        start: start?.utc().format("HH:mm"),    // UTC 기준 시간
        end: end?.utc().format("HH:mm"),
      });
      if (result) {
        toast.success("수정 성공");
      } else {
        toast.error("수정 실패");
      }
      
    } catch (error) {
      console.error("Failed to update schedule:", error);
    }
    setOpen(false);
  }
  const onClickDeleteButton = async () => {
    try {
      const result = await handleDeleteSchedule({
        id: selectEventId
      });
      if (result) {
        toast.success("삭제 성공");
      } else {
        toast.error("삭제 실패");
      }
      
    } catch (error) {
      console.error("Failed to delete schedule:", error);
    }
    setOpen(false);
  }

  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>시간 확인</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", flexWrap: "wrap", gap: "20px"}}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker label="시작 시간" value={start} onChange={(newValue) => setStart(newValue ? newValue.tz("Asia/Seoul") : null)} />
            <DateTimePicker label="종료 시간" value={end} onChange={(newValue) => setEnd(newValue ? newValue.tz("Asia/Seoul") : null)} />
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
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useState } from "react";
import { AdapterDayjs } from './../../node_modules/@mui/x-date-pickers/AdapterDayjs/AdapterDayjs';

export default function ScheduleRegister() {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>등록</Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>등록</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker label="click start date" />
          </LocalizationProvider>
          <div>heeloo</div>
        </DialogContent>
      </Dialog>
    </>
  )
}
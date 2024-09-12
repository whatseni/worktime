import { Box, Button, FormControl, MenuItem, Modal, Select, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 5,
  p: 4,
  width: '75%'
};

const generateMenuItems = (start, end) => {
  const items = [];
  for (let i = start; i <= end; i++) {
    const value = i.toString().padStart(2, '0'); // 2자리 문자열로 변환
    items.push(
      <MenuItem key={value} value={value}>
        {value}
      </MenuItem>
    );
  }
  return items;
};

const TimeSelect = ({ defaultValue, start, end }) => (
  <FormControl sx={{ m: 1 }}>
    <Select defaultValue={defaultValue}>
      {generateMenuItems(start, end)}
    </Select>
  </FormControl>
);

export default function ScheduleRegister({ open, setOpenModal, date }) {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const handleClose = () => setOpenModal(false);

  const handleRegisterSchedule = () => {
    setOpenModal(false);
  }

  useEffect(() => {

  })
  return (

    <Modal open={open} onClose={handleClose}>
      <Box sx={style} display="flex" flexDirection="column">
        <Typography variant="h6" gutterBottom>근무 시간 등록</Typography>
        <Box display="flex">
          <Typography sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>날짜</Typography>
          <TextField defaultValue={date} sx={{ m: 1 }} />
        </Box>
        <Box display="flex">
          <Typography sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>출근</Typography>
          <TimeSelect defaultValue="00" start={0} end={24} />
          <Typography sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>:</Typography>
          <TimeSelect defaultValue="00" start={0} end={59} />
        </Box>
        <Box display="flex">
          <Typography sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>퇴근</Typography>
          <TimeSelect defaultValue="00" start={0} end={24} />
          <Typography sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>:</Typography>
          <TimeSelect defaultValue="00" start={0} end={59} />
        </Box>
        <Button variant="contained" color="primary" sx={{ marginTop: "20px" }} onClick={handleRegisterSchedule}>등록하기</Button>
      </Box>
    </Modal>


  )
}
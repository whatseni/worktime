import { Box, Button, FormControl, MenuItem, Modal, Select, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

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

export default function ScheduleRegister({ open, setOpenModal, date }) {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const handleClose = () => setOpenModal(false);
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
          <FormControl sx={{ m: 1 }}>
            <Select defaultValue="00">
              <MenuItem value="00">00</MenuItem>
              <MenuItem value="01">01</MenuItem>
            </Select>
          </FormControl>
          <Typography sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>:</Typography>
          <FormControl sx={{ m: 1 }}>
            <Select defaultValue="00">
              <MenuItem value="00">00</MenuItem>
              <MenuItem value="01">01</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box display="flex">
          <Typography sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>퇴근</Typography>
          <FormControl sx={{ m: 1 }}>
            <Select defaultValue="00">
              <MenuItem value="00">00</MenuItem>
              <MenuItem value="01">01</MenuItem>
            </Select>
          </FormControl>
          <Typography sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>:</Typography>
          <FormControl sx={{ m: 1 }}>
            <Select defaultValue="00">
              <MenuItem value="00">00</MenuItem>
              <MenuItem value="01">01</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Button variant="contained" color="primary" sx={{ marginTop: "20px" }}>등록하기</Button>
      </Box>
    </Modal>


  )
}
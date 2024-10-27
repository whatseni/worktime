import { Box, Button, FormControl, MenuItem, Modal, Select, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

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




export default function ScheduleRegister({ open, setOpenModal, selectedDate, existedEvent }) {
  const [startTime, setStartTime] = useState(["00", "00"]);
  const [endTime, setEndTime] = useState(["00", "00"]);
  const handleClose = () => setOpenModal(false);

  const { currentUser, currentPhone, currentCompany } = useSelector((state) => state.user);

  const handleRequestSchedule = async () => {
    setOpenModal(false);
    try {
      const response = await axios.post("http://localhost:5000/time/update-worktime", {
        employeeName: currentUser,
        employeePhone: currentPhone,
        company: currentCompany,
        workDate: selectedDate,
        startTime: startTime,
        endTime: endTime
      })
      if (response.data.code === RetureCode.SUCCESS) {
        window.alert("근무 성공")
      } else {
        throw new Error('응답 실패. 다시 시도해주세요.')
      }
    } catch (error) {
      console.error(error);
      window.alert('근무 시간 가져오기 실패. 다시 시도해주세요.')
    }
  }

  const handleTimeSelect = (event, diff) => {
    console.log(event.target.value, diff)
    let temp = event.target.value
    if (diff === "start-hour") setStartTime([temp, startTime[1]]);
    else if (diff === "start-min") setStartTime([startTime[0], temp]);
    else if (diff === "end-hour") setEndTime([temp, endTime[1]]);
    else if (diff === "end-min") setEndTime([endTime[0], temp]);
  }

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

  const TimeSelect = ({ defaultValue, start, end, diff }) => (
    <FormControl sx={{ m: 1 }}>
      <Select defaultValue={defaultValue} onChange={(event) => handleTimeSelect(event, diff)}>
        {generateMenuItems(start, end)}
      </Select>
    </FormControl>
  );

  useEffect(() => {
    console.log(existedEvent)
    if (existedEvent) {
      setStartTime(existedEvent.startTime.split(':'))
      setEndTime(existedEvent.endTime.split(':'))
    } else {
      setStartTime(["00", "00"]);
      setEndTime(["00", "00"]);
    }
  }, [])
  return (

    <Modal open={open} onClose={handleClose}>
      <Box sx={style} display="flex" flexDirection="column">
        <Typography variant="h6" gutterBottom>근무 시간 등록</Typography>
        <Box display="flex">
          <Typography sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>날짜</Typography>
          <TextField defaultValue={selectedDate} sx={{ m: 1 }} disabled />
        </Box>
        <Box display="flex">
          <Typography sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>출근</Typography>
          <TimeSelect defaultValue={startTime[0]} start={0} end={24} diff="start-hour" />
          <Typography sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>:</Typography>
          <TimeSelect defaultValue={startTime[1]} start={0} end={59} diff="start-min" />
        </Box>
        <Box display="flex">
          <Typography sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>퇴근</Typography>
          <TimeSelect defaultValue={endTime[0]} start={0} end={24} diff="end-hour" />
          <Typography sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>:</Typography>
          <TimeSelect defaultValue={endTime[1]} start={0} end={59} diff="end-min" />
        </Box>
        <Button variant="contained" color="primary" sx={{ marginTop: "20px" }} onClick={handleRequestSchedule}>{existedEvent ? "수정하기" : "등록하기"}</Button>
      </Box>
    </Modal>


  )
}
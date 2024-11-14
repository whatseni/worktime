import { Box, Button, FormControl, MenuItem, Modal, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { RetureCode } from '../utils';

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

  const handleUpdateSchedule = async () => {
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
        toast.success("근무 등록/수정 성공!");
        setStartTime(["00", "00"]);
        setEndTime(["00", "00"]);
      } else {
        throw new Error('응답 실패. 다시 시도해주세요.');
      }
    } catch (error) {
      toast.error("근무 등록/수정 실패. 다시 확인해주세요.");
      console.error(error);
    } finally {
      setOpenModal(false);
    }
  }

  const handleDeleteSchedule = async () => {
    try {
      const response = await axios.post("http://localhost:5000/time/delete-worktime", {
        employeeName: currentUser,
        employeePhone: currentPhone,
        company: currentCompany,
        workDate: selectedDate,
      })
      if (response.data.code === RetureCode.SUCCESS) {
        toast.success('근무 삭제 성공!');
        setStartTime(["00", "00"]);
        setEndTime(["00", "00"]);
      }
    } catch (error) {
      toast.error("근무 삭제 실패. 다시 확인해주세요.");
      console.error(error)
    } finally {
      setOpenModal(false);
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

  const TimeSelect = ({ defaultValue, value, start, end, diff }) => (
    <FormControl sx={{ m: 1 }}>
      <Select defaultValue={defaultValue} value={value} onChange={(event) => handleTimeSelect(event, diff)}>
        {generateMenuItems(start, end)}
      </Select>
    </FormControl>
  );

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
          <TimeSelect defaultValue={existedEvent ? existedEvent.startTime.split(':')[0] : "00"} value={startTime[0]} start={0} end={24} diff="start-hour" />
          <Typography sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>:</Typography>
          <TimeSelect defaultValue={existedEvent ? existedEvent.startTime.split(':')[1] : "00"} value={startTime[1]} start={0} end={59} diff="start-min" />
        </Box>
        <Box display="flex">
          <Typography sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>퇴근</Typography>
          <TimeSelect defaultValue={existedEvent ? existedEvent.endTime.split(':')[0] : "00"} value={endTime[0]} start={0} end={24} diff="end-hour" />
          <Typography sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>:</Typography>
          <TimeSelect defaultValue={existedEvent ? existedEvent.endTime.split(':')[1] : "00"} value={endTime[1]} start={0} end={59} diff="end-min" />
        </Box>
        <Button variant="contained" color="primary" sx={{ marginTop: "20px" }} onClick={handleUpdateSchedule}>{existedEvent ? "수정하기" : "등록하기"}</Button>
        {existedEvent && <Button variant="outlined" color="error" sx={{ marginTop: "20px" }} onClick={handleDeleteSchedule}>삭제하기</Button>}
      </Box>
    </Modal>
  )
}
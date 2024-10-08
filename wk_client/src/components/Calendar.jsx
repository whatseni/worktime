import React, { useEffect, useState } from 'react';
import ScheduleRegister from './ScheduleRegister';
import { Calendar as MyCalendar } from 'my_calendar';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';

const formatDate = (input) => {
  const date = new Date(input);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
  const day = String(date.getDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}
export default function Calendar() {
  const today = new Date()

  const [openModal, setOpenModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [hasTimeDate, setHasTimeDate] = useState(false);
  const [existedTimeData, setExistedTimeData] = useState(null);
  const [monthEvents, setMonthEvents] = useState(null);

  const [currentMonth, setCurrentMonth] = useState(today.getMonth() + 1);
  const [monthTotalTime, setMonthTotalTime] = useState(0);
  const { currentUser, currentPhone } = useSelector((state) => state.user);

  const onDateClick = async (date) => {
    const response = await axios.post('http://localhost:5000/time/get-user-time-date', {
      employeeName: currentUser,
      employeePhone: currentPhone,
      date: date // '2024-09-12' 현재는 '2024-9-2' 이런식
    })
    if (response.data.code === "1") {
      if (response.data.isWorked) {
        setHasTimeDate(true)
        setExistedTimeData({ startTime: response.data.startTime, endTime: response.data.endTime })
      } else {
        setHasTimeDate(false)
        setExistedTimeData(null)
      }
    }
    onOpenScheduleModal(date);
  }

  const onEventClick = (event) => {

  }

  const onMonthEvent = (year, month) => {
    setCurrentMonth(month + 1);
  }

  const onOpenScheduleModal = (selected) => {
    setSelectedDate(selected)
    setOpenModal(true);
  }

  // TODO :: 년도도 측정하기
  const handleEmployeeWork = async (month) => {
    try {
      const response = await axios.post("http://localhost:5000/time/get-user-time-month", {
        employeeName: currentUser,
        employeePhone: currentPhone,
        selectMonth: month
      })
      if (response.data.code === '1') {
        setMonthEvents(response.data.data)
      } else {
        throw new Error('응답 실패. 다시 시도해주세요.')
      }
    } catch (error) {
      console.error(error);
      window.alert('근무 시간 가져오기 실패. 다시 시도해주세요.')
    }
  }

  const handleGetAllTimeByMonth = async (month) => {
    try {
      const response = await axios.post("http://localhost:5000/time/get-user-alltime-month", {
        employeeName: currentUser,
        employeePhone: currentPhone,
        selectMonth: month
      })
      if (response.data.code === 1) {
        setMonthTotalTime(response.data.data.allTime);
      } else {
        throw new Error('응답 실패. 다시 시도해주세요.')
      }
    } catch (error) {
      console.error(error);
      window.alert('근무 시간 가져오기 실패. 다시 시도해주세요.')
    }
  }

  useEffect(() => {
    handleEmployeeWork(currentMonth);
    handleGetAllTimeByMonth(currentMonth)
  }, [currentMonth])

  return (
    <>
      <MyCalendar onMonthEvent={onMonthEvent} events={monthEvents} onDateClick={onDateClick} onEventClick={onEventClick} />
      <ScheduleRegister open={openModal} setOpenModal={setOpenModal} date={selectedDate} hasTimeDate={hasTimeDate} timeData={existedTimeData} />
      <Typography>{currentMonth}월 총 근무 시간 : {monthTotalTime}</Typography>
    </>
  );
}
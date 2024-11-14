import React, { useEffect, useState } from 'react';
import ScheduleRegister from './ScheduleRegister';
import { Calendar as MyCalendar } from 'my_calendar';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import { formatRequest, RetureCode } from '../utils';

export default function Calendar() {
  const today = new Date();

  const [openModal, setOpenModal] = useState(false); // 스케줄 등록 모달 오픈 여부
  const [selectedDate, setSelectedDate] = useState(null); // 스케줄 등록 모달 선택 날짜
  const [existedEvent, setExistedEvent] = useState(null); // 해당 날짜 모달 오픈 시 이미 이벤트가 있다면
  const [monthEvents, setMonthEvents] = useState(null); // 각 월에 있는 이벤트들 목록

  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth() + 1);
  const [monthTotalTime, setMonthTotalTime] = useState(0); // 월별 총 근로 시간

  const { currentUser, currentPhone } = useSelector((state) => state.user);

  // 날짜 클릭
  const onClickDate = async (clickDate) => {
    // 만약 날짜만 클릭한다면 이벤트가 없어진채로 모달이 열려야 하므로 null 처리
    setExistedEvent(null);
    onOpenScheduleModal(clickDate);
  }

  // 날짜 내 이벤트 클릭
  const onClickEvent = async (clickevent, event) => {
    clickevent.stopPropagation();
    setExistedEvent({ startTime: event.startTime, endTime: event.endTime })
    onOpenScheduleModal(event.date);
  }

  // 월 변경
  const onChangeMonth = (year, month) => {
    setCurrentYear(year);
    setCurrentMonth(month + 1);
  }

  const onOpenScheduleModal = (clickDate) => {
    setSelectedDate(clickDate);
    setOpenModal(true);
  }


  // 한달 근로 이벤트들 목록 요청
  const handleGetEventsByMonth = async (year, month) => {
    try {
      const response = await axios.post("http://localhost:5000/time/get-user-time-month", {
        employeeName: currentUser,
        employeePhone: currentPhone,
        date: formatRequest(year, month)
      })
      if (response.data.code === RetureCode.SUCCESS) {
        setMonthEvents(response.data.data)
      } else {
        throw new Error('응답 실패. 다시 시도해주세요.')
      }
    } catch (error) {
      console.error(error);
      window.alert('근무 시간 가져오기 실패. 다시 시도해주세요.')
    }
  }

  // 한달 총 근로시간 요청
  const handleGetAllTimeByMonth = async (year, month) => {
    try {
      const response = await axios.post("http://localhost:5000/time/get-user-alltime-month", {
        employeeName: currentUser,
        employeePhone: currentPhone,
        date: formatRequest(year, month)
      })
      if (response.data.code === RetureCode.SUCCESS) {
        setMonthTotalTime(response.data.data.allTime);
      } else {
        throw new Error('응답 실패. 다시 시도해주세요.')
      }
    } catch (error) {
      console.error(error);
      window.alert('근무 시간 가져오기 실패. 다시 시도해주세요.')
    }
  }

  // 월이 변경이 되면 자동으로 년도도 변하니 deps는 month만 적용.
  useEffect(() => {
    handleGetEventsByMonth(currentYear, currentMonth);
    handleGetAllTimeByMonth(currentYear, currentMonth);
  }, [currentMonth, currentYear, openModal])

  return (
    <>
      <MyCalendar onChangeMonth={onChangeMonth} events={monthEvents} onClickDate={onClickDate} onClickEvent={onClickEvent} />
      <ScheduleRegister open={openModal} setOpenModal={setOpenModal} selectedDate={selectedDate} existedEvent={existedEvent} />
      <Typography>{currentMonth}월 총 근무 시간 : {parseInt(monthTotalTime / 60)}시간 {monthTotalTime % 60}분</Typography>
    </>
  );
}
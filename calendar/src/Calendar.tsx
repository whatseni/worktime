import React, { useState, JSX, useCallback } from "react";
import styled from "styled-components";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { CalendarPropsType } from "./types";
import { Event } from "./types";

const MONTH = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
const DAY = ['일', '월', '화', '수', '목', '금', '토'];

/**
 * 최상위 파일 UI 브라우저 컴포넌트
 *
 * @example 
 * ```typescript
 * <Calendar />
 * ```
 */
export default function Calendar({ onDateClick, events, onMonthEvent, onEventClick }: CalendarPropsType) {
  const today = new Date();
  const [selectedYear, setSelectedYear] = useState<number>(today.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<number>(today.getDate());

  const getEventForDate = useCallback((date: string) => {
    return events ? events.filter((event: Event) => event.date === date) : null;
  }, [events]);

  const prevMonth = useCallback(() => {
    let month = 0;
    let year = 0;
    setSelectedMonth((prev: number) => {
      month = prev === 0 ? 11 : prev - 1;
      return month;
    });
    setSelectedYear((prev: number) => {
      year = selectedMonth === 0 ? prev - 1 : prev;
      return year;
    });
    onMonthEvent(year, month);
  }, [onMonthEvent, selectedMonth]);

  const nextMonth = useCallback(() => {
    let month = 0;
    let year = 0;
    setSelectedMonth((prev: number) => {
      month = prev === 11 ? 0 : prev + 1;
      return month;
    });
    setSelectedYear((prev: number) => {
      year = selectedMonth === 11 ? prev + 1 : prev;
      return year;
    });
    onMonthEvent(year, month);
  }, [onMonthEvent, selectedMonth]);

  const getDateCountInMonth = (year: number, month: number) => {
    const date = new Date(year, month + 1, 0);
    return Array.from({ length: date.getDate() }, (_, i) => i + 1);
  };

  const firstDayMonth = (year: number, month: number) => {
    const date = new Date(year, month, 1);
    return date.getDay();
  };

  const datesInMonth = getDateCountInMonth(selectedYear, selectedMonth);
  const firstInMonth = firstDayMonth(selectedYear, selectedMonth);

  const returnDate = () => {
    const weeks = [];
    let dates: JSX.Element[] = [];

    for (let i = 0; i < firstInMonth; i++) {
      dates.push(<DateEmpty key={`empty-${i}`} />);
    }

    datesInMonth.forEach((date, idx) => {
      const isToday = today.getFullYear() === selectedYear &&
        today.getMonth() === selectedMonth &&
        today.getDate() === date;
      const event = getEventForDate(`${selectedYear}-${selectedMonth}-${date}`);

      dates.push(
        <DateBox key={date} isToday={isToday} data-date={date}
          onClick={() => onDateClick(`${selectedYear}-${selectedMonth}-${date}`)}>
          {event && (
            <ScheduleList>
              {event.map((e: Event, index: number) => (
                <li key={index} onClick={() => onEventClick(e)}>{e.title}</li>
              ))}
            </ScheduleList>
          )}
        </DateBox>
      );

      if ((idx + firstInMonth + 1) % 7 === 0) {
        weeks.push([...dates]);
        dates = [];
      }
    });

    if (dates.length > 0) {
      weeks.push([...dates]);
    }
    return weeks;
  };

  return (
    <CalendarContainer>
      <CalendarHeader>
        <button onClick={prevMonth}><IoIosArrowBack /></button>
        <span>{selectedYear}년 {MONTH[selectedMonth]}</span>
        <button onClick={nextMonth}><IoIosArrowForward /></button>
      </CalendarHeader>
      <DayContainer>
        {DAY.map((day) => (
          <DayBox key={day}>{day}</DayBox>
        ))}
      </DayContainer>
      <DateContainer>
        {returnDate().map((week, idx) => (
          <WeekBox key={`week-${idx}`}>{week}</WeekBox>
        ))}
      </DateContainer>
    </CalendarContainer>
  );
}

// Styled Components
const CalendarContainer = styled.div`
  width: 100%;
  max-width: 100%;
  margin: 20px auto;
  font-family: Arial, sans-serif;
  text-align: center;
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    &:hover {
      background-color: #0056b3;
    }
  }

  span {
    font-size: 16px;
    font-weight: bold;
  }
`;

const DayContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 10px;
`;

const DayBox = styled.div`
  font-weight: bold;
  padding: 10px;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
`;

const DateContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: minmax(80px, auto);
`;

const DateBox = styled.div<{ isToday: boolean }>`
  position: relative;
  border: 1px solid #ddd;
  cursor: pointer;
  min-height: 100%;
  transition: background-color 0.3s, color 0.3s;
  background-color: ${({ isToday }) => (isToday ? '#f0f0f0' : 'transparent')};

  &::before {
    content: attr(data-date);
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: 14px;
    font-weight: bold;
  }

  &:hover {
    background-color: #007bff;
    color: rgba(50, 66, 95, 0.986);
  }
`;

const DateEmpty = styled.div`
  border: 1px solid transparent;
`;

const WeekBox = styled.div`
  display: contents;
`;

const ScheduleList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 25px 5px 0;
  font-size: 12px;
  text-align: left;

  li {
    background-color: #e7f3ff;
    margin-bottom: 3px;
    padding: 2px 5px;
    border-radius: 3px;
    font-size: 1.2em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover {
      background-color: #cce1ff;
      transform: translateY(-2px);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
  }
`;

// Add any necessary responsive styles with media queries using styled-components' `@media` feature as needed.

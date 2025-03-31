"use client"

import { useEffect, useState } from "react";
import Input from "./common/Input"

const DAY = ["일", "월", "화", "수", "목", "금", "토"]

const getStartOfWeek = (date: Date) => {
  const dayOfWeek = date.getDay();
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - dayOfWeek);
  return startOfWeek;
}

export default function WeekList() {
  const today = new Date();
  const [weekStart, setWeekStart] = useState(getStartOfWeek(today));

  const handleSave = () => {

  }

  // 함수: 이전 주로 이동
  const handlePrevWeek = () => {
    const prevWeekStart = new Date(weekStart);
    prevWeekStart.setDate(weekStart.getDate() - 7);
    setWeekStart(prevWeekStart);
  };

  // 함수: 다음 주로 이동
  const handleNextWeek = () => {
    const nextWeekStart = new Date(weekStart);
    nextWeekStart.setDate(weekStart.getDate() + 7);
    setWeekStart(nextWeekStart);
  };

  // 주의 요일을 표시하는 JSX 생성
  const renderItems = () => {
    const items = [];
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(weekStart);
      currentDate.setDate(weekStart.getDate() + i);
      const dayOfWeek = DAY[currentDate.getDay()];
      const dateString = `${currentDate.getDate()}일`;

      items.push(
        <li key={i} className="flex items-center gap-2 border-gray-200 px-3 py-2.5 text-sm w-[90%]">
          <span className={`${(today.getMonth() === currentDate.getMonth() && today.getDate() === currentDate.getDate()) ? "text-indigo-700" : "text-gray-500"}`}>{dayOfWeek}({dateString})</span>
          <Input type="time" />
          <Input type="time" />
        </li>
      );
    }
    return items;
  };
  useEffect(() => {
    const fetchData = async () => {

    }

    // fetchData();
  }, [])

  return (
    <div>
      <div className="fc-button-group flex m-5 items-center justify-center">
        <button className="fc-prev-button fc-button fc-button-primary" onClick={handlePrevWeek}>
          <span className="fc-icon fc-icon-chevron-left" role="img"></span>
        </button>
        <span className="text-gray-800 text-lg flex items-center">{weekStart.getMonth() + 1}월</span>
        <button className="fc-next-button fc-button fc-button-primary" onClick={handleNextWeek}>
          <span className="fc-icon fc-icon-chevron-right" role="img"></span>
        </button>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white sm:w-fit">
        <ul className="flex flex-col items-center">
          {renderItems()}
        </ul>

        <div className="flex justify-end m-6">
          <button
            type="button"
            onClick={handleSave}
            className="rounded-sm bg-blue-light-500 hover:bg-blue-light-600 w-[5em] px-4 py-2.5 text-sm font-medium text-white sm:w-auto"
          >저장</button>
        </div>
      </div>
    </div>
  )
}
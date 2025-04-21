"use client"

import { useEffect, useState } from "react";
import Input from "./common/Input"
import axios from "axios";
import { useSession } from "../context/LoginContext";
import { toast } from "react-toastify";

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
  const [start, setStart] = useState(Array(7).fill(""));
  const [end, setEnd] = useState(Array(7).fill(""));

  const { getId, getCompany } = useSession();

  const handleSave = async () => {
    let request_data = [];
    for(let i = 0; i < 7; i++) {
      const currentDate = new Date(weekStart);
      currentDate.setDate(weekStart.getDate() + i);
      const date = `${currentDate.getFullYear()}-${(currentDate.getMonth()+1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`
      request_data.push({
        date: date,
        start: start[i],
        end: end[i],
      })
    }

    const response = await axios.post(`${process.env.NEXT_PUBLIC_DEV_URL}/api/time`, {
      id: getId(),
      company: getCompany(),
      data: request_data
    })

    if (response.data.code === 200) {
      toast.success("등록 성공.")
    } else {
      toast.error("등록 실패. 다시 확인 바람.")
    }
  }

  // 함수: 이전 주로 이동
  const handlePrevWeek = () => {
    const prevWeekStart = new Date(weekStart);
    prevWeekStart.setDate(weekStart.getDate() - 7);
    setWeekStart(prevWeekStart);
    setStart(Array(7).fill(""));
    setEnd(Array(7).fill(""));
  };

  // 함수: 다음 주로 이동
  const handleNextWeek = () => {
    const nextWeekStart = new Date(weekStart);
    nextWeekStart.setDate(weekStart.getDate() + 7);
    setWeekStart(nextWeekStart);
    setStart(Array(7).fill(""));
    setEnd(Array(7).fill(""));
  };

  const handleStartTimeChange = (index: number, value: string) => {
    const newTimes = [...start];
    newTimes[index] = value;
    console.log(newTimes);
    setStart(newTimes)
  }

  const handleEndTimeChange = (index: number, value: string) => {
    const newTimes = [...end];
    newTimes[index] = value;
    console.log(newTimes);
    setEnd(newTimes)
  }

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
          <span className={`${(today.getMonth() === currentDate.getMonth() && today.getDate() === currentDate.getDate()) ? "text-indigo-700" : "text-gray-500"} grow`}>{dayOfWeek}({dateString})</span>
          <div className="grow-2">
            <Input type="time" value={start[i]}
            onChange={(e) => handleStartTimeChange(i, e.target.value)}
          /></div>
          <div className="grow-2">
            <Input type="time" value={end[i]}
            onChange={(e) => handleEndTimeChange(i, e.target.value)}
          /></div>
        </li>
      );
    }
    return items;
  };


  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_DEV_URL}/api/time/week`, {
        weekStart: weekStart,
        company: getCompany(),
        userId: getId()
      })

      if(response.data.code === 200) {
        let temp = response.data.data;
        const newTimes = [...start];
        const newTimes2 = [...end];
        for(let i = 0; i < 7; i++) {
          if (temp[i]) {
            newTimes[i] = temp[i].start;
            setStart(newTimes);
  
            newTimes2[i] = temp[i].end;
            setEnd(newTimes2);

            console.log(newTimes, newTimes2)
          }
        }
      }
    }

    fetchData();
  }, [weekStart])


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
"use client"

import { useEffect, useState } from "react";
import Pagination from "../common/Pagination";
import { Table, TableBody, TableCell, TableRow } from "../common/Table";
import PayHeader from "./PayHeader";
import axios from "axios";
import DateHeader from "./DateHeader";

export default function PayTable() {
  const [data, setData] = useState([]);

  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);

  const handlePrevMonth = () => {
    if (month === 1) {
      setYear(prev => prev - 1);
      setMonth(12);
    } else {
      setMonth(prev => prev - 1);
    }
  }

  const handleNextMonth = () => {
    if (month === 12) {
      setYear(prev => prev + 1);
      setMonth(1);
    } else {
      setMonth(prev => prev + 1);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios(`${process.env.NEXT_PUBLIC_DEV_URL}/api/pay?company=${"PB"}&year=${year}&month=${month}`)
      setData(response.data.data)
    }

    fetchData();
  }, [year, month])
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <DateHeader year={year} month={month} handlePrev={handlePrevMonth} handleNext={handleNextMonth}/>
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <Table>
            <PayHeader/>
            <TableBody className="divide-y divide-gray-100">
              {
                data.map((d: any) => (
                  <TableRow key={d.staffId}>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm">
                      {d.name}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm">
                      {d.totalTime}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm">
                      {d.isWeek ? "O" : "X"}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm">
                      {d.pay.toLocaleString()}원
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm">
                      {Math.ceil(d.payintax).toLocaleString()}원
                    </TableCell>
                  </TableRow>
                ))
              }
              <TableRow>
                <TableCell>
                  <div></div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          {/* <div className="px-6 py-4 border-t border-gray-200 dark:border-white/[0.05]">
            <Pagination 
              currentPage={0}
              totalPages={2}
              onPageChange={() => {}}
            />
          </div> */}
        </div>
      </div>
    </div>
  )
}
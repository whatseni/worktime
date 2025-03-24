"use client"

import { useEffect, useState } from "react";
import Pagination from "../common/Pagination";
import { Table, TableBody, TableCell, TableRow } from "../common/Table";
import StaffHeader from "./StaffHeader";
import axios from "axios";

export default function StaffTable() {
  const [staffList, setStaffList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios(`${process.env.NEXT_PUBLIC_DEV_URL}/api/staff?company=${"PB"}`)
      setStaffList(response.data.data);
    }

    fetchData();
  }, [])

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <Table>
            <StaffHeader/>
            <TableBody className="divide-y divide-gray-100">
              {
                staffList.map((staff: any) => (
                  <TableRow key={staff._id.toString()}>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {staff.name}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {staff.company}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {staff.phone}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {staff.birth}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {staff.bank}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {staff.bankAccount}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {staff.isWeek}
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
            
          </Table>
          <Pagination 
              currentPage={0}
              totalPages={2}
              onPageChange={() => {}}
            />
        </div>
      </div>
    </div>
  )
}
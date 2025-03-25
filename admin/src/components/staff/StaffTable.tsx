"use client"

import { useEffect, useState } from "react";
import Pagination from "../common/Pagination";
import { Table, TableBody, TableCell, TableRow } from "../common/Table";
import StaffHeader from "./StaffHeader";
import axios from "axios";
import TrashBinIcon from "../../icons/trash.svg";
import EditIcon from "../../icons/pencil.svg";
import StaffInfoModal from "./StaffInfoModal";

export default function StaffTable() {
  const [staffList, setStaffList] = useState([]);
  const [editStaff, setEditStaff] = useState();

  const [isOpen, setIsOpen] = useState(false);
  
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios(`${process.env.NEXT_PUBLIC_DEV_URL}/api/staff?company=${"PB"}`)
      setStaffList(response.data.data);
    }

    fetchData();
  }, [])

  const handleDelete = async (id: string) => {
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_DEV_URL}/api/staff?id=${id}`)
    console.log(response);
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <StaffInfoModal isOpen={isOpen} closeModal={closeModal} info={editStaff}/>
          <Table>
            <StaffHeader/>
            <TableBody className="divide-y divide-gray-100">
              {
                staffList.map((staff: any) => (
                  <TableRow key={staff._id.toString()}>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400"
                    >
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
                    <TableCell>
                      <div className="flex items-center w-full gap-2">
                        <button className="text-gray-500 hover:text-success-500" onClick={() => {
                          setEditStaff(staff)
                          openModal();
                        }}>
                          <EditIcon />
                        </button>
                        <button className="text-gray-500 hover:text-error-500" onClick={() => handleDelete(staff._id)}>
                          <TrashBinIcon />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
            
          </Table>
          <div className="px-6 py-4 border-t border-gray-200 dark:border-white/[0.05]">
            <Pagination 
              currentPage={0}
              totalPages={2}
              onPageChange={() => {}}
            />
          </div>
          
        </div>
      </div>
    </div>
  )
}
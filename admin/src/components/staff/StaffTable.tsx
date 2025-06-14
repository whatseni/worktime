"use client"

import { useEffect, useState } from "react";
import Pagination from "../common/Pagination";
import { Table, TableBody, TableCell, TableRow } from "../common/Table";
import StaffHeader from "./StaffHeader";
import axios from "axios";
import TrashBinIcon from "../../icons/trash.svg";
import EditIcon from "../../icons/pencil.svg";
import StaffInfoModal from "./StaffInfoModal";
import { BANK_LIST } from "@/lib/bankList";
import { toast } from "react-toastify";

type StaffInfo = {
  _id: string;
  name: string;
  birth: string;
  phone: string;
  bank: string;
  bankAccount: string;
  workDay: string[];
  startTime: string;
  endTime: string;
  isWeek: boolean;
}

export default function StaffTable() {
  const [staffList, setStaffList] = useState<StaffInfo[]>([]);
  const [editStaff, setEditStaff] = useState<StaffInfo | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios(`${process.env.NEXT_PUBLIC_DEV_URL}/api/staff?company=${"PB"}`)
      if (response.data.code === 200)
        setStaffList(response.data.data);
    }

    fetchData();
  }, [])

  const handleDelete = async (id: string) => {
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_DEV_URL}/api/staff?id=${id}`)
    if (response.data.code === 200) {
      toast.success("삭제 성공.")
    } else {
      toast.error("삭제 실패. 확인 바람.")
    }
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
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm"
                    >
                      {staff.name}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm">
                      {staff.company}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm">
                      {staff.phone}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm">
                      {staff.birth}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm">
                      {staff.workDay.join(',')}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm">
                      {staff.startTime}~{staff.endTime}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm">
                      {BANK_LIST.find((bank) => bank.key === staff.bank)?.value}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm">
                      {staff.bankAccount}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm">
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
        </div>
      </div>
    </div>
  )
}
"use client"

import { useEffect, useState } from "react";
import Pagination from "../common/Pagination";
import { Table, TableBody, TableCell, TableRow } from "../common/Table";
import PayHeader from "./PayHeader";
import axios from "axios";

export default function PayTable() {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios(`${process.env.NEXT_PUBLIC_DEV_URL}/api/pay?company=${"PB"}`)
      console.log(response)
    }

    fetchData();
  }, [])
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <Table>
            <PayHeader/>
            <TableBody className="divide-y divide-gray-100">
              <TableRow>
                <TableCell>
                  <div></div>
                </TableCell>
              </TableRow>
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
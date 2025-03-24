"use client"

import Pagination from "../common/Pagination";
import { Table, TableBody, TableCell, TableRow } from "../common/Table";
import PayHeader from "./PayHeader";

export default function PayTable() {
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
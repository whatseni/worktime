import { TableCell, TableHeader, TableRow } from "../common/Table";

export default function PayHeader() {
  return (
    <TableHeader className="border-b border-gray-100">
    <TableRow>
      <TableCell
        isHeader
        className="px-5 py-3 font-semibold text-gray-600 text-start text-theme-md "
      >
        이름
      </TableCell>
      <TableCell
        isHeader
        className="px-5 py-3 font-semibold text-gray-600 text-start text-theme-md "
      >
        총 근무 시간
      </TableCell>
      <TableCell
        isHeader
        className="px-5 py-3 font-semibold text-gray-600 text-start text-theme-md "
      >
        주휴 여부
      </TableCell>
      <TableCell
        isHeader
        className="px-5 py-3 font-semibold text-gray-600 text-start text-theme-md "
      >
        3.3% 전
      </TableCell>
      <TableCell
        isHeader
        className="px-5 py-3 font-semibold text-gray-600 text-start text-theme-md "
      >
        3.3% 후
      </TableCell>
    </TableRow>
  </TableHeader>
  )
}
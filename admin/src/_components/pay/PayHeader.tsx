import { TableCell, TableHeader, TableRow } from "../common/Table";

export default function PayHeader() {
  return (
    <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
    <TableRow>
      <TableCell
        isHeader
        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
      >
        이름
      </TableCell>
      <TableCell
        isHeader
        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
      >
        총 근무 시간
      </TableCell>
      <TableCell
        isHeader
        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
      >
        3.3% 전
      </TableCell>
      <TableCell
        isHeader
        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
      >
        3.3% 후
      </TableCell>
      <TableCell
        isHeader
        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
      >
        총 급여
      </TableCell>
    </TableRow>
  </TableHeader>
  )
}
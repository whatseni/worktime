import { Icon } from "@iconify/react/dist/iconify.js";

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarEmployeeConfig = [
  {
    title: '캘린더로 보기',
    path: '/dashboard/calenar'
  },
  {
    title: '테이블로 보기',
    path: '/dashboard/employee'
  }
]

export default sidebarEmployeeConfig;
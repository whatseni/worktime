import { Icon } from "@iconify/react/dist/iconify.js";

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: '월별 근무',
    path: '/dashboard/main'
  },
  {
    title: '월급 페이지',
    path: '/dashboard/money'
  },
  {
    title: '근로자 정보',
    path: '/dashboard/user'
  }
]

export default sidebarConfig;
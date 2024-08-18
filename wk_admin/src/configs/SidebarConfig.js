import { Icon } from '@iconify/react';

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;
const sidebarConfig = [
  {
    title: '월별 보기',
    path: '/calendar',
    icon: getIcon("eva:calendar-outline")
  },
  {
    title: '사용자 보기',
    path: '/users',
    icon: getIcon("eva:people-outline")
  }
]

export default sidebarConfig;
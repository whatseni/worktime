import * as React from 'react';
import { createTheme } from '@mui/material/styles';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TableChartIcon from '@mui/icons-material/TableChart';
import PersonIcon from '@mui/icons-material/Person';
import { AppProvider, type Navigation } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import CalendarComponent from '../components/CalendarComponent';
import TableComponent from '../components/TableComponents';
import UserComponent from '../components/UserComponent';

const NAVIGATION: Navigation = [
  {
    segment: 'calendar',
    title: '달력으로 보기',
    icon: <CalendarMonthIcon />,
  },
  {
    segment: 'table',
    title: '표로 보기',
    icon: <TableChartIcon />,
  },
  {
    segment: 'users',
    title: '사용자 관리',
    icon: <PersonIcon />,
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DemoPageContent({ pathname }: { pathname: string }) {
  return (
    <>
      {pathname === "/calendar" && <CalendarComponent />}
      {pathname === "/table" && <TableComponent />}
      {pathname === "/users" && <UserComponent />}
    </>
  );
}

export default function MainPage() {

  const router = useDemoRouter('/calendar');

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
    >
      <DashboardLayout disableCollapsibleSidebar>
        <DemoPageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}

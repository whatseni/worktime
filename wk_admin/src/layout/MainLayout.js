import { styled } from "@mui/material"
import { Outlet } from "react-router-dom"
import MainNavbar from './MainNavbar';
import MainSidebar from "./MainSidebar";
import { useState } from "react";

const Root = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden'
})
const Main = styled('div')({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%'
})
export default function MainLayout({ sidebarConfig }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <Root>
      <MainNavbar onOpenSidebar={() => setSidebarOpen(true)} />
      <MainSidebar sidebarConfig={sidebarConfig} sidebarOpen={sidebarOpen} onCloseSidebar={() => setSidebarOpen(false)} />
      <Main>
        <Outlet />
      </Main>
    </Root>
  )
}
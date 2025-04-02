"use client";

import AppHeader from "@/src/components/AppHeader";
import AppSidebar from "@/src/components/AppSidebar";
import ProtectedRoute from "@/src/components/ProtectedRoute";
import { useSidebar } from "@/src/context/SidebarContext";

export default function MainLayout({ children }: {
  children: React.ReactNode;
}) {
  const {isExpanded, isMobileOpen } = useSidebar();
  const mainContentMargin = isMobileOpen 
  ? "ml-0"
  : isExpanded
  ? "lg:ml-[290px]"
  : "lg:ml-[90px";
  return (
    <ProtectedRoute>
      <div className="min-h-screen xl:flex">
        <AppSidebar />
        <div className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}>
          <AppHeader/>
          <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">{children}</div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
"use client";
import React, { useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";

import CalendarIcon from "../icons/calendar.svg"
import UserCircleIcon from "../icons/user-circle.svg"
import DollarIcon from "../icons/dollar-line.svg"

type NavItem = {
  name: string;
  path?: string;
  icon: React.ReactNode;
};

const navItems: NavItem[] = [
  {
    name: "달력",
    path: "/",
    icon: <CalendarIcon />
  },
  {
    name: "급여",
    path: "/pay",
    icon: <DollarIcon />
  },
  {
    name: "근로자",
    path: "/staff",
    icon: <UserCircleIcon />
  }
];


export default function AppSidebar() {
  const { isExpanded, isMobileOpen } = useSidebar();
  const pathname = usePathname();

  const renderMenuItems = (
    navItems: NavItem[],
  ) => (
    <ul className="flex flex-col gap-4">
      {navItems.map((nav, index) => (
        <li key={nav.name}>
          {
            nav.path && (
              <Link
                href={nav.path}
                className={`menu-item group ${
                  isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                }`}
              >
                <span
                  className={`${
                    isActive(nav.path)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isMobileOpen) && (
                  <span className={`menu-item-text`}>{nav.name}</span>
                )}
              </Link>
            )
          }
        </li>
      ))}
    </ul>
  );

   const isActive = useCallback((path: string) => path === pathname, [pathname]);

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
    >
      <div
        className={`py-8 flex  ${
          !isExpanded ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link href="/">
          {isExpanded || isMobileOpen ? (
            <>
              <Image
                src="/images/group.svg"
                alt="Logo"
                width={40}
                height={40}
              />
            </>
          ) : (
            <Image
              src="/images/group.svg"
              alt="Logo"
              width={32}
              height={32}
            />
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {
                  "Menu"
                }
              </h2>
              {renderMenuItems(navItems)}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};
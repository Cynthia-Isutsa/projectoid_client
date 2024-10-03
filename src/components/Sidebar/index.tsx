"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSideBarCollapse } from "@/state";
import { useGetProjectsQuery } from "@/state/api";
import { AlertCircle, AlertOctagon, AlertTriangle, Briefcase, ChevronDown, ChevronUp, Home, Icon, LockIcon, LucideIcon, Search, Settings, ShieldAlert, User, Users, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const [showProjects, setShowProjects] = React.useState(true);
  const [showPriority, setShowPriority] = React.useState(true);

  const { data: projects } = useGetProjectsQuery()

  console.log(projects, "projects")

const dispatch = useAppDispatch();

const isSideBarCollapsed = useAppSelector((state) => state.global.isSideBarCollapsed)

  const sidebarClassName = `fixed flex flex-col h-[100%] justify-between shadow-lg 
    transition-all duration-300 h-full z-40 dark:bg-black overflow-y-auto bg-white 
    ${isSideBarCollapsed ? "w-0 hidden" : "w-64"}`;
  return (
    <div className={sidebarClassName}>
      <div className="flex h-[100%] w-full flex-col justify-start">
        {/* Top Logo */}
        <div className="z-50 flex min-h-[56px] w-64 items-center justify-between bg-white px-6 pt-3 dark:bg-dark-bg">
          <div className="text-xl font-bold text-gray-800 dark:text-white">
            PROJECTOID
          </div>
          {isSideBarCollapsed ? null : (
            <button
              onClick={() => {dispatch(setIsSideBarCollapse(!isSideBarCollapsed))}}
              className="p-3"
            >
              <X className="h-6 w-6 text-gray-800 hover:text-gray-500 dark:text-white" />
            </button>
          )}
        </div>
        {/* Team */}
        <div className="flex items-center gap-5 border-y-[1.5px] border-gray-200 px-8 pt-4 dark:border-gray-700">
          <Image src="/logo.png" alt="logo" width={40} height={40} />
          <div>
            <h3 className="text-md font-bold tracking-wide dark:text-gray-200">
              THE TEAM
            </h3>
            <div className="mt-1 flex items-start gap-2">
              <LockIcon className="mt-[0.1rem] h-3 w-3 text-gray-500 dark:text-gray-400" />
              <p className="text-xs text-gray-500">Private</p>
            </div>
          </div>
        </div>
         {/* Navbar Links */}
         <nav className="z-10 w-full">
          <SidebarLinks icon={Home} label="Home" href="/" />
          <SidebarLinks icon={Briefcase} label="Timeline" href="/timeline" />
          <SidebarLinks icon={Search} label="Search" href="/search" />
          <SidebarLinks icon={Settings} label="Settings" href="/settings" />
          <SidebarLinks icon={User} label="Users" href="/users" />
          <SidebarLinks icon={Users} label="Teams" href="/teams" />
        </nav>
        {/* PROJECTS LINKS */}
        <button
          onClick={() => setShowProjects((prev) => !prev)}
          className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
        >
          <span className="">Projects</span>
          {showProjects ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
          </button>
          {/* PROJECTS LIST */}
          {showProjects && projects?.map((project) => (
            <SidebarLinks
              key={project.id}
              href={`/projects/${project.id}`}
              icon={Briefcase}
              label={project.name}
            />
          ))}

          {/* PRIORITY LINKS */}
        <button
          onClick={() => setShowPriority((prev) => !prev)}
          className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
        >
          <span className="">Priority</span>
          {showPriority ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>
        {showPriority && (
        <>
        <SidebarLinks
          icon={AlertCircle}
          label="Urgent"
          href="/priority/urgent"
        />
        <SidebarLinks
          icon={ShieldAlert}
          label="High"
          href="/priority/high"
        />
        <SidebarLinks
          icon={AlertTriangle}
          label="Medium"
          href="/priority/medium"
        />
        <SidebarLinks icon={AlertTriangle} label="Low" href="/priority/low" />
        <SidebarLinks
          icon={AlertTriangle}
          label="Backlog"
          href="/priority/backlog"
        />
      </>
        )}
      </div>
    </div>
  );
};
interface SidebarLinkProps {
    href: string;
    icon: LucideIcon;
    label: string;
    
}

const SidebarLinks = ({href,icon: Icon,label}: SidebarLinkProps) => {
const pathname = usePathname();
const isActive = pathname === href || (pathname === "/" && href === "/Dashboard");
const screenWidth = window.innerWidth;

console.log(href)



    return (
        <Link href={href} className="w-full">
        <div
          className={`relative flex cursor-pointer items-center gap-3 transition-colors hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-700 ${
            isActive ? "bg-gray-100 text-white dark:bg-gray-600" : ""
          } justify-start px-8 py-3`}
        >
          {isActive && (
            <div className="absolute left-0 top-0 h-[100%] w-[5px] bg-blue-200" />
          )}
  
          <Icon className="h-6 w-6 text-gray-800 dark:text-gray-100" />
          <span className={`font-medium text-gray-800 dark:text-gray-100`}>
            {label}
          </span>
        </div>
      </Link>
    )
} 

export default Sidebar;
 
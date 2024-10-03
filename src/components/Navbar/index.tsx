import React from "react";
import { Menu, Moon, Search, Settings, Sun } from "lucide-react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsDarkMode, setIsSideBarCollapse } from "@/state";

const Navbar = () => {
const dispatch = useAppDispatch();

const isSideBarCollapsed = useAppSelector((state) => state.global.isSideBarCollapsed)
const isDarkMode = useAppSelector((state) => state.global.isDarkMode)



  return (
    <div className="flex items-center justify-between bg-white px-4 py-3 dark:bg-dark-bg">
      {/** Search */}
      <div className="flex items-center gap-8">
        {!isSideBarCollapsed ? null : (
          <button onClick = {() => dispatch(setIsSideBarCollapse(!isSideBarCollapsed))}>
            <Menu className="h-8 w-8 cursor-pointer dark:text-white" />
          </button>
        )} 
        <div className="relative flex h-min w-[200px]">
          <Search className="absolute left-[4px] top-1/2 mr-2 h-5 w-5 -translate-y-1/2 transform cursor-pointer dark:text-white" />
          <input
            type="search"
            className="fucus:outline-none w-full rounded border-none bg-gray-100 p-2 pl-8 text-gray-800 placeholder-gray-500 outline-none focus:border-transparent dark:bg-gray-700 dark:text-white dark:placeholder-white"
            placeholder="Search..."
          />
        </div>
      </div>
      {/** Icons */}
      <div className="flex items-center">
      <button onClick = {() => dispatch(setIsDarkMode(!isDarkMode))}
        className={isDarkMode 
        ? `rounded p-2 dark: hover:bg-gray-700` 
        : `rounded p-2 hover:bg-gray-100`}>
        {isDarkMode ? (
          <Sun className ="h-6 w-6 cursor-pointer dark:text-white"/>
        ) : (
          <Moon className="h-6 w-6 cursor-pointer dark:text-white" />
        )}
        
        </button>
        <Link
        href={"/settings"}
        className={isDarkMode 
          ? `h-min w-min rounded p-2 dark:hover:bg-gray-700` 
          : ` h-min w-min rounded p-2 hover:bg-gray-100`}>
        
          <Settings className="h-6 w-6 cursor-pointer dark:text-white" />
        </Link> 
        <div  className="ml-2 mr-5 hidden min-h-[2em] w-[0.1rem] rounded p-2 bg-gray-200 md:inline-block"> 

        </div>
      </div>
    </div>
  );
};

export default Navbar;

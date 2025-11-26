"use client"


import {Menu, Search, Bell, Sun, User } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function AdminTopbar({ toggleSidebar }: { toggleSidebar: () => void }){
    return (
        <header className="bg-white shadow flex items-center justify-between px-6 py-3 dark:bg-gray-900">

            <div className="flex items-center gap-4 text-gray-800 dark:text-gray-100">

                <button onClick={toggleSidebar} className="p-2 rounded hover:bg-gray-100 cursor-pointer">
                    <Menu />
                </button>

                <div className="flex items-center bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300 rounded-md px-3 py-1">
                    <Search size={16} className="text-gray-600 dark:text-gray-300"/>
                    <input 
                    type="search" 
                    placeholder="search..."
                    className="bg-transparent outline-none ml-2 text-sm"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">


                <ThemeToggle />
                <Bell className="text-gray-600 dark:text-gray-300 cursor-pointer hover:bg-gray-100"/>
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                    <User size={18} className="cursor-pointer"/>
                </div>
            </div>

           
        </header>
    )
}
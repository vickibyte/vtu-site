"use client"

import Sidebar from "@/components/Sidebar";
import AdminTopbar from "./AdminTopbar";
import { useState } from "react";


export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            
         <Sidebar open={sidebarOpen} />
         <div className="flex flex-col flex-1 overflow-hidden ">
            
            
            <AdminTopbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
                
                <main className="flex-1 overflow-y-auto p-6 ">{children}</main>
         </div>
        </div>
    )
}
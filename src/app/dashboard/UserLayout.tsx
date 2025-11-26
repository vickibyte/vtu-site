"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Link, Menu, LogOut } from "lucide-react";

export default function UserLayout({ children}:
    { children: React.ReactNode })  {
        const [open, setOpen] = useState(false);
        const router = useRouter();

        const handleLogout = async () => {
            try {
                const response = await fetch("/api/logout", {
                    method: "POST",
                    credentials: "include",
                });
                if (response.ok) {
                    router.push("/login");
                    router.refresh();
                } else {
                    // Handle logout error
                }
            } catch (error) {
                console.error("Logout failed:", error);
            }
        };

        return(
            <div className=" flex">

                {/* Sidebar */}
               <button onClick={handleLogout}
               className="cursor-pointer hover:text-red-700">
                <LogOut />
               </button>


            </div>
        )
    }
"use client"

import { motion } from "framer-motion";
import { Home, Users, BarChart2, Wallet, Settings, LogOut, Smartphone,Tv, ShoppingCart} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
  open: boolean;
}

const Sidebar = ({ open }: Props) =>{
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
        }
    } catch (error) {
        console.error("Logout failed:", error);
    }
};

    const menu = [
    { label: "Home", icon: <Home size={18} />, href: "/admin" },
    { label: "Users", icon: <Users size={18} />, href: "/admin/users" },
    { label: "Data Plans", icon: <Smartphone size={18} />, href: "/admin/data" },
    { label: "Cable TV", icon: <Tv size={18} />, href: "/admin/tv" },
    { label: "Reports", icon: <BarChart2 size={18} />, href: "/admin/reports" },
    { label: "Settings", icon: <Settings size={18} />, href: "/admin/settings" }, 
    ];

    return (
        <motion.aside
        animate ={{ width: open ? 220 : 80 }}
        className=" shadow-md flex h-full flex-col md:w-16 md:hover:w-60 lg:w-60 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300 border border-gray-300 dark:border-gray-700 ">

            <div className="h-16 flex items-center justify-center border-b text-xl font-bold text-green-600">

                <span className="md:hidden lg:block">Admin</span>
                <span className="hidden md:block lg:hidden">A</span>

            </div>

            <nav className="flex-1 p-3 space-y-2 ">
                {menu.map((item) => (
                    <Link
                    className="flex items-center gap-3 text-gray-700 hover:bg-green-100 rounded-lg px-3 py-2"
                    key={item.label}
                    href={item.href}>
                    {item.icon}
                    {open && <span className="whitespace-nowrap md:hidden md:group-hover:block lg:block">
                        {item.label}
                        </span>}
                    </Link>
                ))}

                <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 text-gray-700 hover:bg-red-100 rounded-lg px-3 py-2 mt-auto cursor-pointer">

                    <LogOut size={18} />
                    {open && <span className="whitespace-nowrap md:hidden md:group-hover:block lg:block">Logout</span>}
                </button>
            </nav>
        </motion.aside>
    )
}

export default Sidebar;
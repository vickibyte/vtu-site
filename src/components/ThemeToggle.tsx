'use client';

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { set } from "mongoose";

export default function ThemeToggle() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        const useDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const dark = savedTheme === 'dark' || (!savedTheme && useDark);

        document.documentElement.classList.toggle('dark', dark);
        setIsDarkMode(dark);
    }, []);

    const toggleTheme = () => {
        const newTheme = !isDarkMode;
        setIsDarkMode(newTheme);
        document.documentElement.classList.toggle('dark', newTheme);
        localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    };

    return(
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 
                 transition-all duration-300 hover:rotate-12 active:scale-90"
      aria-label="Toggle Dark Mode"  
        >
            {isDarkMode ? <Sun /> : <Moon />}
        </button>
    );
}
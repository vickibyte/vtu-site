"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data =[
    { name: "Jan", sales: 40},
    { name: "Feb", sales: 60},
    { name: "Mar", sales: 40},
    { name: "Apr", sales: 10},
    { name: "May", sales: 100},
    { name: "Jun", sales: 30},
    { name: "Jul", sales: 40},
    { name: "Aug", sales: 49},
    { name: "Sep", sales: 83},
    { name: "Oct", sales: 60},
    { name: "Nov", sales: 50},
    { name: "Dec", sales: 90},
]

export default function ChartCard(){
    return(
        <div className=" p-4 rounded-xl shadow-sm dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-700">Total Sales</h3>
                <select className="border rounded-md px-2 py-1 text-sm">
                    <option>Mar 1 - 31,2025</option>
                    <option>Feb 1 - 28, 2025</option>
                </select>
            </div>
            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data}>
                    <XAxis dataKey="name"/>
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="sales" stroke="#22c55e" strokeWidth={2}/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}
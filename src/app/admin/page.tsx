"use client";



import AdminLayout from "@/components/AdminLayout";
import StatCard from "@/components/StatCard";
import ChartCard from "@/components/ChartCard";




export default function AdminPage(){

    return (
        
        <AdminLayout>
        <div className="">
           
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
            <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-sm text-gray-500">Business goes thus...</p>
        </div>

        <div className="grid md:grid-cols gap-4">
            <StatCard title="New Users" value="57" color="bg-green-50" status="Active users"/>
            <StatCard title="Pending Orders" value="5" color="bg-yellow-50" status="Awaiting approval"/>
            <StatCard title="Failed Payments" value="3" color="bg-red-50" status="Complaints"/>
        </div>

      </div>
        
        </div>
        <ChartCard />
        </AdminLayout>

    );
}
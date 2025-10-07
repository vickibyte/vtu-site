"use client";


import { useEffect, useState } from "react";

interface User {
    _id: string;
    name: string;
    email: string;
    createdAt: string;
}

export default function AdminPage(){
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () =>{
            try{
                const res = await fetch("/api/users");

                const data = await res.json();
                console.log("API response:", data);
                setUsers(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error(err);
            } finally{
                setLoading(false);
            }
        };
        fetchUsers()
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>
            {loading ? (
                <p>Loading users...</p>
            ): (
                <table className="w-full border-collapse border  border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 p-2">Name</th>
                            <th className="border border-gray-300 p-2">Email</th>
                            <th className="border border-gray-300 p-2">Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td className="border border-gray-300 p-2">
                                    {user.name}
                                </td>
                                <td className="border border-gray-300 p-2">{user.email}</td>
                                <td className="border border-gray-300 p-2">{new Date(user.createdAt).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
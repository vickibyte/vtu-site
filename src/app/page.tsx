"use client";
import { useEffect, useState } from "react";



export default function Home() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/users')
    .then(res => res.json())
    .then(data => setUsers(data));
  }, []);

  return(
    <main className="flex flex-col items-center justify-center h-screen text-center bg-gray-100">
      
      <h1 className="text-3xl font-bold mb-4"> Welcome to VTU Express</h1>
      {/* <pre>{JSON.stringify(users, null, 2)}</pre> */}

      <p className="text-gray-700 mb-6">Buy Data, AIrtime, and DSTV Subscriptions Easily</p>
      
      <div className="flex gap-4">
        <a href="/login" className="bg-blue-600 text-white px-6 py-2 rounded-lg">Login</a>
        <a href="/register" className="border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50">Register</a>
      </div>
    </main>
  );
}
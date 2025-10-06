'use client'

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logging in with:", { email, password });
    alert('login coming sooon!');
  };


  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleLogin}
      className="bg-white p-8 rounded-xl shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <input 
        type="email"
        placeholder="Email"
        className="w-full mb-3 px-4 py-2 border rounded"
        value={email} onChange={(e) => setEmail(e.target.value)} />
        <input 
        type="password"
        placeholder="Password"
        className="w-full mb-3 px-4 py-2 border rounded"
        value={password} onChange={(e) => setPassword(e.target.value)} />


        <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 cursor-pointer">Login</button>

        <p className="text-sm text-center mt-3">Don't have an account? <Link href="/register" className="text-blue-600 hover:underline">Register</Link></p>
      </form>
    </main>
  )

};
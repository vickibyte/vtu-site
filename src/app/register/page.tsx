'use client'

import React, { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      alert(data.message);
      setLoading(false);
  };


  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <form onSubmit={handleRegister}
      className="bg-white p-8 rounded-xl shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <input 
        type="text"
        placeholder="Full Name"
        className="w-full mb-3 px-4 py-2 border rounded"
        value={name} onChange={(e) => setName(e.target.value)} 
        required/>


        <input 
        type="email"
        placeholder="Email"
        className="w-full mb-3 px-4 py-2 border rounded"
        value={email} onChange={(e) => setEmail(e.target.value)} />


        <input 
        type="password" 
        placeholder="Password"
        value={password} 
        className="w-full mb-3 px-4 py-2 border rounded"
        onChange={(e) => setPassword(e.target.value)}
        required/>


        <button disabled={loading} className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 cursor-pointer">{loading ? "Loading..." : "Register"}</button>

        <p className="text-sm text-center mt-3">Already have an account? <Link href="/login" className="text-blue-600 hover:underline">Login</Link></p>
      </form>
    </main>
  );

};




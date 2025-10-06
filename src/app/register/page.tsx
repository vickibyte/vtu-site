'use client'

import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
    const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registering with:", { name, email, password });
    alert('Registration coming soon!');
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


        <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 cursor-pointer">Register</button>

        <p className="text-sm text-center mt-3">Already have an account? <Link href="/login" className="text-blue-600 hover:underline">Login</Link></p>
      </form>
    </main>
  );

};




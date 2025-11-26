'use client'
import { useRouter } from 'next/navigation';
import React, { useState } from "react";
import Link from "next/link";
import axios from 'axios';
import bcrypt from 'bcryptjs';
import { Eye, EyeOff } from 'lucide-react';

export default function RegisterPage() {
  const [fullname, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    fullname: '',
    email: '',
    phone: '',
    password: ''
  });
  const router = useRouter();

  const validateForm = () => {
    const newErrors = {
      fullname: fullname.length < 2 ? 'Name must be at least 2 characters' : '',
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? 'Invalid email format' : '',
      phone: !/^\d{11}$/.test(phone) ? 'Phone must be 11 digits' : '',
      password: !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password) 
        ? 'Password must be at least 8 characters with 1 letter and 1 number' : ''
    };
    setErrors(newErrors);
    return Object.values(newErrors).every(error => !error);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      const password_hash = await bcrypt.hash(password, 10);
      await axios.post('/api/register', { 
        fullname, 
        email, 
        phone, 
        password
      });
      router.push('/login');
    } catch (error: any) {
      console.error(error.response?.data || error.message);
      alert(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded-xl shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        
        <div className="space-y-2">
          <input 
            type="text"
            placeholder="Full Name"
            className={`w-full mb-1 px-4 py-2 border rounded ${errors.fullname ? 'border-red-500' : ''}`}
            value={fullname} 
            onChange={(e) => setName(e.target.value)}
            required
          />
          {errors.fullname && <p className="text-red-500 text-sm">{errors.fullname}</p>}
        </div>

        <div className="space-y-2">
          <input 
            type="email"
            placeholder="Email"
            className={`w-full mb-1 px-4 py-2 border rounded ${errors.email ? 'border-red-500' : ''}`}
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className={`w-full mb-1 px-4 py-2 border rounded ${errors.phone ? 'border-red-500' : ''}`}
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>

        <div className="space-y-2 relative">
          <input 
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password} 
            className={`w-full mb-1 px-4 py-2 border rounded ${errors.password ? 'border-red-500' : ''}`}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
           <button 
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        <button 
          disabled={loading} 
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 cursor-pointer"
        >
          {loading ? "Loading..." : "Register"}
        </button>

        <p className="text-sm text-center mt-3">
          Already have an account? <Link href="/login" className="text-blue-600 hover:underline">Login</Link>
        </p>
      </form>
    </main>
  );
}
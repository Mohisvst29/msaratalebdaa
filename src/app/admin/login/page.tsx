"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, Lock, User, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "masarat2030") {
      // In a real app, use NextAuth or JWT. For now, simple cookie/localStorage.
      localStorage.setItem("isAdmin", "true");
      router.push("/admin");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-[#111] border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl"
      >
        <div className="flex flex-col items-center mb-12">
          <div className="w-16 h-16 bg-[#00AEEF] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-[#00AEEF]/20">
            <Building2 className="w-10 h-10 text-[#050505]" />
          </div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tighter">Admin Portal</h1>
          <p className="text-white/40 text-sm mt-2 font-bold tracking-widest uppercase">Masarat Al Ibdaa</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-4">Username</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white focus:outline-none focus:border-[#00AEEF] transition-colors"
                placeholder="Enter username"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-4">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white focus:outline-none focus:border-[#00AEEF] transition-colors"
                placeholder="Enter password"
                required
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm text-center font-bold">{error}</p>}

          <button
            type="submit"
            className="group w-full bg-[#00AEEF] hover:bg-[#008FBF] text-[#050505] font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-lg shadow-[#00AEEF]/20 active:scale-[0.98]"
          >
            <span>SIGN IN</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </motion.div>
    </div>
  );
}

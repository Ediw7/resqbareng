// src/pages/login.tsx
import { useState } from 'react';
import { supabase } from '@/utils/supabaseClient';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data: { user }, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      if (!user) throw new Error('Login gagal, coba lagi.');

      // ==== PERUBAHAN 1: Ganti nama tabel dari 'profiles' menjadi 'profil_pengguna' ====
      const { data: profile, error: profileError } = await supabase
        .from('profil_pengguna')
        .select('peran') // ==== PERUBAHAN 2: Ganti kolom 'role' menjadi 'peran' ====
        .eq('id', user.id)
        .single();

      if (profileError) throw profileError;
      if (!profile) throw new Error('Profil tidak ditemukan.');

      // ==== PERUBAHAN 3: Gunakan 'profile.peran' untuk memeriksa peran ====
      switch (profile.peran) {
        case 'ADMIN': router.push('/dashboard/admin'); break;
        case 'RELAWAN': router.push('/dashboard/relawan'); break;
        case 'WARGA': router.push('/dashboard/warga'); break;
        default: router.push('/');
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Login ke ResQBareng</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="w-full p-3 border rounded-lg" 
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full p-3 border rounded-lg" 
            required 
          />
          <button 
            disabled={loading} 
            type="submit" 
            className="w-full p-3 text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:bg-gray-400"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="text-center mt-4 text-sm text-gray-600">
          Belum punya akun?{' '}
          <Link href="/register" className="font-medium text-green-600 hover:underline">
            Daftar di sini
          </Link>
        </p>
      </div>
    </div>
  );
}
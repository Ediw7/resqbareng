// src/pages/register.tsx
import { useState } from 'react';
import { supabase } from '@/utils/supabaseClient';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<'WARGA' | 'RELAWAN'>('WARGA');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: role, // Kirim peran yang dipilih ke Supabase
          },
        },
      });

      if (error) throw error;
      alert('Registrasi berhasil! Silakan cek email Anda untuk verifikasi.');
      router.push('/login');
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Daftar Akun ResQBareng</h1>
        <form onSubmit={handleRegister} className="space-y-4">
          <input type="text" placeholder="Nama Lengkap" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full p-3 border rounded-lg" required />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 border rounded-lg" required />
          <input type="password" placeholder="Password (minimal 6 karakter)" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 border rounded-lg" required />
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Saya mendaftar sebagai:</label>
            <select id="role" value={role} onChange={(e) => setRole(e.target.value as 'WARGA' | 'RELAWAN')} className="mt-1 block w-full p-3 border border-gray-300 bg-white rounded-lg shadow-sm">
              <option value="WARGA">Warga Biasa</option>
              <option value="RELAWAN">Relawan Siaga</option>
            </select>
          </div>
          <button disabled={loading} type="submit" className="w-full p-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-400">
            {loading ? 'Mendaftarkan...' : 'Daftar'}
          </button>
        </form>
        <p className="text-center mt-4 text-sm text-gray-600">Sudah punya akun? <Link href="/login" className="font-medium text-blue-600 hover:underline">Login di sini</Link></p>
      </div>
    </div>
  );
}
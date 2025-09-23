import AuthGuard from '@/components/AuthGuard';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';

function AdminDashboard() {
  const user = useUser();
  const supabase = useSupabaseClient();
  const router = useRouter();

  return (
    <div className="p-8 bg-blue-50 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-800">Dashboard Admin Komunitas</h1>
      <p className="mt-2 text-gray-600">Anda login sebagai: {user?.email}</p>
      <button
        onClick={async () => {
          await supabase.auth.signOut();
          router.push('/login');
        }}
        className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <AuthGuard>
      <AdminDashboard />
    </AuthGuard>
  );
}
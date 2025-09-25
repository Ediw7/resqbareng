// src/pages/dashboard/warga/profil.tsx
import WargaLayout from "@/components/layouts/WargaLayout";
import { useUser } from '@supabase/auth-helpers-react';

export default function ProfilPage() {
    const user = useUser();
  return (
    <WargaLayout pageTitle="Profil Saya">
        <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold">Informasi Akun</h3>
            <p className="mt-4"><strong>Nama:</strong> {user?.user_metadata.full_name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Peran:</strong> <span className="font-semibold text-green-600">Warga Terdaftar</span></p>

            <h3 className="text-xl font-semibold mt-8">Lencana Saya</h3>
            {/* Placeholder untuk galeri lencana */}

            <div className="mt-8 border-t pt-6">
                <h3 className="text-xl font-semibold">Tingkatkan Peran</h3>
                <p className="text-gray-600 mt-1">Jadilah garda terdepan komunitas dengan menjadi Relawan Siaga terverifikasi.</p>
                <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md">Ajukan Diri Sebagai Relawan</button>
            </div>
        </div>
    </WargaLayout>
  );
}
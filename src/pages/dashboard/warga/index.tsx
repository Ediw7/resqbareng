// src/pages/dashboard/warga/index.tsx
import { useState, useEffect } from 'react';
import WargaLayout from "@/components/layouts/WargaLayout";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import type { NextPage } from "next";
import Link from 'next/link';
import { AlertTriangle, ShieldCheck, ArrowRight, Loader2 } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';

// ==== PERUBAHAN 1: Menyesuaikan tipe data dengan skema database baru ====
type Laporan = {
  id: string;
  deskripsi: string;
  status: string;
  dibuat_pada: string;
  profil_pengguna: {
    nama_lengkap: string;
  }[] | null;
};
// =======================================================================

// Fungsi untuk mendapatkan salam sesuai waktu
const getGreeting = () => {
  const hour = new Date().getHours();
  // Karena sekarang jam 8 malam (20:36), salamnya akan "Malam"
  if (hour < 11) return "Pagi";
  if (hour < 15) return "Siang";
  if (hour < 19) return "Sore";
  return "Malam";
};

const WargaDashboardHome: NextPage = () => {
  const user = useUser();
  const supabase = useSupabaseClient();
  const fullName = user?.user_metadata.nama_lengkap || 'Warga'; // Disesuaikan ke nama_lengkap

  // State menggunakan tipe data Laporan yang baru
  const [reports, setReports] = useState<Laporan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      // ==== PERUBAHAN 2: Menyesuaikan kueri Supabase dengan nama tabel & kolom baru ====
      const { data, error } = await supabase
        .from('laporan_warga') // dari 'reports'
        .select(`
          id,
          deskripsi,
          status,
          dibuat_pada,
          profil_pengguna ( nama_lengkap ) 
        `)
        .eq('status', 'DARURAT')
        .order('dibuat_pada', { ascending: false })
        .limit(3);
      // ==============================================================================

      if (error) {
        console.error("Error fetching reports:", error);
      } else if (data) {
        setReports(data as Laporan[]);
      }
      setLoading(false);
    };

    fetchReports();

    // Mendengarkan perubahan real-time pada tabel 'laporan_warga'
    const channel = supabase.channel('realtime-reports')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'laporan_warga' }, 
      (payload) => {
        fetchReports();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  return (
    <WargaLayout pageTitle="Home">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Selamat {getGreeting()}, {fullName}!</h1>
        <p className="text-gray-500">Siap membantu lingkunganmu hari ini?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Kartu-kartu aksi (tidak ada perubahan di sini) */}
        <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col justify-between h-48 bg-cover bg-center" style={{backgroundImage: "url('https://i.imgur.com/G34j6fA.png')"}}>
          <div>
            <h2 className="font-bold text-2xl text-white">Peta Respon Komunitas</h2>
            <p className="text-white/80 text-sm">Lihat situasi terkini di sekitarmu.</p>
          </div>
          <Link href="/dashboard/warga" legacyBehavior><a className="px-4 py-2 bg-white/90 text-slate-800 font-semibold rounded-lg self-start hover:bg-white transition-colors">Lihat Peta</a></Link>
        </div>
        <div className="bg-blue-500 p-6 rounded-2xl shadow-lg flex flex-col justify-between h-48">
          <div>
            <ShieldCheck className="text-white/50 mb-2" />
            <h2 className="font-bold text-2xl text-white">Sudah Siapkah Anda?</h2>
            <p className="text-white/80 text-sm">Pelajari cara membuat tas siaga bencana.</p>
          </div>
          <Link href="/dashboard/warga/edukasi" legacyBehavior><a className="px-4 py-2 bg-white/90 text-blue-600 font-semibold rounded-lg self-start hover:bg-white transition-colors">Mulai Belajar</a></Link>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-2xl shadow-lg">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-xl text-gray-800 flex items-center">
            <AlertTriangle className="text-red-500 mr-2" />
            Laporan Darurat Terkini
          </h3>
          {loading && <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />}
        </div>
        <div className="mt-4 space-y-3">
          {!loading && reports.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-4">Tidak ada laporan darurat. Alhamdulillah aman!</p>
          )}

          {!loading && reports.map((report) => (
            <div key={report.id} className="p-3 bg-gray-50 rounded-lg flex justify-between items-center hover:bg-gray-100 transition-colors">
              <div>
                {/* ==== PERUBAHAN 3: Menggunakan nama kolom Indonesia di JSX ==== */}
                <p className="font-semibold text-gray-700">{report.deskripsi}</p>
                <p className="text-xs text-gray-500">
                  Oleh: {report.profil_pengguna?.[0]?.nama_lengkap || 'Warga'} • {formatDistanceToNow(new Date(report.dibuat_pada), { addSuffix: true, locale: id })}
                </p>
                {/* ======================================================== */}
              </div>
              <Link href={`/dashboard/warga/laporan/${report.id}`} legacyBehavior>
                 <a className="px-3 py-1 text-sm font-semibold text-white bg-red-500 rounded-full hover:bg-red-600 transition-colors flex-shrink-0">Lihat</a>
              </Link>
            </div>
          ))}
        </div>
        <Link href="/dashboard/warga/aktivitas" legacyBehavior>
            <a className="text-sm text-blue-600 hover:underline mt-4 inline-flex items-center">
                Lihat semua aktivitas <ArrowRight className="w-4 h-4 ml-1" />
            </a>
        </Link>
      </div>
    </WargaLayout>
  );
};

export default WargaDashboardHome;
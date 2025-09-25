// src/pages/dashboard/warga/index.tsx
import WargaLayout from "@/components/layouts/WargaLayout";
import { useUser } from "@supabase/auth-helpers-react";
import type { NextPage } from "next";
import { AlertTriangle, ShieldCheck } from "lucide-react";

const WargaDashboardHome: NextPage = () => {
  const user = useUser();
  const fullName = user?.user_metadata.full_name || 'Warga';

  return (
    <WargaLayout pageTitle="Home">
      {/* Salam Pembuka */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Selamat Pagi, {fullName}!</h1>
        <p className="text-gray-500">Siap membantu lingkunganmu hari ini?</p>
      </div>

      {/* Grid Kartu Aksi */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Kartu Peta */}
        <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col justify-between h-48 bg-cover bg-center" style={{backgroundImage: "url('https://i.imgur.com/G34j6fA.png')"}}>
            <div>
                <h2 className="font-bold text-2xl text-white">Peta Respon Komunitas</h2>
                <p className="text-white/80 text-sm">Lihat situasi terkini di sekitarmu.</p>
            </div>
            <button className="px-4 py-2 bg-white/90 text-slate-800 font-semibold rounded-lg self-start hover:bg-white">Lihat Peta</button>
        </div>

        {/* Kartu Edukasi */}
        <div className="bg-blue-500 p-6 rounded-2xl shadow-lg flex flex-col justify-between h-48">
            <div>
                 <ShieldCheck className="text-white/50 mb-2" />
                <h2 className="font-bold text-2xl text-white">Sudah Siapkah Anda?</h2>
                <p className="text-white/80 text-sm">Pelajari cara membuat tas siaga bencana.</p>
            </div>
            <button className="px-4 py-2 bg-white/90 text-blue-600 font-semibold rounded-lg self-start hover:bg-white">Mulai Belajar</button>
        </div>
      </div>

      {/* Laporan Darurat Terkini */}
      <div className="mt-8 bg-white p-6 rounded-2xl shadow-lg">
        <h3 className="font-bold text-xl text-gray-800 flex items-center">
            <AlertTriangle className="text-red-500 mr-2" />
            Laporan Darurat Terkini
        </h3>
        <div className="mt-4 space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg flex justify-between items-center">
                <div>
                    <p className="font-semibold text-gray-700">Butuh Evakuasi - Jl. Mawar No. 5</p>
                    <p className="text-xs text-gray-500">Dilaporkan oleh: Ibu Retno</p>
                </div>
                <button className="px-3 py-1 text-sm font-semibold text-white bg-red-500 rounded-full hover:bg-red-600">Lihat</button>
            </div>
        </div>
      </div>
    </WargaLayout>
  );
};

export default WargaDashboardHome;
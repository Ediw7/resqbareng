// src/pages/dashboard/warga/edukasi.tsx
import WargaLayout from "@/components/layouts/WargaLayout";
import type { NextPage } from "next"; 

const EdukasiPage: NextPage = () => { 
  return (
    <WargaLayout pageTitle="Pusat Edukasi">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Contoh Kartu Artikel */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="font-bold">Cara Membuat Tas Siaga Bencana</h4>
          <p className="text-sm text-gray-600 mt-2">Pelajari barang apa saja yang wajib ada di dalam tas darurat Anda...</p>
          <a href="#" className="text-sm text-blue-600 mt-2 inline-block">Baca Selengkapnya</a>
        </div>
       
      </div>
    </WargaLayout>
  );
};

export default EdukasiPage; 
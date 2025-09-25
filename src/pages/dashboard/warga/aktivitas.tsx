// src/pages/dashboard/warga/aktivitas.tsx
import WargaLayout from "@/components/layouts/WargaLayout";

export default function AktivitasPage() {
  return (
    <WargaLayout pageTitle="Aktivitas Saya">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold">Daftar Laporan Anda</h3>
        <p className="text-gray-600 mt-1">Lacak status laporan yang Anda buat atau bantuan yang Anda tawarkan.</p>
        {/* Placeholder untuk konten tabel/daftar laporan */}
        <div className="mt-4 border rounded-lg p-4">
            <p className="font-medium">Butuh Evakuasi - Jl. Mawar No. 5</p>
            <p className="text-sm text-gray-500">Status: <span className="font-bold text-green-600">Sedang Ditangani</span></p>
            <button className="mt-2 text-sm text-blue-600">Buka Chat Koordinasi</button>
        </div>
      </div>
    </WargaLayout>
  );
}
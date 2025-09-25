// src/pages/dashboard/warga/sumber-daya.tsx
import WargaLayout from "@/components/layouts/WargaLayout";

export default function SumberDayaPage() {
  return (
    <WargaLayout pageTitle="Bank Sumber Daya">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold">Kontribusi Aset & Keahlian</h3>
        <p className="text-gray-600 mt-1">Daftarkan sumber daya yang Anda miliki untuk membantu komunitas saat darurat.</p>
        
        <form className="mt-6 space-y-4">
          {/* Form inputs untuk mendaftarkan aset */}
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">Daftarkan</button>
        </form>

        <div className="mt-8">
            <h4 className="font-semibold">Sumber Daya Terdaftar Anda:</h4>
            <p className="text-sm text-gray-500 p-2 border-t mt-2">Perahu Karet Kecil</p>
        </div>
      </div>
    </WargaLayout>
  );
}
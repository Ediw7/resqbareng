// src/pages/dashboard/warga/lapor.tsx
import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import WargaLayout from '@/components/layouts/WargaLayout';
import { UploadCloud, MapPin, Loader2 } from 'lucide-react';
import Image from 'next/image';

const LaporPage: NextPage = () => {
  const router = useRouter();
  const user = useUser();
  const supabase = useSupabaseClient();

  const [status, setStatus] = useState<'WASPADA' | 'SIAGA' | 'DARURAT'>('WASPADA');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setLocation(`Lokasi GPS terdeteksi.`);
        },
        () => {
          alert('Tidak bisa mendapatkan lokasi. Pastikan Anda mengizinkan akses lokasi.');
        }
      );
    } else {
      alert('Browser Anda tidak mendukung Geolocation.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setErrorMessage('Anda harus login untuk membuat laporan.');
      return;
    }
    setLoading(true);
    setErrorMessage('');
    let imageUrl: string | undefined = undefined;

    try {
      // 1. Upload gambar jika ada
      if (imageFile) {
        setLoadingMessage('Mengunggah gambar...');
        // Bucket 'report-images' kita ganti namanya menjadi 'gambar-laporan'
        const filePath = `${user.id}/${Date.now()}_${imageFile.name}`;
        const { error: uploadError } = await supabase.storage
          .from('gambar-laporan') // Disesuaikan
          .upload(filePath, imageFile);
        
        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('gambar-laporan') // Disesuaikan
          .getPublicUrl(filePath);
        imageUrl = publicUrl;
      }

      // 2. Simpan laporan ke database
      setLoadingMessage('Menyimpan laporan...');
      // ==== PERUBAHAN UTAMA ADA DI SINI ====
      const { error: insertError } = await supabase
        .from('laporan_warga') // Nama tabel diubah
        .insert({
          id_pelapor: user.id,   // Nama kolom diubah
          status: status,
          deskripsi: description, // Nama kolom diubah
          lokasi: location,      // Nama kolom diubah
          latitude: latitude,
          longitude: longitude,
          url_gambar: imageUrl,  // Nama kolom diubah
        });
      // ===================================

      if (insertError) throw insertError;

      alert('Laporan berhasil dikirim!');
      router.push('/dashboard/warga/aktivitas');

    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
      setLoadingMessage('');
    }
  };

  return (
    <WargaLayout pageTitle="Buat Laporan Baru">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Kolom Kiri: Upload Gambar */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Foto Kejadian (Opsional)</label>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-blue-500"
            >
              {imagePreview ? (
                <div className="relative w-full h-48">
                  <Image src={imagePreview} alt="Preview" layout="fill" objectFit="cover" className="rounded-md" />
                </div>
              ) : (
                <div className="space-y-1 text-center">
                  <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="text-sm text-gray-600">Seret & lepas gambar, atau klik untuk memilih</p>
                </div>
              )}
            </div>
            <input ref={fileInputRef} id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleImageChange} />
          </div>

          {/* Kolom Kanan: Detail Laporan */}
          <div className="space-y-6">
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">Tingkat Kedaruratan</label>
              <select id="status" value={status} onChange={(e) => setStatus(e.target.value as any)} className="mt-1 block w-full p-3 border border-gray-300 bg-white rounded-lg shadow-sm">
                <option value="WASPADA">🟡 Waspada</option>
                <option value="SIAGA">🟠 Siaga</option>
                <option value="DARURAT">🔴 Darurat</option>
              </select>
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">Lokasi Kejadian</label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input id="location" type="text" placeholder="Contoh: Depan Masjid Al-Ikhlas" value={location} onChange={(e) => setLocation(e.target.value)} className="flex-1 block w-full p-3 border-gray-300 rounded-l-lg" required />
                <button type="button" onClick={handleGetCurrentLocation} className="inline-flex items-center px-3 rounded-r-lg border border-l-0 border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100">
                  <MapPin className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Deskripsi Laporan</label>
              <textarea id="description" rows={4} placeholder="Jelaskan situasi yang terjadi..." value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm" required />
            </div>
          </div>
          
          {/* Bagian Tombol Submit */}
          <div className="md:col-span-2">
            {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
            <button type="submit" disabled={loading} className="w-full flex justify-center items-center py-3 px-4 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-400">
              {loading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> {loadingMessage || 'Mengirim...'}</> : 'Kirim Laporan'}
            </button>
          </div>
        </form>
      </div>
    </WargaLayout>
  );
};

export default LaporPage;
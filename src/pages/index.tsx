// src/pages/index.tsx

import Link from 'next/link';
import Head from 'next/head';
import Header from '@/components/Header';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Selamat Datang di ResQBareng</title>
        <meta name="description" content="Platform Gotong Royong Digital Saat Krisis" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-4">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 leading-tight">
            Selamat Datang di <span className="text-blue-600">ResQBareng</span>
          </h1>
          
          <p className="mt-4 text-lg sm:text-xl text-gray-600 italic">
            "Teknologi Menghubungkan, Warga Menggerakkan."
          </p>
          
          <p className="mt-6 text-md text-gray-500 max-w-xl mx-auto">
            Platform gotong royong digital yang dirancang untuk membangun komunitas yang lebih tangguh saat menghadapi krisis lokal.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/login" legacyBehavior>
              <a className="px-8 py-3 font-semibold text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300">
                Login
              </a>
            </Link>
            <Link href="/register" legacyBehavior>
              <a className="px-8 py-3 font-semibold text-gray-800 bg-white border border-gray-300 rounded-lg shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-all duration-300">
                Register
              </a>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
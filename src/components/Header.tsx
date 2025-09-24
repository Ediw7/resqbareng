// src/components/Header.tsx
import Link from 'next/link';
import { Fragment } from 'react';

// Anda bisa mengganti ini dengan logo jika punya
const Logo = () => (
  <Link href="/" legacyBehavior>
    <a className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
      ResQBareng
    </a>
  </Link>
);

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-30 bg-white bg-opacity-80 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo di kiri */}
          <Logo />

          {/* Tombol Aksi di kanan */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link href="/login" legacyBehavior>
              <a className="px-4 py-2 text-sm sm:text-base font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                Login
              </a>
            </Link>
            <Link href="/register" legacyBehavior>
              <a className="px-4 py-2 text-sm sm:text-base font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                Register
              </a>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
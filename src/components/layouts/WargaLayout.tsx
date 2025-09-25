// src/components/layouts/WargaLayout.tsx
import { ReactNode, useState, Fragment } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { Home, ListTodo, Archive, UserCircle, Menu, X, LogOut, PlusSquare } from 'lucide-react';
import AuthGuard from '@/components/AuthGuard';
import { Transition } from '@headlessui/react';

// Daftar item navigasi (disesuaikan)
const navItems = [
  { href: '/dashboard/warga', label: 'Home', icon: Home },
  { href: '/dashboard/warga/aktivitas', label: 'Aktivitas Saya', icon: ListTodo },
  { href: '/dashboard/warga/sumber-daya', label: 'Bank Sumber Daya', icon: Archive },
  { href: '/dashboard/warga/profil', label: 'Profil Saya', icon: UserCircle },
];

// Komponen Layout Utama
function WargaDashboardLayout({ children, pageTitle }: { children: ReactNode; pageTitle: string }) {
  const router = useRouter();
  const user = useUser();
  const supabase = useSupabaseClient();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar Utama */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-lg shadow-sm">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/dashboard/warga" legacyBehavior>
              <a className="text-xl font-bold text-blue-600">ResQBareng</a>
            </Link>

            {/* Navigasi Desktop */}
            <nav className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <Link key={item.label} href={item.href} legacyBehavior>
                  <a className={`text-sm font-medium transition-colors ${
                    router.pathname === item.href ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                  }`}>
                    {item.label}
                  </a>
                </Link>
              ))}
            </nav>

            {/* Aksi di Kanan (Desktop) */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/dashboard/warga/lapor" legacyBehavior>
                <a className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center gap-2">
                  <PlusSquare size={16} /> Buat Laporan
                </a>
              </Link>
              <div className="relative">
                <button onClick={handleLogout} className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200">
                  <LogOut size={18}/>
                </button>
              </div>
            </div>

            {/* Tombol Hamburger (Mobile) */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Menu Drawer (Mobile) */}
      <Transition
        as={Fragment}
        show={isMenuOpen}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <div className="md:hidden fixed top-16 left-0 right-0 z-30 bg-white shadow-lg">
          <nav className="flex flex-col p-4 space-y-2">
            <Link href="/dashboard/warga/lapor" legacyBehavior>
              <a 
                className="flex items-center justify-center px-3 py-3 rounded-md text-base font-bold text-white bg-blue-600 hover:bg-blue-700"
                onClick={() => setIsMenuOpen(false)}
              >
                <PlusSquare className="w-5 h-5 mr-3" />
                <span>Buat Laporan Baru</span>
              </a>
            </Link>
            <div className="border-t my-2"></div>

            {navItems.map((item) => (
               <Link key={item.label} href={item.href} legacyBehavior>
                  <a className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                    router.pathname === item.href ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                  }`} onClick={() => setIsMenuOpen(false)}>
                    <item.icon className="w-5 h-5 mr-3" />
                    <span>{item.label}</span>
                  </a>
                </Link>
            ))}
             <div className="border-t my-2"></div>
             <button onClick={handleLogout} className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50">
                <LogOut className="w-5 h-5 mr-3"/> Logout
             </button>
          </nav>
        </div>
      </Transition>

      {/* Konten Utama Halaman */}
      <main className="pt-24 container mx-auto px-4 sm:px-6">
        {children}
      </main>
    </div>
  );
}

// Wrapper untuk menggunakan AuthGuard
export default function WargaLayout({ children, pageTitle }: { children: ReactNode; pageTitle: string }) {
  return (
    <AuthGuard>
      <WargaDashboardLayout pageTitle={pageTitle}>
        {children}
      </WargaDashboardLayout>
    </AuthGuard>
  );
}
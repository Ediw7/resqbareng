// src/components/AuthGuard.tsx
import { useEffect } from 'react';
import { useUser } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const user = useUser();
  const router = useRouter();
  const isLoading = user === undefined;

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/login');
    }
  }, [isLoading, user, router]);

  if (user) {
    return <>{children}</>;
  }
  return <div className="flex justify-center items-center h-screen">Loading...</div>;
};
export default AuthGuard;
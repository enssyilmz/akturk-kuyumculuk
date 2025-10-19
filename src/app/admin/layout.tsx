'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Auth state değişimini dinle
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Sadece /admin sayfası değilse (dashboard, products vb.) kontrol et
      if (pathname !== '/admin') {
        if (!user) {
          // Kullanıcı yok - login'e yönlendir
          console.log('Kullanıcı giriş yapmamış, /giris\'e yönlendiriliyor...');
          router.replace('/giris');
        }
      }
    });

    return () => unsubscribe();
  }, [pathname, router]);

  return <>{children}</>;
}

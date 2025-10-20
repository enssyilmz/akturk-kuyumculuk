'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter, usePathname } from 'next/navigation';

export default function useAuth(requireAuthentication: boolean = false) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
        if (requireAuthentication && pathname !== '/giris') {
          router.replace('/giris');
        }
      }
    });

    return () => unsubscribe();
  }, [requireAuthentication, pathname, router]);

  const requireAuth = () => {
    if (!loading && !user) {
      router.replace('/giris');
    }
  };

  return { user, loading, requireAuth };
}

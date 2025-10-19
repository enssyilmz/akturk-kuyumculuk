'use client';

import { useEffect } from 'react';
import { analytics } from '@/lib/firebase';

export default function FirebaseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Analytics'i initialize et (sadece client-side)
    if (analytics) {
      console.log('Firebase Analytics initialized');
    }
  }, []);

  return <>{children}</>;
}

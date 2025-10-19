'use client';

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function LayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Admin paneli ve login sayfalarında navbar gösterme
  const hideNavbar = pathname?.startsWith('/admin') || pathname?.startsWith('/giris');

  return (
    <>
      {!hideNavbar && <Navbar />}
      <main className={hideNavbar ? "" : "pt-48"}>
        {children}
      </main>
    </>
  );
}

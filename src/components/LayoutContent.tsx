'use client';

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function LayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Admin paneli ve login sayfalarında navbar/sidebar gösterme
  const hideNavigation = pathname?.startsWith('/admin') || pathname?.startsWith('/giris');

  return (
    <>
      {!hideNavigation && (
        <>
          {/* Desktop: Navbar */}
          <Navbar />
          {/* Mobile: Sidebar */}
          <Sidebar />
        </>
      )}
      <main className={hideNavigation ? "" : "pt-32 lg:pt-48"}>
        {children}
      </main>
    </>
  );
}

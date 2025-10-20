'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Phone } from 'lucide-react';

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);

  const menuItems = [
    { name: 'BİLEKLİK', href: '/urunler/bileklik' },
    { name: 'BİLEZİK', href: '/urunler/bilezik' },
    { name: 'KOLYE', href: '/urunler/kolye' },
    { name: 'KÜPE', href: '/urunler/kupe' },
    { name: 'YÜZÜK', href: '/urunler/yuzuk' },
    { name: 'SET', href: '/urunler/set' },
    { name: 'ALTIN FİYATLARI', href: '/altin-fiyatlari' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-brand-dark-gray shadow-2xl border-b-2 border-brand-gold z-50 shadow-brand-light-gray/50">
      {/* En Üst Bar - İletişim ve Linkler */}
      <div className="bg-brand-black border-b border-brand-gold">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-10">
            {/* Sol - Linkler */}
            <div className="flex items-center space-x-6 text-sm">
              <Link href="/neden-akturk-kuyumculuk" className="text-brand-light-gray hover:text-brand-gold transition-colors">
                Neden Akturk Kuyumculuk?
              </Link>
              <Link href="/uretim" className="text-brand-light-gray hover:text-brand-gold transition-colors">
                Üretim
              </Link>
            </div>

            {/* Sağ - İletişim */}
            <div className="flex items-center space-x-4 text-sm">
              <a href="tel:05312831934" className="flex items-center space-x-2 text-brand-light-gray hover:text-brand-gold transition-colors">
                <Phone className="w-4 h-4" />
                <span>(0531)283 19 34</span>
              </a>
              <a href="tel:04623321661" className="flex items-center space-x-2 text-brand-light-gray hover:text-brand-gold transition-colors">
                <Phone className="w-4 h-4" />
                <span>0462 332 16 61</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Orta Kısım - Logo */}
      <div className="border-b border-brand-medium-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo (sol) */}
            <div className="flex-1 flex justify-start">
              <Link href="/" className="flex items-center">
                <div className="relative h-25 w-25">
                  <Image
                    src="/images/logo-no-background.png"
                    alt="Aktürk Kuyumculuk"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </Link>
            </div>

            {/* Caption (ortada) */}
            <div className="flex-1 flex justify-center mt-4">
              <div className="relative h-180 w-180">
                <Image
                  src="/images/caption-2.png"
                  alt="Caption"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Arama (sağda sabit input) */}
            <div className="flex-1 flex justify-end items-center">
              <div className="relative flex items-center">
                {searchOpen && (
                  <input
                    type="text"
                    placeholder="Ürün ara..."
                    className="w-44 md:w-56 px-4 py-2 pr-10 bg-white text-brand-light-gray border-2 border-brand-medium-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-all placeholder-brand-medium-gray"
                    autoFocus
                  />
                )}
                <button
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="absolute right-0 p-1"
                >
                  <Search className="w-8 h-8 text-brand-gold" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alt Kısım - Menü */}
      <div className="bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-14 overflow-x-auto">
            <div className="flex space-x-8">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-lg font-bold text-black hover:text-brand-gold transition-colors whitespace-nowrap border-b-2 border-transparent hover:border-brand-gold py-1"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
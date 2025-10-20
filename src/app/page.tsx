'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import FeaturedProducts from '@/components/FeaturedProducts';
import { Award, Shield, Clock, Gem, Calculator, Package } from 'lucide-react';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: 'Senin Değişimine',
      subtitle: 'Ayarlanabilir Kilidi ile',
      highlight: '7/24',
      description: 'Uyum Sağlar..',
      buttonText: 'ALIŞVERİŞE BAŞLA',
      image: '/images/bg-1.png',
      textPosition: 'left',
    },
    {
      id: 2,
      title: 'Zarif ve Modern',
      subtitle: 'Koleksiyonlarımızla',
      highlight: 'Özel',
      description: 'Tasarımlar..',
      buttonText: 'ALIŞVERİŞE BAŞLA',
      image: '/images/bg-2.png',
      textPosition: 'right',
    },
  ];

  // 5 saniyede bir otomatik geçiş
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="min-h-screen bg-brand-dark-gray">
      {/* Hero Slider */}
      <div className="relative h-[600px] overflow-hidden bg-brand-black -mt-3">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Arka Plan Resmi */}
            <div className="absolute inset-0">
              <Image
                src={slide.image}
                alt={`${slide.title} - arka plan`}
                fill
                priority={index === 0}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20"></div>
            </div>

            {/* İçerik */}
            <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div
                className={`h-full flex items-center ${
                  slide.textPosition === 'right' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-xl ${
                    slide.textPosition === 'right' ? 'text-right' : 'text-left'
                  }`}
                >
                  <h1 className="text-5xl md:text-6xl font-serif text-white mb-2">
                    {slide.title}
                  </h1>
                  <h2 className="text-3xl md:text-4xl font-light text-white mb-2">
                    {slide.subtitle}
                  </h2>
                  <p className="text-6xl md:text-7xl font-bold text-white mb-2">
                    {slide.highlight}
                  </p>
                  <p className="text-3xl md:text-4xl font-light text-white mb-8">
                    {slide.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Özellikler Bölümü */}
      <div className="bg-brand-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {[
              { icon: Award, title: 'Sertifikalı Ürünler' },
              { icon: Shield, title: 'Güvenli İnceleme' },
              { icon: Clock, title: '7/24 Katalog' },
              { icon: Gem, title: 'Özel Tasarımlar' },
              { icon: Calculator, title: 'Fiyat Hesaplama' },
              { icon: Package, title: 'Mağaza Teslim' },
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-3">
                    <IconComponent className="w-10 h-10 text-brand-gold" strokeWidth={2} />
                  </div>
                  <p className="text-lg text-white">
                    {item.title}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Öne Çıkan Ürünler - Firebase'den */}
      <FeaturedProducts />
    </div>
  );
}

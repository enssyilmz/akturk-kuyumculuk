'use client';

import { useState, useEffect } from 'react';
import FeaturedProducts from '@/components/FeaturedProducts';

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
      image: '/images/bg-1.jpg',
      textPosition: 'left',
    },
    {
      id: 2,
      title: 'Zarif ve Modern',
      subtitle: 'Koleksiyonlarımızla',
      highlight: 'Özel',
      description: 'Tasarımlar..',
      buttonText: 'ALIŞVERİŞE BAŞLA',
      image: '/images/bg-2.jpg',
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

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen bg-brand-dark-gray">
      {/* Hero Slider */}
      <div className="relative h-[600px] overflow-hidden bg-brand-black">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Arka Plan Resmi */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
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
                  <h1 className="text-5xl md:text-6xl font-serif text-brand-light-gray mb-2">
                    {slide.title}
                  </h1>
                  <h2 className="text-3xl md:text-4xl font-light text-brand-light-gray mb-2">
                    {slide.subtitle}
                  </h2>
                  <p className="text-6xl md:text-7xl font-bold text-brand-gold mb-2">
                    {slide.highlight}
                  </p>
                  <p className="text-3xl md:text-4xl font-light text-brand-light-gray mb-8">
                    {slide.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slide Göstergeleri (Dots) */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-brand-gold w-8'
                  : 'bg-brand-light-gray bg-opacity-50 hover:bg-opacity-75'
              }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Özellikler Bölümü */}
      <div className="bg-brand-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {[
              { icon: '📜', title: 'Sertifikalı Kaydet' },
              { icon: '🚚', title: 'Ücretsiz Sigortalı Gönderim' },
              { icon: '🔒', title: '3D Güvenli Alışveriş' },
              { icon: '💎', title: 'Bakım Garantisi ve Ölçü Değişimi' },
              { icon: '💳', title: 'Taksit Seçenekleri' },
              { icon: '🔬', title: 'Laboratuvar Analizli Garanti Sertifikası' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-3">{item.icon}</div>
                <p className="text-sm text-brand-light-gray leading-tight">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Öne Çıkan Ürünler - Firebase'den */}
      <FeaturedProducts />
    </div>
  );
}

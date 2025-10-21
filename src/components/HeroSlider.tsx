'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  highlight: string;
  description: string;
  buttonText: string;
  image: string;
  textPosition: 'left' | 'right';
}

const slides: Slide[] = [
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

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // 5 saniyede bir otomatik geçiş
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px] overflow-hidden bg-brand-black">
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
          <div className="relative h-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
            <div
              className={`h-full flex items-center ${
                slide.textPosition === 'right' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-sm sm:max-w-md lg:max-w-xl backdrop-blur-xs bg-black/40 p-4 sm:p-6 lg:p-8 xl:p-10  sm: ${
                  slide.textPosition === 'right' ? 'text-right' : 'text-left'
                }`}
              >
                <h1 className="text-2xl sm:text-3xl lg:text-5xl xl:text-6xl font-serif text-white mb-1 sm:mb-2">
                  {slide.title}
                </h1>
                <h2 className="text-base sm:text-xl lg:text-3xl xl:text-4xl font-light text-white mb-1 sm:mb-2">
                  {slide.subtitle}
                </h2>
                <p className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-bold text-white mb-1 sm:mb-2">
                  {slide.highlight}
                </p>
                <p className="text-base sm:text-xl lg:text-3xl xl:text-4xl font-light text-white mb-4 sm:mb-6 lg:mb-8">
                  {slide.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

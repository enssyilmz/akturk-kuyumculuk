'use client';

import React from 'react';
import { motion } from 'framer-motion';
import FeaturedProducts from '@/components/FeaturedProducts';
import HeroSlider from '@/components/HeroSlider';
import { Award, Shield, Clock, Gem, Calculator, Package } from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: Award,
      title: 'Kalite Garantisi',
      description: 'Her ürün en kaliteli malzemelerle üretilir',
    },
    {
      icon: Shield,
      title: 'Güvenilir Hizmet',
      description: 'Yıllardır güvenle hizmet veriyoruz',
    },
    {
      icon: Clock,
      title: 'Uzman Ekip',
      description: 'Deneyimli ustalar ile çalışıyoruz',
    },
    {
      icon: Gem,
      title: 'Özel Tasarım',
      description: 'Size özel tasarım imkanı',
    },
    {
      icon: Calculator,
      title: 'Şeffaf Fiyatlandırma',
      description: 'Güncel altın fiyatları ile hesaplama',
    },
    {
      icon: Package,
      title: 'El İşçiliği',
      description: 'Tüm ürünler özenle hazırlanır',
    },
  ];

  return (
    <div className="min-h-screen bg-brand-dark-gray">
      {/* Hero Slider */}
      <HeroSlider />

      {/* Özellikler */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="max-w-8xl mx-auto px-4 sm:px-8 lg:px-14 py-4 sm:py-8 lg:py-14"
      >
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-4 xl:gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex flex-col items-center text-center"
            >
              <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 text-brand-gold mb-2 sm:mb-3 lg:mb-4" />
              <h3 className="text-sm sm:text-base lg:text-lg xl:text-xl font-serif text-white mb-1 sm:mb-2">{feature.title}</h3>
              <p className="text-xs sm:text-sm lg:text-base text-brand-light-gray">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <FeaturedProducts />
    </div>
  );
}

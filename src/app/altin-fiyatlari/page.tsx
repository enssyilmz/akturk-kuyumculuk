"use client";

import { useEffect, useState } from 'react';
import { RefreshCw, TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface GoldData {
  metal: string;
  currency: string;
  price: number;
  price_gram_24k: number;
  price_gram_22k: number;
  price_gram_18k: number;
  price_gram_14k: number;
  ch: number;
  chp: number;
  ask: number;
  bid: number;
  timestamp: number;
}

export default function AltinFiyatlari() {
  const [goldData, setGoldData] = useState<GoldData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const fetchGoldPrices = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/gold-prices');
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || 'Fiyatlar yüklenemedi');
      }
      
      const data = await response.json();
      console.log('Fetched gold data:', data);
      setGoldData(data);
      setLastUpdate(new Date());
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err instanceof Error ? err.message : 'Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoldPrices();
    
    // Her 60 saniyede bir güncelle
    const interval = setInterval(fetchGoldPrices, 60000);
    
    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price: number) => {
    if (!price || isNaN(price)) return '0.00';
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const formatPercentage = (percent: number) => {
    if (!percent || isNaN(percent)) return '%0.00';
    return `%${percent > 0 ? '+' : ''}${percent.toFixed(2)}`;
  };

  return (
    <div className="min-h-screen bg-brand-black pt-8 sm:pt-12 lg:pt-30 pb-8 sm:pb-12 lg:pb-16">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        {/* Başlık */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-serif text-brand-light-gray mb-2 sm:mb-3 lg:mb-4">
            ALTIN FİYATLARI
          </h1>
          <div className="flex items-center justify-center gap-3 text-brand-medium-gray text-xs sm:text-sm">
            <span>Son Güncelleme: {lastUpdate.toLocaleTimeString('tr-TR')}</span>
            <span className="text-brand-gold">•</span>
            <span>Otomatik: 60 saniye</span>
            <button
              onClick={fetchGoldPrices}
              disabled={loading}
              className="p-2 hover:bg-brand-dark-gray rounded-full transition-colors disabled:opacity-50"
              aria-label="Yenile"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </motion.div>

        {/* Fiyat Tablosu - Boş */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-12"
        >
          <div className="bg-brand-dark-gray border border-brand-medium-gray overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-brand-gold/20 to-brand-gold/10 border-b border-brand-gold/30 p-4">
              <div className="grid grid-cols-4 gap-4 text-xs sm:text-sm font-semibold text-brand-light-gray">
                <div>Saat</div>
                <div className="text-center">Alış</div>
                <div className="text-center">Satış</div>
                <div className="text-center">Fark</div>
              </div>
            </div>

            {/* İçerik */}
            <div className="divide-y divide-brand-medium-gray/30">
              {loading && !goldData ? (
                <div className="p-8 text-center text-brand-medium-gray">
                  <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-2" />
                  <p>Fiyatlar yükleniyor...</p>
                </div>
              ) : error ? (
                <div className="p-8 text-center text-red-400">
                  <p className="mb-2">{error}</p>
                  <button
                    onClick={fetchGoldPrices}
                    className="mt-4 px-4 py-2 bg-brand-gold text-brand-black rounded hover:bg-brand-gold/80 transition-colors"
                  >
                    Tekrar Dene
                  </button>
                </div>
              ) : goldData ? (
                <>
                  {/* ONS */}
                  <div className="grid grid-cols-4 gap-4 p-4 hover:bg-brand-medium-gray/10 transition-colors">
                    <div>
                      <div className="font-semibold text-brand-light-gray text-sm sm:text-base">ONS</div>
                      <div className="text-xs text-brand-medium-gray">ONS</div>
                    </div>
                    <div className="text-center font-mono text-brand-light-gray text-sm sm:text-base">
                      ${formatPrice(goldData.bid)}
                    </div>
                    <div className="text-center font-mono text-brand-light-gray text-sm sm:text-base">
                      ${formatPrice(goldData.ask)}
                    </div>
                    <div className="flex items-center justify-center">
                      <span className={`flex items-center gap-1 text-sm sm:text-base font-semibold ${
                        goldData.chp >= 0 ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {goldData.chp >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        {formatPercentage(goldData.chp)}
                      </span>
                    </div>
                  </div>

                  {/* 24 AYAR */}
                  <div className="grid grid-cols-4 gap-4 p-4 hover:bg-brand-medium-gray/10 transition-colors">
                    <div>
                      <div className="font-semibold text-brand-light-gray text-sm sm:text-base">24 AYAR</div>
                      <div className="text-xs text-brand-medium-gray">GRAM</div>
                    </div>
                    <div className="text-center font-mono text-brand-light-gray text-sm sm:text-base">
                      ${formatPrice(goldData.price_gram_24k)}
                    </div>
                    <div className="text-center font-mono text-brand-light-gray text-sm sm:text-base">
                      ${formatPrice(goldData.price_gram_24k * 1.015)}
                    </div>
                    <div className="flex items-center justify-center">
                      <span className={`flex items-center gap-1 text-sm sm:text-base font-semibold ${
                        goldData.chp >= 0 ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {goldData.chp >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        {formatPercentage(goldData.chp)}
                      </span>
                    </div>
                  </div>

                  {/* 22 AYAR */}
                  <div className="grid grid-cols-4 gap-4 p-4 hover:bg-brand-medium-gray/10 transition-colors">
                    <div>
                      <div className="font-semibold text-brand-light-gray text-sm sm:text-base">22 AYAR</div>
                      <div className="text-xs text-brand-medium-gray">GRAM</div>
                    </div>
                    <div className="text-center font-mono text-brand-light-gray text-sm sm:text-base">
                      ${formatPrice(goldData.price_gram_22k)}
                    </div>
                    <div className="text-center font-mono text-brand-light-gray text-sm sm:text-base">
                      ${formatPrice(goldData.price_gram_22k * 1.015)}
                    </div>
                    <div className="flex items-center justify-center">
                      <span className={`flex items-center gap-1 text-sm sm:text-base font-semibold ${
                        goldData.chp >= 0 ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {goldData.chp >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        {formatPercentage(goldData.chp)}
                      </span>
                    </div>
                  </div>

                  {/* 18 AYAR */}
                  <div className="grid grid-cols-4 gap-4 p-4 hover:bg-brand-medium-gray/10 transition-colors">
                    <div>
                      <div className="font-semibold text-brand-light-gray text-sm sm:text-base">18 AYAR</div>
                      <div className="text-xs text-brand-medium-gray">GRAM</div>
                    </div>
                    <div className="text-center font-mono text-brand-light-gray text-sm sm:text-base">
                      ${formatPrice(goldData.price_gram_18k)}
                    </div>
                    <div className="text-center font-mono text-brand-light-gray text-sm sm:text-base">
                      ${formatPrice(goldData.price_gram_18k * 1.015)}
                    </div>
                    <div className="flex items-center justify-center">
                      <span className={`flex items-center gap-1 text-sm sm:text-base font-semibold ${
                        goldData.chp >= 0 ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {goldData.chp >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        {formatPercentage(goldData.chp)}
                      </span>
                    </div>
                  </div>

                  {/* 14 AYAR */}
                  <div className="grid grid-cols-4 gap-4 p-4 hover:bg-brand-medium-gray/10 transition-colors">
                    <div>
                      <div className="font-semibold text-brand-light-gray text-sm sm:text-base">14 AYAR</div>
                      <div className="text-xs text-brand-medium-gray">GRAM</div>
                    </div>
                    <div className="text-center font-mono text-brand-light-gray text-sm sm:text-base">
                      ${formatPrice(goldData.price_gram_14k)}
                    </div>
                    <div className="text-center font-mono text-brand-light-gray text-sm sm:text-base">
                      ${formatPrice(goldData.price_gram_14k * 1.015)}
                    </div>
                    <div className="flex items-center justify-center">
                      <span className={`flex items-center gap-1 text-sm sm:text-base font-semibold ${
                        goldData.chp >= 0 ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {goldData.chp >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        {formatPercentage(goldData.chp)}
                      </span>
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </motion.div>

        {/* Altın Çevirici */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-brand-dark-gray border border-brand-medium-gray p-6"
        >
          <h3 className="text-lg sm:text-xl font-serif text-brand-gold mb-4">
            ALTIN ÇEVİRİCİ
            <span className="block text-xs text-brand-medium-gray mt-1">(Bilgi içindir)</span>
          </h3>
          <div className="grid sm:grid-cols-3 gap-4">
            <input
              type="number"
              defaultValue={1}
              min="0"
              step="0.01"
              className="text-sm sm:text-md lg:text-lg xl:text-xl bg-brand-black border border-brand-gold/30 text-brand-light-gray px-4 py-3 rounded focus:outline-none focus:border-brand-gold text-center"
              placeholder="Miktar"
            />
            <select className="text-sm sm:text-md lg:text-lg xl:text-xl bg-brand-black border border-brand-gold/30 text-brand-light-gray px-4 py-3 rounded focus:outline-none focus:border-brand-gold">
              <option>GRAM</option>
              <option>ONS</option>
              <option>KG</option>
            </select>
            <select className="text-sm sm:text-md lg:text-lg xl:text-xl bg-brand-black border border-brand-gold/30 text-brand-light-gray px-4 py-3 rounded focus:outline-none focus:border-brand-gold">
              <option>GRAM ALTIN</option>
              <option>22 AYAR</option>
              <option>18 AYAR</option>
              <option>14 AYAR</option>
            </select>
          </div>
          
          {/* Sonuç Alanı */}
          {goldData && (
            <div className="mt-4 p-4 bg-brand-gold/10 border border-brand-gold/30 rounded">
              <div className="text-center">
                <div className="text-sm sm:text-md lg:text-lg xl:text-xl text-brand-medium-gray mb-1">Alış Fiyatı</div>
                <div className="text-sm sm:text-md lg:text-lg xl:text-xl font-bold text-brand-gold">
                  ${formatPrice(goldData.price_gram_24k)} USD
                </div>
              </div>
              <div className="text-center mt-3">
                <div className="text-sm sm:text-md lg:text-lg xl:text-xl text-brand-medium-gray mb-1">Satış Fiyatı</div>
                <div className="text-sm sm:text-md lg:text-lg xl:text-xl font-bold text-brand-gold">
                  ${formatPrice(goldData.price_gram_24k * 1.015)} USD
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Bilgi Notu */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 bg-brand-gold/10 border border-brand-gold/30 p-4 rounded"
        >
          <p className="text-xs text-brand-medium-gray leading-relaxed">
            <span className="font-semibold text-brand-gold">Not:</span> Bu sayfadaki fiyatlar anlık piyasa verilerine dayanmaktadır. 
            Gerçek alış-satış fiyatları için mağazamızı ziyaret edebilir veya bizimle iletişime geçebilirsiniz.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

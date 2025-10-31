'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { doc, getDoc, Timestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface Product {
  id: string
  name: string
  description: string
  price: string
  image: string
  image2?: string
  category: string
  createdAt?: Timestamp
  renk?: string
  gram?: string
  ayar?: string
  sira?: string
}

interface GoldPrices {
  gramAltin: {
    buying: number
    selling: number
    change: number
  }
}

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImage, setLightboxImage] = useState('')
  const [showPrice, setShowPrice] = useState(false)
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null)
  const [goldPrices, setGoldPrices] = useState<GoldPrices | null>(null)
  const [priceLoading, setPriceLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const openLightbox = (image: string) => {
    setLightboxImage(image)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  const calculatePrice = async () => {
    if (!product?.gram || !product?.ayar) {
      setErrorMessage('Gram veya ayar bilgisi eksik!')
      return
    }

    setPriceLoading(true)
    setErrorMessage(null)
    
    try {
      // Altın fiyatlarını çek
      const response = await fetch('/api/gold-prices')
      if (!response.ok) {
        throw new Error('Altın fiyatları alınamadı')
      }
      
      const prices: GoldPrices = await response.json()
      setGoldPrices(prices)
      
      const hasFiyati = prices.gramAltin.selling // Has fiyatı (satış fiyatı)
      const gram = parseFloat(product.gram)
      const ayar = product.ayar
      
      let carpan = 0
      
      // Ayara göre çarpan belirleme - Admin'den "22K", "14K", "8K" geliyor
      if (ayar === '22K' || ayar === '22') {
        carpan = 1100
      } else if (ayar === '14K' || ayar === '14') {
        carpan = 835
      } else if (ayar === '8K' || ayar === '8') {
        carpan = 583
      } else {
        setErrorMessage(`Geçersiz ayar değeri: ${ayar}. Lütfen 8K, 14K veya 22K seçiniz.`)
        setPriceLoading(false)
        return
      }
      
      // Fiyat hesaplama: (gram * carpan) / hasFiyati
      const hesaplananFiyat = (gram * carpan) / hasFiyati
      
      setCalculatedPrice(hesaplananFiyat)
      setShowPrice(true)
    } catch (error) {
      console.error('Fiyat hesaplama hatası:', error)
      setErrorMessage('Fiyat hesaplanırken bir hata oluştu! Lütfen daha sonra tekrar deneyiniz.')
    } finally {
      setPriceLoading(false)
    }
  }

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productDoc = await getDoc(doc(db, 'set', params.id as string))
        if (productDoc.exists()) {
          const productData = { id: productDoc.id, ...productDoc.data() } as Product
          setProduct(productData)
        } else {
          router.push('/urunler/set')
        }
      } catch {
        router.push('/urunler/set')
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchProduct()
    }
  }, [params.id, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-black flex items-center justify-center">
        <div className="text-brand-gold text-base sm:text-lg lg:text-xl xl:text-2xl">Yükleniyor...</div>
      </div>
    )
  }

  if (!product) {
    return null
  }

  const images = [product.image, product.image2].filter(Boolean) as string[]

  return (
    <div className="min-h-screen bg-brand-black pt-8 pt-12 lg:pt-30">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 80 }}
            className="space-y-3 sm:space-y-4"
          >
            <div className={`grid ${images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'} gap-3 sm:gap-4`}>
              {images.map((image, index) => (
                <motion.button
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ delay: index * 0.2, duration: 0.5 }}
                    onClick={() => openLightbox(image)}
                    className="relative h-[250px] sm:h-[350px] md:h-[400px] lg:h-[500px] xl:h-[600px] bg-brand-dark-gray ring-1 ring-brand-gold overflow-hidden group cursor-zoom-in"
                  >
                  <Image
                    src={image}
                    alt={`${product.name} - ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 80 }}
            className="space-y-4 sm:space-y-6"
          >
            <div>
              <h1 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-semibold text-brand-gold mb-2 sm:mb-3">
                {product.name}
              </h1>
              <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-brand-dark-gray ring-1 ring-brand-gold">
                <span className="text-brand-light-gray text-xs sm:text-sm lg:text-md xl:text-lg">Kategori: </span>
                <span className="text-brand-gold font-semibold capitalize text-xs sm:text-sm lg:text-md xl:text-lg">{product.category}</span>
              </div>
            </div>

            <div className="border-t border-brand-gold/30 pt-4 sm:pt-6">
              <h2 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-semibold text-brand-gold mb-2 sm:mb-3">Ürün Bilgileri</h2>
              <div className="bg-brand-dark-gray ring-1 ring-brand-gold overflow-hidden overflow-x-auto">
                <table className="w-full text-xs sm:text-sm lg:text-md xl:text-lg">
                  <thead>
                    <tr className="border-b border-brand-gold/30">
                      <th className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 text-left text-brand-light-gray font-semibold">Ürün</th>
                      <th className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 text-left text-brand-light-gray font-semibold">Renk</th>
                      <th className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 text-left text-brand-light-gray font-semibold">Gram</th>
                      <th className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 text-left text-brand-light-gray font-semibold">Ayar</th>
                      <th className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 text-left text-brand-light-gray font-semibold">Sıra</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 text-brand-gold">{product.category}</td>
                      <td className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 text-brand-light-gray">{product.renk || '-'}</td>
                      <td className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 text-brand-light-gray">{product.gram ? `${product.gram}GR` : '-'}</td>
                      <td className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 text-brand-light-gray">{product.ayar || '-'}</td>
                      <td className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 text-brand-light-gray">{product.sira || '-'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="border-t border-brand-gold/30 pt-4 sm:pt-6">
              <h2 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-semibold text-brand-gold mb-2 sm:mb-3">Fiyat</h2>
              <button
                onClick={calculatePrice}
                disabled={priceLoading}
                className="w-full btn-primary text-brand-black py-3 sm:py-4 px-4 sm:px-6 text-sm sm:text-base lg:text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {priceLoading ? 'Hesaplanıyor...' : 'Fiyat Hesapla'}
              </button>

              {showPrice && (
                <div className="mt-4 bg-brand-dark-gray ring-1 ring-brand-gold overflow-hidden">
                  <div className="px-4 sm:px-6 py-4 sm:py-6">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-brand-light-gray text-sm sm:text-base lg:text-lg">Hesaplanan Fiyat:</span>
                      <span className="text-brand-gold font-bold text-lg sm:text-xl lg:text-2xl">
                        {calculatedPrice !== null ? `${calculatedPrice.toFixed(2)} TL` : '-'}
                      </span>
                    </div>
                    {goldPrices && (
                      <div className="pt-3 border-t border-brand-gold/30">
                        <p className="text-xs sm:text-sm text-brand-light-gray">
                          Has Altın Fiyatı: <span className="text-brand-gold font-semibold">{goldPrices.gramAltin.selling.toFixed(2)} TL</span>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {product.description && (
              <div className="border-t border-brand-gold/30 pt-4 sm:pt-6">
                <h2 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-semibold text-brand-gold mb-2 sm:mb-3">Açıklama</h2>
                <p className="text-brand-light-gray leading-relaxed text-xs sm:text-sm lg:text-base xl:text-lg">
                  {product.description}
                </p>
              </div>
            )}

            <div className="border-t border-brand-gold/30 pt-4 sm:pt-6">
              <a
                href="https://wa.me/905XXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full btn-primary text-brand-black py-3 sm:py-4 px-4 sm:px-6 text-sm sm:text-base lg:text-lg"
              >
                İletişime Geç
              </a>
              <p className="text-brand-light-gray text-xs sm:text-sm lg:text-md xl:text-lg text-center mt-2 sm:mt-3">
                Fiyat bilgisi ve detaylar için bizimle iletişime geçin
              </p>
            </div>
          </motion.div>
        </div>

        {lightboxOpen && (
          <div 
            className="fixed inset-0 bg-brand-black/40 z-50 flex items-center justify-center p-3 sm:p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-3 sm:top-4 right-3 sm:right-4 text-brand-gold hover:text-brand-light-gray transition-colors z-10"
            >
              <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="relative w-[90vw] h-[90vh]">
              <Image
                src={lightboxImage}
                alt={product.name}
                fill
                className="object-contain ring-2 ring-brand-gold"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        )}

        {errorMessage && (
          <div 
            className="fixed inset-0 bg-brand-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setErrorMessage(null)}
          >
            <div 
              className="bg-brand-dark-gray ring-2 ring-brand-gold max-w-md w-full p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setErrorMessage(null)}
                className="absolute top-3 right-3 text-brand-gold hover:text-brand-light-gray transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="text-center">
                <div className="mb-4">
                  <svg className="w-16 h-16 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-brand-gold mb-3">Hata</h3>
                <p className="text-brand-light-gray text-sm sm:text-base mb-6">
                  {errorMessage}
                </p>
                <button
                  onClick={() => setErrorMessage(null)}
                  className="btn-primary text-brand-black py-2 px-6 text-sm sm:text-base"
                >
                  Tamam
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

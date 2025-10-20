'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import Image from 'next/image'

interface Product {
  id: string
  name: string
  description: string
  price: string
  image: string
  image2?: string
  category: string
  createdAt: any
}

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productDoc = await getDoc(doc(db, 'yuzuk', params.id as string))
        if (productDoc.exists()) {
          const productData = { id: productDoc.id, ...productDoc.data() } as Product
          setProduct(productData)
        } else {
          router.push('/urunler/yuzuk')
        }
      } catch (error) {
        router.push('/urunler/yuzuk')
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
        <div className="text-brand-gold text-xl">Yükleniyor...</div>
      </div>
    )
  }

  if (!product) {
    return null
  }

  const images = [product.image, product.image2].filter(Boolean) as string[]

  return (
    <div className="min-h-screen bg-brand-black pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Geri Butonu */}
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-brand-gold hover:text-brand-light-gray transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Geri Dön
        </button>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Ürün Görselleri */}
          <div className="space-y-4">
            <div className="relative h-[400px] md:h-[500px] lg:h-[600px] bg-brand-dark-gray ring-1 ring-brand-gold overflow-hidden">
              <img
                src={images[currentImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {images.length > 1 && (
              <div className="grid grid-cols-2 gap-4">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`relative h-32 bg-brand-dark-gray overflow-hidden transition-all ${
                      currentImage === index
                        ? 'ring-2 ring-brand-gold'
                        : 'ring-1 ring-brand-gold/30 hover:ring-brand-gold/60'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} - ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Ürün Bilgileri */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-brand-gold mb-4">
                {product.name}
              </h1>
              <div className="inline-block px-4 py-2 bg-brand-dark-gray ring-1 ring-brand-gold">
                <span className="text-brand-light-gray">Kategori: </span>
                <span className="text-brand-gold font-semibold capitalize">{product.category}</span>
              </div>
            </div>

            {product.description && (
              <div className="border-t border-brand-gold/30 pt-6">
                <h2 className="text-xl font-semibold text-brand-gold mb-3">Açıklama</h2>
                <p className="text-brand-light-gray leading-relaxed text-lg">
                  {product.description}
                </p>
              </div>
            )}

            <div className="border-t border-brand-gold/30 pt-6">
              <p className="text-brand-light-gray text-sm mb-2">Fiyat</p>
              <p className="text-4xl md:text-5xl font-bold text-brand-gold">
                {product.price}
              </p>
            </div>

            {/* İletişim Butonu */}
            <div className="border-t border-brand-gold/30 pt-6">
              <a
                href="https://wa.me/905XXXXXXXXX" // WhatsApp numaranızı buraya ekleyin
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-brand-gold text-brand-black text-center py-4 px-6 font-bold text-lg hover:bg-brand-light-gray transition-colors"
              >
                İletişime Geç
              </a>
              <p className="text-brand-light-gray text-sm text-center mt-3">
                Fiyat bilgisi ve detaylar için bizimle iletişime geçin
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

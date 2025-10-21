'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { doc, getDoc, Timestamp } from 'firebase/firestore'
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
  createdAt?: Timestamp
  renk?: string
  gram?: string
  ayar?: string
  sira?: string
}

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImage, setLightboxImage] = useState('')

  const openLightbox = (image: string) => {
    setLightboxImage(image)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productDoc = await getDoc(doc(db, 'kolye', params.id as string))
        if (productDoc.exists()) {
          const productData = { id: productDoc.id, ...productDoc.data() } as Product
          setProduct(productData)
        } else {
          router.push('/urunler/kolye')
        }
      } catch {
        router.push('/urunler/kolye')
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
          <div className="space-y-3 sm:space-y-4">
            <div className={`grid ${images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'} gap-3 sm:gap-4`}>
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => openLightbox(image)}
                  className="relative h-[250px] sm:h-[350px] md:h-[400px] lg:h-[500px] xl:h-[600px] bg-brand-dark-gray ring-1 ring-brand-gold overflow-hidden group cursor-zoom-in"
                >
                  <Image
                    src={image}
                    alt={`${product.name} - ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  </button>
              ))}
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6">
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
              <h2 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-semibold text-brand-gold mb-2 sm:mb-3">Fiyat</h2>
              <div className="bg-brand-dark-gray ring-1 ring-brand-gold overflow-hidden overflow-x-auto">
                <table className="w-full text-xs sm:text-sm lg:text-md xl:text-lg">
                  <thead>
                    <tr className="border-b border-brand-gold/30">
                      <th className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 text-left text-brand-light-gray font-semibold">Ürün</th>
                      <th className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 text-left text-brand-light-gray font-semibold">Renk</th>
                      <th className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 text-left text-brand-light-gray font-semibold">Gram</th>
                      <th className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 text-left text-brand-light-gray font-semibold">Ayar</th>
                      <th className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 text-left text-brand-light-gray font-semibold">Sıra</th>
                      <th className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 text-right text-brand-light-gray font-semibold">Fiyat</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 text-brand-gold">{product.category}</td>
                      <td className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 text-brand-light-gray">{product.renk || '-'}</td>
                      <td className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 text-brand-light-gray">{product.gram ? `${product.gram}GR` : '-'}</td>
                      <td className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 text-brand-light-gray">{product.ayar || '-'}</td>
                      <td className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 text-brand-light-gray">{product.sira || '-'}</td>
                      <td className="px-2 sm:px-3 lg:px-4 py-2 sm:py-3 text-right text-brand-gold font-bold">{product.price}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
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
          </div>
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
      </div>
    </div>
  )
}

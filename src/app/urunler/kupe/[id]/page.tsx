'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

interface Product {
  id: string
  name: string
  description: string
  price: string
  image: string
  image2?: string
  category: string
  createdAt: any
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
        const productDoc = await getDoc(doc(db, 'kupe', params.id as string))
        if (productDoc.exists()) {
          const productData = { id: productDoc.id, ...productDoc.data() } as Product
          setProduct(productData)
        } else {
          router.push('/urunler/kupe')
        }
      } catch (error) {
        router.push('/urunler/kupe')
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
    <div className="min-h-screen bg-brand-black pt-12 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-4">
            <div className={`grid ${images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'} gap-4`}>
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => openLightbox(image)}
                  className="relative h-[400px] md:h-[500px] lg:h-[600px] bg-brand-dark-gray ring-1 ring-brand-gold overflow-hidden group cursor-zoom-in"
                >
                  <img
                    src={image}
                    alt={`${product.name} - ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  </button>
              ))}
            </div>
          </div>

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

            <div className="border-t border-brand-gold/30 pt-6">
              <h2 className="text-xl font-semibold text-brand-gold mb-4">Fiyat</h2>
              <div className="bg-brand-dark-gray ring-1 ring-brand-gold overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-brand-gold/30">
                      <th className="px-4 py-3 text-left text-brand-light-gray font-semibold">Ürün</th>
                      <th className="px-4 py-3 text-left text-brand-light-gray font-semibold">Renk</th>
                      <th className="px-4 py-3 text-left text-brand-light-gray font-semibold">Gram</th>
                      <th className="px-4 py-3 text-left text-brand-light-gray font-semibold">Ayar</th>
                      <th className="px-4 py-3 text-left text-brand-light-gray font-semibold">Sıra</th>
                      <th className="px-4 py-3 text-right text-brand-light-gray font-semibold">Fiyat</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-3 text-brand-gold">{product.category}</td>
                      <td className="px-4 py-3 text-brand-light-gray">{product.renk || '-'}</td>
                      <td className="px-4 py-3 text-brand-light-gray">{product.gram ? `${product.gram}GR` : '-'}</td>
                      <td className="px-4 py-3 text-brand-light-gray">{product.ayar || '-'}</td>
                      <td className="px-4 py-3 text-brand-light-gray">{product.sira || '-'}</td>
                      <td className="px-4 py-3 text-right text-brand-gold font-bold text-lg">{product.price}</td>
                    </tr>
                  </tbody>
                </table>
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
              <a
                href="https://wa.me/905XXXXXXXXX"
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

        {lightboxOpen && (
          <div 
            className="fixed inset-0 bg-brand-black/95 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-brand-gold hover:text-brand-light-gray transition-colors z-10"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={lightboxImage}
              alt={product.name}
              className="max-h-[90vh] max-w-[90vw] object-contain ring-2 ring-brand-gold"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </div>
    </div>
  )
}

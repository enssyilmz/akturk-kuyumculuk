'use client'
import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import Link from 'next/link'

type SortOption = 'recommended' | 'name-asc' | 'name-desc';

interface Product {
  id: string
  name: string
  price: number
  image: string
  image2?: string
  description?: string
  category: string
}

export default function Page() {
  const [products, setProducts] = useState<Product[]>([])
  const [sortedProducts, setSortedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState<SortOption>('recommended')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'kupe'))
        const productsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Product[]
        setProducts(productsData)
        setSortedProducts(productsData)
      } catch (error) {
        console.error('Ürünler yüklenirken hata:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    let sorted = [...products];
    
    switch (sortBy) {
      case 'name-asc':
        sorted.sort((a, b) => a.name.localeCompare(b.name, 'tr'));
        break;
      case 'name-desc':
        sorted.sort((a, b) => b.name.localeCompare(a.name, 'tr'));
        break;
      case 'recommended':
      default:
        sorted = products;
        break;
    }
    
    setSortedProducts(sorted);
  }, [sortBy, products]);

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-black flex items-center justify-center">
        <div className="text-brand-gold text-xl">Yükleniyor...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-black">
      <div className="container mx-auto px-4 pt-4 pb-12">
        <h1 className="text-4xl font-bold text-brand-gold text-center">KÜPE</h1>
        <div className="flex items-center justify-end mb-8">          
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-brand-light-gray">Sırala:</label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-brand-dark-gray text-brand-light-gray border border-brand-gold px-4 py-2 focus:outline-none"
            >
              <option value="recommended">Önerilen</option>
              <option value="name-asc">İsme Göre (A-Z)</option>
              <option value="name-desc">İsme Göre (Z-A)</option>
            </select>
          </div>
        </div>

        {sortedProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-brand-light-gray text-lg">Henüz ürün bulunmamaktadır.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-8">
            {sortedProducts.map((product) => (
              <Link 
                key={product.id}
                href={`/urunler/kupe/${product.id}`}
                className="bg-brand-dark-gray overflow-hidden ring-1 ring-brand-gold cursor-pointer group transition-shadow duration-300 hover:shadow-lg hover:shadow-brand-light-gray/50"
              >
                <div className="relative h-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                  />
                  {product.image2 && (
                    <img
                      src={product.image2}
                      alt={`${product.name} - 2`}
                      className="w-full h-full object-cover absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-brand-gold text-center">
                    {product.name}
                  </h3>
                  {product.description && (
                    <p className="text-brand-light-gray text-center">
                      {product.description}
                    </p>
                  )}
                  <p className="text-2xl font-bold text-brand-gold">
                    {product.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

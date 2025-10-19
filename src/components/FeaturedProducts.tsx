'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, query, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  image: string;
  category?: string;
  description?: string;
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const productsRef = collection(db, 'products');
      const q = query(productsRef, limit(12));
      const querySnapshot = await getDocs(q);

      const productsData: Product[] = [];
      querySnapshot.forEach((doc) => {
        productsData.push({
          id: doc.id,
          ...doc.data(),
        } as Product);
      });

      setProducts(productsData);
      setError(null);
    } catch (err) {
      console.error('Ürünler yüklenirken hata:', err);
      setError('Ürünler yüklenemedi');
      
      // Fallback: Örnek ürünler
      setProducts([
        {
          id: '1',
          name: 'Altın Harf Yüzük',
          description: 'Zarif ve şık tasarım',
          image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop',
        },
        {
          id: '2',
          name: 'Altın Set Melodi',
          description: 'Özel koleksiyon',
          image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop',
        },
        {
          id: '3',
          name: 'Altın Küpe 3 Sıra Katlamalı',
          description: 'Modern ve zarif',
          image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop',
        },
        {
          id: '4',
          name: 'Altın Su Yolu Set',
          description: 'Özel tasarım koleksiyon',
          image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop',
        },
        {
          id: '5',
          name: 'Pırlanta Kolye',
          description: 'Lüks ve gösterişli',
          image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop',
        },
        {
          id: '6',
          name: 'Altın Bileklik',
          description: 'Klasik tasarım',
          image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop',
        },
        {
          id: '7',
          name: 'Zarif Yüzük',
          description: 'Şık ve ince detaylar',
          image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop',
        },
        {
          id: '8',
          name: 'Altın Küpe Set',
          description: 'Günlük kullanım için ideal',
          image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop',
        },
        {
          id: '9',
          name: 'Modern Kolye',
          description: 'Çağdaş tasarım',
          image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop',
        },
        {
          id: '10',
          name: 'Klasik Bilezik',
          description: 'Zamansız zarafet',
          image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop',
        },
        {
          id: '11',
          name: 'Şık Yüzük',
          description: 'Özel günler için',
          image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop',
        },
        {
          id: '12',
          name: 'Zarif Küpe',
          description: 'Minimalist tasarım',
          image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-16 bg-brand-dark-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif text-brand-light-gray">
              Senin Yaşayan Efsanen
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="bg-brand-black rounded-lg shadow-sm animate-pulse">
                <div className="aspect-square bg-brand-medium-gray"></div>
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-brand-dark-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Başlık */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif text-brand-light-gray mb-2">
            Senin Yaşayan Efsanen
          </h2>
          <div className="w-24 h-1 bg-brand-gold mx-auto"></div>
        </div>

        {/* Ürün Kartları Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/urun/${product.id}`}
              className="group bg-brand-black rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-brand-medium-gray hover:border-brand-gold"
            >
              {/* Ürün Görseli */}
              <div className="relative aspect-square overflow-hidden bg-brand-medium-gray">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
              </div>

              {/* Ürün Bilgileri */}
              <div className="p-4">
                <h3 className="text-sm font-semibold text-brand-light-gray mb-2 line-clamp-2 group-hover:text-brand-gold transition-colors">
                  {product.name}
                </h3>

                {/* Açıklama */}
                {product.description && (
                  <p className="text-xs text-brand-medium-gray line-clamp-2">
                    {product.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>

        {error && (
          <div className="mt-6 text-center text-sm text-brand-medium-gray">
            * Örnek ürünler gösteriliyor
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  image: string;
  category: string;
  description?: string;
}

export default function BilezikPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, 'bilezik'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];
        setProducts(productsData);
      } catch (error) {
        console.error('Ürünler yüklenirken hata:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-dark-gray flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-brand-gold mx-auto"></div>
          <p className="mt-4 text-brand-light-gray font-medium">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-dark-gray py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Başlık */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-brand-light-gray mb-4">
            Bilezik Koleksiyonu
          </h1>
          <div className="w-32 h-1 bg-brand-gold mx-auto rounded-full"></div>
        </div>

        {/* Ürün Grid */}
        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-brand-medium-gray text-xl">
              Bu kategoride henüz ürün bulunmamaktadır.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-brand-black rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-brand-medium-gray hover:border-brand-gold group"
              >
                {/* Ürün Görseli */}
                <div className="relative h-64 bg-white overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Ürün Bilgileri */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-brand-light-gray mb-2 line-clamp-2 min-h-[56px]">
                    {product.name}
                  </h3>
                  {product.description && (
                    <p className="text-sm text-brand-medium-gray line-clamp-3">
                      {product.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

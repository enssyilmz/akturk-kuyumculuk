'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  image: string;
  image2?: string;
  category: string;
  collectionName: string;
  description?: string;
}

// Kategori koleksiyonları (module scope - stable reference)
const CATEGORY_COLLECTIONS = [
  { name: 'yuzuk', label: 'Yüzük' },
  { name: 'bileklik', label: 'Bileklik' },
  { name: 'bilezik', label: 'Bilezik' },
  { name: 'kolye', label: 'Kolye' },
  { name: 'kupe', label: 'Küpe' },
  { name: 'set', label: 'Set' },
];

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        const allProducts: Product[] = [];

        for (const col of CATEGORY_COLLECTIONS) {
          const querySnapshot = await getDocs(collection(db, col.name));
          querySnapshot.forEach((doc) => {
            allProducts.push({
              id: doc.id,
              collectionName: col.name,
              category: col.label,
              ...doc.data(),
            } as Product);
          });
        }

        const shuffled = allProducts.sort(() => Math.random() - 0.5);
        setProducts(shuffled);
      } catch (err) {
        console.error('Ürünler yüklenirken hata:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  if (loading) {
    return (
      <div className="py-16 bg-brand-black">
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
    <div className="py-16 bg-brand-black">
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
              href={`/urunler/${product.collectionName}/${product.id}`}
              className="group bg-brand-dark-gray overflow-hidden ring-1 ring-brand-gold cursor-pointer group transition-shadow duration-300 hover:shadow-lg hover:shadow-brand-light-gray/50"
            >
              {/* Ürün Görseli */}
                <div className="relative h-100 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-opacity duration-300 group-hover:opacity-0"
                  />
                  {product.image2 && (
                    <Image
                      src={product.image2}
                      alt={`${product.name} - 2`}
                      fill
                      className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />
                  )}
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
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import Link from 'next/link';
import Image from 'next/image';
import useAuth from '@/hooks/useAuth';
import { Pencil, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Product {
  id: string;
  name: string;
  image: string;
  category?: string;
  description?: string;
  collectionName?: string;
}

export default function AdminPage() {
  const { user, loading: authLoading } = useAuth(true);
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const collections = [
    { name: 'yuzuk', label: 'Yüzük' },
    { name: 'bileklik', label: 'Bileklik' },
    { name: 'bilezik', label: 'Bilezik' },
    { name: 'kolye', label: 'Kolye' },
    { name: 'kupe', label: 'Küpe' },
    { name: 'set', label: 'Set' },
  ];

  useEffect(() => {
    if (user) {
      fetchProducts();
    }
  }, [user]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const allProducts: Product[] = [];
      
      for (const col of collections) {
        const querySnapshot = await getDocs(collection(db, col.name));
        
        querySnapshot.forEach((doc) => {
          allProducts.push({
            id: doc.id,
            collectionName: col.name,
            ...doc.data(),
          } as Product);
        });
      }

      allProducts.sort((a: any, b: any) => {
        if (a.createdAt && b.createdAt) {
          return b.createdAt.seconds - a.createdAt.seconds;
        }
        return 0;
      });

      setProducts(allProducts);
    } catch (error) {
      console.error('Ürünler yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId: string, productName: string, collectionName?: string) => {
    if (!confirm(`"${productName}" ürününü silmek istediğinize emin misiniz?`)) {
      return;
    }

    try {
      setDeletingId(productId);
      const targetCollection = collectionName || 'products';
      await deleteDoc(doc(db, targetCollection, productId));
      setProducts(products.filter(p => p.id !== productId));
      alert('Ürün başarıyla silindi!');
    } catch (error) {
      console.error('Ürün silinirken hata:', error);
      alert('Ürün silinirken bir hata oluştu!');
    } finally {
      setDeletingId(null);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/giris');
    } catch (error) {
      console.error('Çıkış hatası:', error);
    }
  };

  if (authLoading || !user || loading) {
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
        {/* Başlık ve Butonlar */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-brand-light-gray">Admin Paneli</h1>
            <p className="text-brand-medium-gray mt-2">
              Hoş geldiniz, {user.email}
            </p>
          </div>
          <div className="flex gap-4">
            <Link
              href="/admin/urun-ekle"
              className="px-6 py-3 btn-primary"
            >
              + Yeni Ürün Ekle
            </Link>
            <button
              onClick={handleLogout}
              className="px-6 py-3 btn-warning"
            >
              Çıkış Yap
            </button>
          </div>
        </div>

        {/* İstatistik Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Toplam Ürün */}
          <div className="bg-brand-black border-2 border-brand-gold rounded-lg p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-brand-medium-gray text-sm font-medium mb-1">Toplam Ürün</p>
                <p className="text-4xl font-bold text-brand-gold">{products.length}</p>
              </div>
              <div className="bg-brand-gold bg-opacity-20 p-4 rounded-lg">
                <svg className="w-10 h-10 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            </div>
          </div>

          {/* Kategoriler */}
          <div className="bg-brand-black border-2 border-brand-medium-gray rounded-lg p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-brand-medium-gray text-sm font-medium mb-1">Kategori Sayısı</p>
                <p className="text-4xl font-bold text-brand-light-gray">{collections.length}</p>
              </div>
              <div className="bg-brand-medium-gray bg-opacity-20 p-4 rounded-lg">
                <svg className="w-10 h-10 text-brand-light-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Durum */}
          <div className="bg-brand-black border-2 border-green-500 rounded-lg p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-brand-medium-gray text-sm font-medium mb-1">Sistem Durumu</p>
                <p className="text-2xl font-bold text-green-500">Aktif</p>
              </div>
              <div className="bg-green-500 bg-opacity-20 p-4 rounded-lg">
                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Ürün Tablosu */}
        {products.length === 0 ? (
          <div className="bg-brand-black border-2 border-brand-gold rounded-lg shadow-2xl p-12 text-center">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-brand-gold mb-2">
              Henüz ürün eklenmemiş
            </h3>
            <p className="text-brand-light-gray mb-6">
              İlk ürününüzü ekleyerek başlayın
            </p>
            <Link
              href="/admin/urun-ekle"
              className="inline-block px-6 py-3 bg-brand-gold text-white rounded-lg hover:bg-brand-dark-gray transition-colors font-bold shadow-lg"
            >
              Ürün Ekle
            </Link>
          </div>
        ) : (
          <div className="bg-brand-black border-2 border-brand-medium-gray rounded-lg shadow-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-brand-black border-b-2 border-brand-gold">
                  <tr>
                    <th className="px-6 py-3 text-left text-md text-brand-gold uppercase tracking-wider">
                      Ürün
                    </th>
                    <th className="px-6 py-3 text-left text-md text-brand-gold uppercase tracking-wider">
                      Kategori
                    </th>
                    <th className="px-6 py-3 text-left text-md text-brand-gold uppercase tracking-wider">
                      Açıklama
                    </th>
                    <th className="px-6 py-3 text-right text-md text-brand-gold uppercase tracking-wider">
                      İşlemler
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-medium-gray">
                  {products.map((product) => (
                    <tr key={product.id} className="bg-white transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="relative h-16 w-16 flex-shrink-0 border-2 border-brand-gold rounded-lg overflow-hidden">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-brand-medium-gray">
                              {product.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium bg-brand-gold text-white rounded">
                          {product.category || 'Diğer'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-brand-medium-gray max-w-xs truncate">
                          {product.description || '-'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-3">
                          <Link
                            href={`/admin/urun-duzenle/${product.id}?collection=${product.collectionName}`}
                            className="text-brand-gold hover:text-brand-light-gray transition-colors"
                            title="Düzenle"
                          >
                            <Pencil className="w-5 h-5" />
                          </Link>
                          <button
                            onClick={() => handleDelete(product.id, product.name, product.collectionName)}
                            disabled={deletingId === product.id}
                            className="text-red-500 hover:text-red-400 transition-colors"
                            title="Sil"
                          >
                            {deletingId === product.id ? (
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-500"></div>
                            ) : (
                              <Trash2 className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

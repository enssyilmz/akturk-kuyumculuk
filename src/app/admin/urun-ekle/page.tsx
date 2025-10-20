'use client';

import { useState, useEffect } from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface ProductFormData {
  name: string;
  category: string;
  description?: string;
  price?: string;
  renk?: string;
  gram?: string;
  ayar?: string;
  sira?: string;
}

export default function AdminAddProduct() {
  const { user, loading: authLoading } = useAuth(true); // Authentication gerekli
  const router = useRouter();
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    category: 'yuzuk',
  });
  const [imageUrl, setImageUrl] = useState<string>('');
  const [imageUrl2, setImageUrl2] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const categories = [
    { label: 'Bileklik', value: 'bileklik', collection: 'bileklik' },
    { label: 'Yüzük', value: 'yuzuk', collection: 'yuzuk' },
    { label: 'Bilezik', value: 'bilezik', collection: 'bilezik' },
    { label: 'Kolye', value: 'kolye', collection: 'kolye' },
    { label: 'Küpe', value: 'kupe', collection: 'kupe' },
    { label: 'Set', value: 'set', collection: 'set' },
  ];

  const renkler = [
    { label: 'Yeşil', value: 'yesil', collection: 'yesil' },
    { label: 'Sarı', value: 'sari', collection: 'sari' },
    { label: 'Yeşil/Sarı', value: 'yesil_sari', collection: 'yesil_sari' },
  ];

  const ayarlar = [
    { label: '22K', value: '22K', collection: '22K' },
    { label: '18K', value: '18K', collection: '18K' },
    { label: '14K', value: '14K', collection: '14K' },
    { label: '8K', value: '8K', collection: '8K' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (result: any) => {
    setImageUrl(result.info.secure_url);
    setMessage({ type: 'success', text: 'İlk görsel başarıyla yüklendi!' });
  };

  const handleImageUpload2 = (result: any) => {
    setImageUrl2(result.info.secure_url);
    setMessage({ type: 'success', text: 'İkinci görsel başarıyla yüklendi!' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!imageUrl) {
      setMessage({ type: 'error', text: 'Lütfen birinci ürün görselini yükleyin!' });
      return;
    }

    if (!imageUrl2) {
      setMessage({ type: 'error', text: 'Lütfen ikinci ürün görselini yükleyin!' });
      return;
    }

    if (!formData.name) {
      setMessage({ type: 'error', text: 'Ürün adı zorunludur!' });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      // Kategoriye göre collection belirle
      const categoryObj = categories.find(cat => cat.value === formData.category);
      const collectionName = categoryObj?.collection || 'products';

      // Ürün verisini hazırla
      const productData: any = {
        name: formData.name,
        category: formData.category,
        image: imageUrl,
        image2: imageUrl2,
        price: formData.price || '',
        renk: formData.renk || '',
        gram: formData.gram || '',
        ayar: formData.ayar || '',
        sira: formData.sira || '',
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };

      // Açıklama varsa ekle
      if (formData.description && formData.description.trim() !== '') {
        productData.description = formData.description;
      }

      await addDoc(collection(db, collectionName), productData);
      
      setMessage({ type: 'success', text: 'Ürün başarıyla eklendi!' });
      
      // 2 saniye sonra admin sayfasına yönlendir
      setTimeout(() => {
        router.push('/admin');
      }, 2000);
    } catch (error) {
      console.error('Ürün eklenirken hata:', error);
      setMessage({ type: 'error', text: 'Ürün eklenirken bir hata oluştu!' });
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || !user) {
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mesajlar */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg shadow-lg ${
              message.type === 'success'
                ? 'bg-green-900 text-green-300 border-2 border-green-600'
                : 'bg-red-900 text-red-300 border-2 border-red-600'
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white border-t-4 border-brand-gold rounded-lg shadow-2xl p-8 space-y-6">
          {/* Görseller - Yan Yana */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Görsel 1 */}
            <div>
              <label className="text-lg font-bold text-brand-black mb-4">
                1. Ürün Görseli (Ana Görsel) *
              </label>
              <div className="flex flex-col items-start space-y-3">
                <CldUploadWidget
                  uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                  onSuccess={handleImageUpload}
                >
                  {({ open }) => (
                    <button
                      type="button"
                      onClick={() => open()}
                      className="px-6 py-3 btn-primary w-full"
                    >
                      1. Görseli Yükle
                    </button>
                  )}
                </CldUploadWidget>
                
                {imageUrl && (
                  <div className="relative w-full">
                    <img
                      src={imageUrl}
                      alt="Preview 1"
                      className="w-full h-48 object-cover rounded-lg border-4 border-brand-gold shadow-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setImageUrl('')}
                      className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center hover:bg-red-700 shadow-lg font-bold"
                    >
                      ×
                    </button>
                  </div>
                )}
                {imageUrl && (
                  <p className="text-sm text-green-600 font-medium">✓ 1. Görsel yüklendi</p>
                )}
              </div>
            </div>

            {/* Görsel 2 */}
            <div>
              <label className="text-lg font-bold text-brand-black mb-4">
                2. Ürün Görseli (Hover Görseli) *
              </label>
              <div className="flex flex-col items-start space-y-3">
                <CldUploadWidget
                  uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                  onSuccess={handleImageUpload2}
                >
                  {({ open }) => (
                    <button
                      type="button"
                      onClick={() => open()}
                      className="px-6 py-3 btn-primary w-full"
                    >
                      2. Görseli Yükle
                    </button>
                  )}
                </CldUploadWidget>
                
                {imageUrl2 && (
                  <div className="relative w-full">
                    <img
                      src={imageUrl2}
                      alt="Preview 2"
                      className="w-full h-48 object-cover rounded-lg border-4 border-brand-gold shadow-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setImageUrl2('')}
                      className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center hover:bg-red-700 shadow-lg font-bold"
                    >
                      ×
                    </button>
                  </div>
                )}
                {imageUrl2 && (
                  <p className="text-sm text-green-600 font-medium">✓ 2. Görsel yüklendi</p>
                )}
              </div>
            </div>
          </div>

          {/* Grid İki Sütun */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Ürün Adı */}
            <div className="md:col-span-2">
              <label className="text-lg font-bold text-brand-black mb-4">
                Ürün Adı *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 text-black border-2 border-brand-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-brand-gold"
                placeholder="Örn: Altın Harf Yüzük"
                required
              />
            </div>

            {/* Kategori */}
            <div className="md:col-span-2">
              <label className="text-lg font-bold text-brand-black mb-4">
                Kategori *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 text-black border-2 border-brand-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-brand-gold"
                required
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Açıklama */}
          <div>
            <label className="text-lg font-bold text-brand-black mb-4">
              Ürün Açıklaması
            </label>
            <textarea
              name="description"
              value={formData.description || ''}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-2 text-black border-2 border-brand-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-brand-gold"
              placeholder="Ürün hakkında detaylı açıklama..."
            />
          </div>
          {/* Fiyat Tablosu Bilgileri */}
            <h3 className="text-lg font-bold text-brand-black mb-4">Fiyat Tablo Bilgileri</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Renk */}
              <div>
                <label className="block text-sm font-semibold text-brand-black mb-2">
                  Renk
                </label>
                <select
                  name="renk"
                  value={formData.renk || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 text-black border-2 border-brand-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-brand-gold"
                >
                  <option value="">Renk Seçin</option>
                  {renkler.map((renk) => (
                    <option key={renk.value} value={renk.label}>
                      {renk.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Gram */}
              <div>
                <label className="block text-sm font-semibold text-brand-black mb-2">
                  Gram (Sadece Sayı)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    name="gram"
                    value={formData.gram || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 pr-12 text-black border-2 border-brand-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-brand-gold"
                    placeholder="Örn: 560"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-medium-gray font-semibold">
                    GR
                  </span>
                </div>
              </div>

              {/* Ayar */}
              <div>
                <label className="block text-sm font-semibold text-brand-black mb-2">
                  Ayar
                </label>
                <select
                  name="ayar"
                  value={formData.ayar || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 text-black border-2 border-brand-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-brand-gold"
                >
                  <option value="">Ayar Seçin</option>
                  {ayarlar.map((ayar) => (
                    <option key={ayar.value} value={ayar.label}>
                      {ayar.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sıra */}
              <div>
                <label className="block text-sm font-semibold text-brand-black mb-2">
                  Sıra
                </label>
                <input
                  type="text"
                  name="sira"
                  value={formData.sira || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 text-black border-2 border-brand-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-brand-gold"
                  placeholder="Örn: 14K"
                />
              </div>

              {/* Fiyat */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-brand-black mb-2">
                  Fiyat
                </label>
                <input
                  type="text"
                  name="price"
                  value={formData.price || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 text-black border-2 border-brand-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-brand-gold"
                  placeholder="Örn: 3.041.702 TL"
                />
              </div>
            </div>
            {/* Submit Butonu */}
          <div className="flex justify-end space-x-4 pt-4">
            <Link
              href="/admin"
              className="px-6 py-3 btn-secondary "
            >
              İptal
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 btn-primary"
            >
              {loading ? 'Ekleniyor...' : 'Ürün Ekle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

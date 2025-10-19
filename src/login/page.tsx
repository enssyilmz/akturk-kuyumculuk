'use client';

import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  // Kullanıcı zaten giriş yapmışsa admin paneline yönlendir
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Kullanıcı giriş yapmış, admin paneline yönlendir
        router.push('/admin');
      } else {
        // Kullanıcı giriş yapmamış, login sayfasında kal
        setCheckingAuth(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Başarılı giriş - admin sayfasına yönlendir
      router.push('/admin');
    } catch (err: any) {
      console.error('Giriş hatası:', err);
      
      // Türkçe hata mesajları
      if (err.code === 'auth/invalid-email') {
        setError('Geçersiz e-posta adresi');
      } else if (err.code === 'auth/user-not-found') {
        setError('Kullanıcı bulunamadı');
      } else if (err.code === 'auth/wrong-password') {
        setError('Hatalı şifre');
      } else if (err.code === 'auth/invalid-credential') {
        setError('E-posta veya şifre hatalı');
      } else {
        setError('Giriş yapılırken bir hata oluştu');
      }
    } finally {
      setLoading(false);
    }
  };

  // Auth kontrolü yapılırken loading göster
  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-brand-lighter-gray flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-brand-gold mx-auto"></div>
          <p className="mt-4 text-brand-medium-gray font-medium">Kontrol ediliyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-lighter-gray flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo/Başlık */}
        <div className="text-center mb-12">
          <div className="inline-block">
            <h1 className="text-5xl font-serif text-brand-light-gray mb-3 tracking-wide">
              Admin Paneli
            </h1>
            <div className="h-1 bg-brand-light-gray rounded-full"></div>
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-10 border-t-4 border-brand-gold">
          <h2 className="text-3xl font-bold text-brand-black mb-8 text-center">
            Giriş Yap
          </h2>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
              <p className="text-red-800 text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-brand-dark-gray mb-2"
              >
                E-posta
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border-2 border-brand-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-all text-brand-black placeholder:text-brand-medium-gray bg-gray-50"
                placeholder="galipsafa@admin.com"
                required
                disabled={loading}
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-brand-dark-gray mb-2"
              >
                Şifre
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-brand-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-all text-brand-black placeholder:text-brand-medium-gray bg-gray-50"
                placeholder="••••••••"
                required
                disabled={loading}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-brand-gold text-white font-bold text-lg rounded-lg hover:bg-brand-dark-gray focus:outline-none focus:ring-4 focus:ring-brand-gold focus:ring-opacity-50 transition-all duration-300 disabled:bg-brand-medium-gray disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-6 w-6 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Giriş yapılıyor...
                </span>
              ) : (
                'Giriş Yap'
              )}
            </button>
          </form>

          {/* Ana Sayfaya Dön */}
          <div className="mt-8 text-center">
            <a
              href="/"
              className="text-sm text-brand-medium-gray hover:text-brand-gold transition-colors font-medium inline-flex items-center"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Ana Sayfaya Dön
            </a>
          </div>
        </div>

        {/* Bilgilendirme */}
        <div className="mt-8 text-center">
          <p className="text-sm text-brand-light-gray bg-brand-black rounded-lg py-3 px-4">
            Admin paneline erişim için yetkili hesap gereklidir
          </p>
        </div>
      </div>
    </div>
  );
}

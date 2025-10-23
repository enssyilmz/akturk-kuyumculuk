# 🏆 Aktürk Kuyumculuk - E-Ticaret Platformu

Modern ve kullanıcı dostu kuyumculuk e-ticaret platformu. Next.js 15, TypeScript, Firebase ve Framer Motion ile geliştirilmiştir.

## 📋 İçindekiler

- [Özellikler](#-özellikler)
- [Teknoloji Yığını](#-teknoloji-yığını)
- [Proje Yapısı](#-proje-yapısı)
- [Kurulum](#-kurulum)
- [Environment Variables](#-environment-variables)
- [Geliştirme](#-geliştirme)
- [Dağıtım](#-dağıtım)

## ✨ Özellikler

### 🎨 UI/UX
- Modern ve responsive tasarım (mobil, tablet, desktop)
- Framer Motion ile akıcı animasyonlar
- Scroll bazlı animasyonlar (viewport tracking)
- Karanlık tema (siyah-altın renk paleti)
- Interaktif hamburger menü
- Dinamik arama özelliği

### 💍 Ürün Yönetimi
- 6 farklı ürün kategorisi:
  - Bileklik
  - Bilezik
  - Kolye
  - Küpe
  - Set
  - Yüzük
- Ürün detay sayfaları
- Lightbox ile resim görüntüleme
- Ürün filtreleme ve sıralama
- Dinamik ürün ekleme/düzenleme

### 🔐 Admin Paneli
- Firebase Authentication ile güvenli giriş
- Ürün ekleme/düzenleme/silme
- Cloudinary entegrasyonu ile resim yükleme
- Gerçek zamanlı ürün yönetimi

### 💰 Altın Fiyatları
- Anlık altın fiyatları (Gold API entegrasyonu)
- 10 saniyede bir otomatik güncelleme
- Fiyat değişim göstergesi (yeşil/kırmızı)
- USD → TRY dönüşümü
- Altın çevirici hesaplama aracı

### 📍 Diğer Özellikler
- OpenStreetMap entegrasyonu (Leaflet.js)
- İletişim formu
- SSR optimizasyonu
- SEO dostu yapı

## 🛠 Teknoloji Yığını

### Frontend
- **Framework:** Next.js 15.5.6 (App Router)
- **Dil:** TypeScript 5.x
- **Stil:** Tailwind CSS 3.4.1
- **Animasyon:** Framer Motion 11.15.0
- **İkonlar:** Lucide React 0.468.0

### Backend & Database
- **Veritabanı:** Firebase Firestore
- **Kimlik Doğrulama:** Firebase Auth
- **Dosya Depolama:** Cloudinary
- **API:** Next.js API Routes

### Harita & Lokasyon
- **Harita:** React Leaflet 4.2.1
- **Leaflet Core:** 1.9.4

### Geliştirme Araçları
- **Linting:** ESLint 9.x
- **Kod Formatı:** Prettier (ESLint entegreli)
- **Tip Kontrolü:** TypeScript

## 📁 Proje Yapısı

```
akturk-kuyumculuk/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── admin/                    # Admin panel sayfaları
│   │   │   ├── page.tsx             # Admin dashboard
│   │   │   ├── urun-ekle/           # Ürün ekleme
│   │   │   └── urun-duzenle/[id]/   # Ürün düzenleme
│   │   ├── altin-fiyatlari/         # Altın fiyatları sayfası
│   │   ├── api/                      # API Routes
│   │   │   └── gold-prices/         # Altın fiyatları API
│   │   ├── giris/                    # Giriş sayfası
│   │   ├── neden-akturk-kuyumculuk/ # Hakkımızda sayfası
│   │   ├── uretim/                   # Üretim süreci sayfası
│   │   ├── urunler/                  # Ürün sayfaları
│   │   │   ├── bileklik/
│   │   │   ├── bilezik/
│   │   │   ├── kolye/
│   │   │   ├── kupe/
│   │   │   ├── set/
│   │   │   └── yuzuk/
│   │   ├── globals.css              # Global stiller
│   │   ├── layout.tsx               # Root layout
│   │   └── page.tsx                 # Ana sayfa
│   ├── components/                   # React bileşenleri
│   │   ├── ConfirmPopup.tsx         # Onay popup
│   │   ├── FeaturedProducts.tsx     # Öne çıkan ürünler
│   │   ├── FirebaseProvider.tsx     # Firebase context
│   │   ├── Footer.tsx               # Footer bileşeni
│   │   ├── HeroSlider.tsx           # Ana sayfa slider
│   │   ├── LayoutContent.tsx        # Layout wrapper
│   │   ├── LeafletMap.tsx           # Harita bileşeni
│   │   ├── Navbar.tsx               # Navigasyon barı
│   │   ├── SearchBox.tsx            # Arama kutusu
│   │   └── Sidebar.tsx              # Mobil menü
│   ├── hooks/                        # Custom hooks
│   │   └── useAuth.ts               # Kimlik doğrulama hook
│   ├── lib/                          # Utility fonksiyonlar
│   │   ├── cloudinary.ts            # Cloudinary config
│   │   └── firebase.ts              # Firebase config
│   └── middleware.ts                 # Next.js middleware
├── public/                           # Statik dosyalar
│   └── images/                       # Resim dosyaları
├── .env.local                        # Environment variables (gizli)
├── .env.local.example               # Environment örnek dosya
├── next.config.ts                    # Next.js yapılandırma
├── tailwind.config.ts               # Tailwind yapılandırma
├── tsconfig.json                     # TypeScript yapılandırma
└── package.json                      # Proje bağımlılıkları
```

## 🚀 Kurulum

### Ön Gereksinimler
- Node.js 18.x veya üzeri
- npm, yarn, pnpm veya bun
- Firebase projesi
- Cloudinary hesabı
- Gold API anahtarı

### Adım 1: Projeyi Klonlayın

```bash
git clone https://github.com/enssyilmz/akturk-kuyumculuk.git
cd akturk-kuyumculuk
```

### Adım 2: Bağımlılıkları Yükleyin

```bash
npm install
# veya
yarn install
# veya
pnpm install
```

### Adım 3: Environment Variables Ayarlayın

`.env.local.example` dosyasını `.env.local` olarak kopyalayın:

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id

# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your-upload-preset
NEXT_PUBLIC_CLOUDINARY_API_KEY=your-api-key
NEXT_PUBLIC_CLOUDINARY_API_SECRET=your-api-secret

# Gold API Configuration
GOLD_API_KEY=your-gold-api-key
```

Sonra `.env.local` dosyasını düzenleyerek kendi API anahtarlarınızı ekleyin.

### Adım 4: Geliştirme Sunucusunu Başlatın

```bash
npm run dev
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.


## 💻 Geliştirme

### Komutlar

```bash
# Geliştirme sunucusunu başlat
npm run dev

# Production build oluştur
npm run build

# Production sunucusunu başlat
npm start

# Lint kontrolü
npm run lint
```

### Kod Stili

- TypeScript strict mode
- ESLint + Prettier
- Tailwind CSS utility-first
- Component-based architecture

### Animasyon Sistemi

Tüm sayfalarda Framer Motion kullanılıyor:

```tsx
<motion.div
  initial={{ opacity: 0, y: -30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: false, amount: 0.3 }}
  transition={{ duration: 0.6 }}
>
  İçerik
</motion.div>
```

### Admin Paneli Kullanımı

1. `/giris` adresine gidin
2. Firebase Auth ile giriş yapın
3. `/admin` panelinde ürünleri yönetin
4. Yeni ürün ekleyin veya mevcut ürünleri düzenleyin

## 🎨 Renk Paleti

```css
--brand-black: #0a0a0a        /* Ana arka plan */
--brand-dark-gray: #1a1a1a    /* Kartlar */
--brand-medium-gray: #4a4a4a  /* İkincil metinler */
--brand-light-gray: #e5e5e5   /* Ana metinler */
--brand-gold: #d4af37         /* Vurgu rengi */
```

## 📱 Responsive Breakpoints

```css
sm: 640px   /* Mobil (büyük) */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop (küçük) */
xl: 1280px  /* Desktop (büyük) */
2xl: 1536px /* Desktop (ekstra büyük) */
```

## 🔧 Sorun Giderme

### "Failed to fetch gold prices"
- Gold API key'inizin doğru olduğundan emin olun
- Günlük istek limitinizi kontrol edin
- Dev server'ı yeniden başlatın

### "Firebase error"
- Firebase config'inizin doğru olduğundan emin olun
- Firestore koleksiyonlarının oluşturulduğunu kontrol edin
- Firebase Authentication'ın aktif olduğunu doğrulayın

### "Cloudinary upload failed"
- Upload preset'inizin unsigned olduğundan emin olun
- Cloud name ve API key'lerinizi kontrol edin

## 📄 Lisans

Bu proje özel bir projedir. Tüm hakları saklıdır.

## 👨‍💻 Geliştirici

**Enes Yılmaz**

## 🙏 Teşekkürler

- [Next.js](https://nextjs.org/)
- [Firebase](https://firebase.google.com/)
- [Cloudinary](https://cloudinary.com/)
- [GoldAPI.io](https://www.goldapi.io/)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Leaflet](https://leafletjs.com/)

---

**Not:** Bu proje aktif geliştirme aşamasındadır. Önerileriniz ve katkılarınız için lütfen issue açın.

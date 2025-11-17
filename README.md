# Aktürk Kuyumculuk - E-Ticaret Platformu

Modern ve kullanıcı dostu kuyumculuk e-ticaret platformu. Next.js 15, TypeScript, Firebase ve Framer Motion ile geliştirilmiştir.

## Özellikler

### UI/UX
- Modern ve responsive tasarım (mobil, tablet, desktop)
- Framer Motion ile akıcı animasyonlar
- Scroll bazlı animasyonlar (viewport tracking)
- Karanlık tema (siyah-altın renk paleti)
- Interaktif hamburger menü
- Dinamik arama özelliği

### Ürün Yönetimi
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

### Admin Paneli
- Firebase Authentication ile güvenli giriş
- Ürün ekleme/düzenleme/silme
- Cloudinary entegrasyonu ile resim yükleme
- Gerçek zamanlı ürün yönetimi

### Altın Fiyatları
- Anlık altın fiyatları (Gold API entegrasyonu)
- 6000 saniyede bir otomatik güncelleme
- Fiyat değişim göstergesi (yeşil/kırmızı)

### Diğer Özellikler
- GoogleMaps entegrasyonu
- İletişim formu
- SSR optimizasyonu
- SEO dostu yapı

## Teknoloji Yığını

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

### Geliştirme Araçları
- **Linting:** ESLint 9.x
- **Kod Formatı:** Prettier (ESLint entegreli)
- **Tip Kontrolü:** TypeScript

## Kurulum

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

`.env.local`e bunları kopyalayın:

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


## Geliştirme

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

### Admin Paneli Kullanımı

1. `/giris` adresine gidin
2. Firebase Auth ile giriş yapın
3. `/admin` panelinde ürünleri yönetin
4. Yeni ürün ekleyin veya mevcut ürünleri düzenleyin

## Renk Paleti

```css
--brand-black: #0a0a0a        /* Ana arka plan */
--brand-dark-gray: #1a1a1a    /* Kartlar */
--brand-medium-gray: #4a4a4a  /* İkincil metinler */
--brand-light-gray: #e5e5e5   /* Ana metinler */
--brand-gold: #d4af37         /* Vurgu rengi */
```

## Lisans

Bu proje özel bir projedir. Tüm hakları saklıdır.

## Geliştirici

**Enes Yılmaz**

## Teşekkürler

- [Next.js](https://nextjs.org/)
- [Firebase](https://firebase.google.com/)
- [Cloudinary](https://cloudinary.com/)
- [GoldAPI.io](https://www.goldapi.io/)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Leaflet](https://leafletjs.com/)

---

**Not:** Bu proje aktif geliştirme aşamasındadır. Önerileriniz ve katkılarınız için lütfen issue açın.

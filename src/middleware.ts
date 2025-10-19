import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin rotalarını kontrol et
  if (pathname.startsWith('/admin')) {
    // Firebase auth token'ı kontrol et
    // Not: Client-side auth kullanıyoruz, bu yüzden client-side redirect yapacağız
    // Ama burada en azından bir kontrol ekleyelim
    
    // /admin/giris varsa, /giris'e yönlendir (eski route)
    if (pathname === '/admin/giris') {
      return NextResponse.redirect(new URL('/giris', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};

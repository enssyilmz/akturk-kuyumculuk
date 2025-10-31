'use client';
import { motion } from 'framer-motion';
import { Mail, MapPin, Clock, Instagram , Phone} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-dark-gray mt-6 sm:mt-8 lg:mt-12 xl:mt-16">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-6 lg:py-8 xl:py-10 border-t-2 border-brand-gold">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 xl:gap-10">
          
          {/* Sol - Konum */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="space-y-2 sm:space-y-3"
          >
            <h3 className="text-sm sm:text-md lg:text-xl xl:text-2xl font-bold text-brand-gold mb-2 sm:mb-3 lg:mb-4">Konumumuz</h3>
            <div className="relative z-0 h-[150px] sm:h-[180px] lg:h-[200px] xl:h-[220px] ring-2 ring-brand-gold overflow-hidden rounded-sm mb-3">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!3m2!1str!2str!4v1761934374301!5m2!1str!2str!6m8!1m7!1s0xgzFnIueSh2jJgg3B_kAQ!2m2!1d41.00639157716616!2d39.72607529600786!3f188.43383259017082!4f-16.690193043676757!5f0.43279263888731334" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true}
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              />
            </div>
            <div className="flex items-start gap-1.5 sm:gap-2 lg:gap-2.5 text-brand-light-gray text-[10px] sm:text-xs lg:text-sm xl:text-base">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 flex-shrink-0 mt-0.5" />
                  <span>Kemerkaya Mah. Kunduracılar Cad. Çarşı Sok. Çarşı Han Kat:2 Ortahisar / Trabzon</span>
                  </div>
          </motion.div>

          {/* Orta - Çalışma Saatleri */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-2 sm:space-y-3"
          >
            <h3 className="text-sm sm:text-md lg:text-xl xl:text-2xl font-bold text-brand-gold mb-2 sm:mb-3 lg:mb-4">Çalışma Saatleri</h3>
            <div className="space-y-1 sm:space-y-1.5 lg:space-y-2">
              <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-2.5 text-brand-light-gray text-[10px] sm:text-xs lg:text-sm xl:text-base">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 flex-shrink-0" />
                <span><strong className="text-brand-gold">Hafta İçi:</strong> 09:00 - 17:00</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-2.5 text-brand-light-gray text-[10px] sm:text-xs lg:text-sm xl:text-base">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 flex-shrink-0" />
                <span><strong className="text-brand-gold">Cumartesi:</strong> 10:00 - 16:00</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-2.5 text-brand-light-gray text-[10px] sm:text-xs lg:text-sm xl:text-base">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 flex-shrink-0" />
                <span><strong className="text-brand-gold">Pazar:</strong> Kapalı</span>
              </div>
            </div>
          </motion.div>

          {/* Sağ - İletişim ve Sosyal Medya */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="space-y-3 sm:space-y-4 lg:space-y-5"
          >
            <div>
              <h3 className="text-sm sm:text-md lg:text-xl xl:text-2xl font-bold text-brand-gold mb-2 sm:mb-3 lg:mb-4">İletişim</h3>
              <div className="space-y-1 sm:space-y-1.5 lg:space-y-2">
                <a
                  href="mailto:official@akturkkuyumculuk.com"
                  className="flex items-center gap-1.5 sm:gap-2 lg:gap-2.5 text-brand-light-gray hover:text-brand-gold transition-colors text-[10px] sm:text-xs lg:text-sm xl:text-base"
                >
                  <Mail className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 flex-shrink-0" />
                  <span>official@akturkkuyumculuk.com</span>
                </a>
                <a href="tel:05312831934" className="flex items-center space-x-2 text-brand-light-gray hover:text-brand-gold transition-colors">
                <Phone className="w-4 h-4" />
                <span>(0531) 283 19 34</span>
              </a>
              <a href="tel:04623321661" className="flex items-center space-x-2 text-brand-light-gray hover:text-brand-gold transition-colors">
                <Phone className="w-4 h-4" />
                <span>0462 332 16 61</span>
              </a>
              </div>
            </div>

            <div>
              <h3 className="text-sm sm:text-md lg:text-xl xl:text-2xl font-bold text-brand-gold mb-2 sm:mb-3 lg:mb-4">Bizi Takip Edin</h3>
              <div className="flex gap-2 sm:gap-3 lg:gap-4">
                <a
                  href="https://www.instagram.com/akturk_kuyumculuk?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 sm:p-2 lg:p-2.5 xl:p-3 bg-brand-dark-gray ring-1 ring-brand-gold hover:bg-brand-gold hover:text-brand-black transition-colors rounded-sm"
                >
                  <Instagram className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6" />
                </a>
                <a
                  href="https://wa.me/905312831934"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 sm:p-2 lg:p-2.5 xl:p-3 bg-brand-dark-gray ring-1 ring-brand-gold hover:bg-brand-gold hover:text-brand-black transition-colors rounded-sm"
                >
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Alt Kısım - Copyright */}
        <div className="border-t border-brand-gold/30 mt-6 sm:mt-8 lg:mt-10 xl:mt-12 pt-4 sm:pt-6 lg:pt-8 text-center">
          <p className="text-brand-light-gray text-[10px] sm:text-xs lg:text-sm xl:text-base">
            © {new Date().getFullYear()} Aktürk Kuyumculuk. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}

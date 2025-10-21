import { Award, Shield, Clock, Gem, Calculator, Package, Heart, Users } from 'lucide-react';

export default function NedenAkturkKuyumculuk() {
  return (
    <div className="min-h-screen bg-brand-black pt-8 sm:pt-12 lg:pt-30 pb-8 sm:pb-12 lg:pb-16">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        {/* Başlık */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-serif text-brand-light-gray mb-2 sm:mb-3 lg:mb-4">
            Neden Aktürk Kuyumculuk?
          </h1>
          <div className="w-20 sm:w-24 lg:w-32 h-0.5 sm:h-1 bg-brand-gold mx-auto mb-3 sm:mb-4 lg:mb-6"></div>
          <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-brand-medium-gray max-w-3xl mx-auto px-4">
            Güven, kalite ve mükemmelliğin buluştuğu noktada, sizin için en iyisini sunuyoruz
          </p>
        </div>

        {/* Özel Deneyim */}
        <section className="mb-10 sm:mb-12 lg:mb-20">
          <div className="bg-brand-dark-gray  p-4 sm:p-6 lg:p-8 xl:p-12 border border-brand-medium-gray shadow-xl">
            <div className="flex items-center mb-3 sm:mb-4 lg:mb-6">
              <Heart className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-brand-gold mr-2 sm:mr-3 lg:mr-4" />
              <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-serif text-brand-light-gray">
                Size Özel Alışveriş Deneyimi
              </h2>
            </div>
            <p className="text-brand-medium-gray text-xs sm:text-sm lg:text-base xl:text-lg leading-relaxed mb-3 sm:mb-4 lg:mb-6">
              Trabzon mağazamızda, misafirlerimize alışveriş deneyimlerini unutulmaz kılacak özel bir hizmet sunuyoruz. 
              Randevulu olarak davet ettiğimiz misafirlerimiz, güne yöresel lezzetlerle dolu zengin bir kahvaltıyla başlıyor. 
              Ardından, sadece onlara özel bir anı bırakabilmeleri adına, kendi ürünlerine kişiselleştirme fırsatı tanıyoruz.
            </p>
            <p className="text-brand-medium-gray text-xs sm:text-sm lg:text-base xl:text-lg leading-relaxed">
              Deneyimli ustalarımız eşliğinde, misafirlerimiz kendi ürünlerinin üretim sürecine bizzat tanıklık ediyor. 
              Uzman ekibimiz, alınan ölçüler doğrultusunda ürünü misafire özel olarak hazırlıyor. Ölçülendirme tamamlandıktan 
              sonra, misafirlerimize ürünü denetme ve ölçü onayı fırsatı sunuluyor. Onay alındıktan sonra, atölyemizde üretim 
              süreci titizlikle tamamlanıyor.
            </p>
            <div className="mt-4 sm:mt-6 lg:mt-8 p-3 sm:p-4 lg:p-6 bg-brand-gold  sm: border-l-2 sm:border-l-4 border-light-gray">
              <p className="text-brand-light-gray mr-2 text-xs sm:text-sm lg:text-base">
                Misafirlerimiz, kendi el emeğiyle dokunuş kattıkları Yaşayan Efsane&apos;lerine kavuşuyor.
              </p>
            </div>
          </div>
        </section>

        {/* Ürün Kimliği */}
        <section className="mb-10 sm:mb-12 lg:mb-20">
          <div className="bg-brand-dark-gray p-4 sm:p-6 lg:p-8 xl:p-12 border border-brand-medium-gray shadow-xl">
            <div className="flex items-center mb-3 sm:mb-4 lg:mb-6">
              <Shield className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-brand-gold mr-2 sm:mr-3 lg:mr-4" />
              <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-serif text-brand-light-gray">
                Ürün Kimliği Numarası
              </h2>
            </div>
            <p className="text-brand-medium-gray text-xs sm:text-sm lg:text-base xl:text-lg leading-relaxed mb-3 sm:mb-4 lg:mb-6">
              Ne yazık ki mücevherat sektöründe satılan ürünlerin birçoğu hurda olarak alınıp, temizlendikten sonra 
              satılan ürünlerden oluşmaktadır. İkinci el ürünler, kim tarafından ne zaman üretildiği belli olmayan ürünlerdir. 
              Birçok mücevher sever bu konuda mağdur olmuş ve bu olaylar haberlere dahi konu olmuştur.
            </p>
            <p className="text-brand-medium-gray text-xs sm:text-sm lg:text-base xl:text-lg leading-relaxed mb-3 sm:mb-4 lg:mb-6">
              Firmamız kurulduğu günden itibaren bu konuda mücadelesini sürdürmektedir. Firmamız birinci el üretim 
              yapmakta ve bunu <span className="text-brand-gold font-semibold">&quot;ÜRÜN KİMLİĞİ&quot;</span> uygulaması ile 
              garanti altına almıştır
            </p>
            <div className="grid grid-cols-2 xl:grid-cols-1 gap-3 sm:gap-4 lg:gap-6 mt-4 sm:mt-6 lg:mt-8">
              <div className="bg-brand-gold p-3 sm:p-4 lg:p-6  sm:">
                <h3 className="text-brand-light-gray font-bold text-sm sm:text-base lg:text-lg xl:text-xl mb-2 sm:mb-3">Ürün Kimliği ile Neler Öğrenebilirsiniz?</h3>
                <ul className="space-y-1 sm:space-y-2 text-brand-medium-gray">
                  <li className="flex items-start">
                    <span className="text-brand-light-gray mr-2 text-xs sm:text-sm lg:text-base">•</span>
                    <span className="text-brand-light-gray mr-2 text-xs sm:text-sm lg:text-base">Ürünün firmamıza ait olduğunu</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-light-gray mr-2 text-xs sm:text-sm lg:text-base">•</span>
                    <span className="text-brand-light-gray mr-2 text-xs sm:text-sm lg:text-base">Laboratuvar analiz sonuçlarını</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-light-gray mr-2 text-xs sm:text-sm lg:text-base">•</span>
                    <span className="text-brand-light-gray mr-2 text-xs sm:text-sm lg:text-base">Ustalarının kim olduğunu</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-light-gray mr-2 text-xs sm:text-sm lg:text-base">•</span>
                    <span className="text-brand-light-gray mr-2 text-xs sm:text-sm lg:text-base">Üretim tarihini ve detaylarını</span>
                  </li>
                </ul>
              </div>
              <div className="bg-brand-gold p-3 sm:p-4 lg:p-6 ">
                <h3 className="text-brand-light-gray font-bold text-sm sm:text-base lg:text-lg xl:text-xl mb-2 sm:mb-3">Kayıp veya Çalınma Durumunda</h3>
                <p className="text-brand-light-gray mr-2 text-xs sm:text-sm lg:text-base">
                  Ürününüzün kaybolması ya da art niyetli kişilerin eline geçmesi durumunda, ürün kimliği numaranızı 
                  bizimle paylaştığınız takdirde bu numara tüm dernek ve kuyumcularla paylaşılacak, ürün tespiti 
                  ürün kimliği numarası ile gerçekleştirilebilecektir.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Ayrıcalıklar Grid */}
        <section className="mb-10 sm:mb-12 lg:mb-20">
          <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-serif text-brand-light-gray text-center mb-6 sm:mb-8 lg:mb-12">
            Aktürk Kuyumculuk Ayrıcalıkları
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Ayar Garantisi */}
            <div className="bg-brand-dark-gray p-4 sm:p-6 lg:p-8  sm: border border-brand-medium-gray hover:border-brand-gold transition-all duration-300 group">
              <div className="flex justify-center mb-3 sm:mb-4 lg:mb-6">
                <Award className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-brand-gold group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-serif text-brand-light-gray text-center mb-2 sm:mb-3 lg:mb-4">
                Ayar Garantisi
              </h3>
              <p className="text-brand-medium-gray text-center leading-relaxed text-xs sm:text-sm lg:text-base">
                Özenle ürettiğimiz tüm ürünlerde, ham madde olarak kullandığımız altını bütün üretim aşamalarında 
                laboratuvarda analize tabi tutarak ayar garantili üretim yapmaktayız. Ürün kimliği numaranızla 
                analiz sonuçlarını görebilirsiniz.
              </p>
            </div>

            {/* Ömür Boyu Bakım */}
            <div className="bg-brand-dark-gray p-4 sm:p-6 lg:p-8  sm: border border-brand-medium-gray hover:border-brand-gold transition-all duration-300 group">
              <div className="flex justify-center mb-3 sm:mb-4 lg:mb-6">
                <Clock className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-brand-gold group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-serif text-brand-light-gray text-center mb-2 sm:mb-3 lg:mb-4">
                Ömür Boyu Ücretsiz Bakım
              </h3>
              <p className="text-brand-medium-gray text-center leading-relaxed text-xs sm:text-sm lg:text-base">
                Kullanıcı hatalarından oluşabilen ürün deformasyonlarında dahi ücretsiz bakım ve onarım imkanları 
                sunuyoruz. Kilit problemi, form bozulması gibi problemlerde ücretsiz bakım ve onarım sağlamaktayız.
              </p>
            </div>

            {/* Kalite Güvencesi */}
            <div className="bg-brand-dark-gray p-4 sm:p-6 lg:p-8  sm: border border-brand-medium-gray hover:border-brand-gold transition-all duration-300 group">
              <div className="flex justify-center mb-3 sm:mb-4 lg:mb-6">
                <Gem className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-brand-gold group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-serif text-brand-light-gray text-center mb-2 sm:mb-3 lg:mb-4">
                Sürdürülebilir Kalite
              </h3>
              <p className="text-brand-medium-gray text-center leading-relaxed text-xs sm:text-sm lg:text-base">
                Yıllardır tecrübeli, seçkin ustalarımız tarafından üretilen ürünlerimiz kalite kursuna tabii tutulmuştur. 
                Ustalarımız kalite kontrol eğitimlerine tabi tutularak çalışmaktadırlar.
              </p>
            </div>

            {/* Patentli Teknik */}
            <div className="bg-brand-dark-gray p-4 sm:p-6 lg:p-8  sm: border border-brand-medium-gray hover:border-brand-gold transition-all duration-300 group">
              <div className="flex justify-center mb-3 sm:mb-4 lg:mb-6">
                <Calculator className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-brand-gold group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-serif text-brand-light-gray text-center mb-2 sm:mb-3 lg:mb-4">
                İleri Teknoloji Üretim
              </h3>
              <p className="text-brand-medium-gray text-center leading-relaxed text-xs sm:text-sm lg:text-base">
                Üretim aşamasında kullandığımız ileri teknoloji buluşlar sayesinde piyasa standartlarının en hafif 
                ve en kaliteli ürünlerini üretiyoruz. Kalitemizi standart bir hale getirdik.
              </p>
            </div>

            {/* Özel Tasarım */}
            <div className="bg-brand-dark-gray p-4 sm:p-6 lg:p-8  sm: border border-brand-medium-gray hover:border-brand-gold transition-all duration-300 group">
              <div className="flex justify-center mb-3 sm:mb-4 lg:mb-6">
                <Package className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-brand-gold group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-serif text-brand-light-gray text-center mb-2 sm:mb-3 lg:mb-4">
                Kişiye Özel Üretim
              </h3>
              <p className="text-brand-medium-gray text-center leading-relaxed text-xs sm:text-sm lg:text-base">
                Müşterilerimizin isteklerine göre özel tasarım ve üretim hizmeti sunuyoruz. Hayalinizdeki mücevheri 
                birlikte tasarlayıp, size özel üretiyoruz.
              </p>
            </div>

            {/* Uzman Kadro */}
            <div className="bg-brand-dark-gray p-4 sm:p-6 lg:p-8  sm: border border-brand-medium-gray hover:border-brand-gold transition-all duration-300 group">
              <div className="flex justify-center mb-3 sm:mb-4 lg:mb-6">
                <Users className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-brand-gold group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-serif text-brand-light-gray text-center mb-2 sm:mb-3 lg:mb-4">
                Uzman Kadro
              </h3>
              <p className="text-brand-medium-gray text-center leading-relaxed text-xs sm:text-sm lg:text-base">
                Alanında uzman, deneyimli ustalarımız ve danışmanlarımızla size en iyi hizmeti sunmak için çalışıyoruz. 
                Her aşamada profesyonel destek sağlamaktayız.
              </p>
            </div>
          </div>
        </section>

        {/* Alt Bilgi */}
        <section className="text-center bg-brand-dark-gray p-6 sm:p-8 lg:p-12 border border-brand-gold">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif text-brand-light-gray mb-3 sm:mb-4 lg:mb-6">
            Yaşayan Efsanenizi Bizimle Yaratın
          </h2>
          <p className="text-brand-medium-gray text-xs sm:text-sm lg:text-base xl:text-lg max-w-3xl mx-auto mb-4 sm:mb-6 lg:mb-8 px-4">
            Aktürk Kuyumculuk olarak, sizlere sadece mücevher değil, nesilden nesile aktarılacak yaşayan efsaneler sunuyoruz. 
            Her ürünümüz, özenle seçilmiş malzemeler ve ustalarımızın maharetli elleriyle hayat buluyor.
          </p>
          <div className="inline-block">
            <a 
              href="tel:05312831934" 
              className="border-2 px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 btn-primary text-xs sm:text-base"
            >
              Bizi Arayın: (0531) 283 19 34
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

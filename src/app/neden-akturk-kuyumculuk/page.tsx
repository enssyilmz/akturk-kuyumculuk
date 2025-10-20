import { Award, Shield, Clock, Gem, Calculator, Package, Heart, Users } from 'lucide-react';

export default function NedenAkturkKuyumculuk() {
  return (
    <div className="min-h-screen bg-brand-black pt-16 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Başlık */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif text-brand-light-gray mb-4">
            Neden Aktürk Kuyumculuk?
          </h1>
          <div className="w-32 h-1 bg-brand-gold mx-auto mb-6"></div>
          <p className="text-xl text-brand-medium-gray max-w-3xl mx-auto">
            Güven, kalite ve mükemmelliğin buluştuğu noktada, sizin için en iyisini sunuyoruz
          </p>
        </div>

        {/* Özel Deneyim */}
        <section className="mb-20">
          <div className="bg-brand-dark-gray rounded-2xl p-8 md:p-12 border border-brand-medium-gray shadow-xl">
            <div className="flex items-center mb-6">
              <Heart className="w-10 h-10 text-brand-gold mr-4" />
              <h2 className="text-3xl font-serif text-brand-light-gray">
                Size Özel Alışveriş Deneyimi
              </h2>
            </div>
            <p className="text-brand-medium-gray text-lg leading-relaxed mb-6">
              Trabzon mağazamızda, misafirlerimize alışveriş deneyimlerini unutulmaz kılacak özel bir hizmet sunuyoruz. 
              Randevulu olarak davet ettiğimiz misafirlerimiz, güne yöresel lezzetlerle dolu zengin bir kahvaltıyla başlıyor. 
              Ardından, sadece onlara özel bir anı bırakabilmeleri adına, kendi ürünlerine kişiselleştirme fırsatı tanıyoruz.
            </p>
            <p className="text-brand-medium-gray text-lg leading-relaxed">
              Deneyimli ustalarımız eşliğinde, misafirlerimiz kendi ürünlerinin üretim sürecine bizzat tanıklık ediyor. 
              Uzman ekibimiz, alınan ölçüler doğrultusunda ürünü misafire özel olarak hazırlıyor. Ölçülendirme tamamlandıktan 
              sonra, misafirlerimize ürünü denetme ve ölçü onayı fırsatı sunuluyor. Onay alındıktan sonra, atölyemizde üretim 
              süreci titizlikle tamamlanıyor.
            </p>
            <div className="mt-8 p-6 bg-brand-gold rounded-lg border-l-4 border-light-gray">
              <p className="text-brand-light-gray text-xl font-semibold italic">
                Misafirlerimiz, kendi el emeğiyle dokunuş kattıkları Yaşayan Efsane&apos;lerine kavuşuyor.
              </p>
            </div>
          </div>
        </section>

        {/* Ürün Kimliği */}
        <section className="mb-20">
          <div className="bg-brand-dark-gray rounded-2xl p-8 md:p-12 border border-brand-medium-gray shadow-xl">
            <div className="flex items-center mb-6">
              <Shield className="w-10 h-10 text-brand-gold mr-4" />
              <h2 className="text-3xl font-serif text-brand-light-gray">
                Ürün Kimliği Numarası
              </h2>
            </div>
            <p className="text-brand-medium-gray text-lg leading-relaxed mb-6">
              Ne yazık ki mücevherat sektöründe satılan ürünlerin birçoğu hurda olarak alınıp, temizlendikten sonra 
              satılan ürünlerden oluşmaktadır. İkinci el ürünler, kim tarafından ne zaman üretildiği belli olmayan ürünlerdir. 
              Birçok mücevher sever bu konuda mağdur olmuş ve bu olaylar haberlere dahi konu olmuştur.
            </p>
            <p className="text-brand-medium-gray text-lg leading-relaxed mb-6">
              Firmamız kurulduğu günden itibaren bu konuda mücadelesini sürdürmektedir. Firmamız birinci el üretim 
              yapmakta ve bunu <span className="text-brand-gold font-semibold">&quot;ÜRÜN KİMLİĞİ&quot;</span> uygulaması ile 
              garanti altına almıştır
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="bg-brand-gold p-6 rounded-lg">
                <h3 className="text-brand-light-gray font-bold text-xl mb-3">Ürün Kimliği ile Neler Öğrenebilirsiniz?</h3>
                <ul className="space-y-2 text-brand-medium-gray">
                  <li className="flex items-start">
                    <span className="text-brand-light-gray mr-2">•</span>
                    <span className="text-brand-light-gray mr-2">Ürünün firmamıza ait olduğunu</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-light-gray mr-2">•</span>
                    <span className="text-brand-light-gray mr-2">Laboratuvar analiz sonuçlarını</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-light-gray mr-2">•</span>
                    <span className="text-brand-light-gray mr-2">Ustalarının kim olduğunu</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-light-gray mr-2">•</span>
                    <span className="text-brand-light-gray mr-2">Üretim tarihini ve detaylarını</span>
                  </li>
                </ul>
              </div>
              <div className="bg-brand-gold p-6 rounded-lg">
                <h3 className="text-brand-light-gray font-semibold text-xl mb-3">Kayıp veya Çalınma Durumunda</h3>
                <p className="text-brand-light-gray">
                  Ürününüzün kaybolması ya da art niyetli kişilerin eline geçmesi durumunda, ürün kimliği numaranızı 
                  bizimle paylaştığınız takdirde bu numara tüm dernek ve kuyumcularla paylaşılacak, ürün tespiti 
                  ürün kimliği numarası ile gerçekleştirilebilecektir.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Ayrıcalıklar Grid */}
        <section className="mb-20">
          <h2 className="text-4xl font-serif text-brand-light-gray text-center mb-12">
            Aktürk Kuyumculuk Ayrıcalıkları
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Ayar Garantisi */}
            <div className="bg-brand-dark-gray p-8 rounded-xl border border-brand-medium-gray hover:border-brand-gold transition-all duration-300 group">
              <div className="flex justify-center mb-6">
                <Award className="w-16 h-16 text-brand-gold group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-2xl font-serif text-brand-light-gray text-center mb-4">
                Ayar Garantisi
              </h3>
              <p className="text-brand-medium-gray text-center leading-relaxed">
                Özenle ürettiğimiz tüm ürünlerde, ham madde olarak kullandığımız altını bütün üretim aşamalarında 
                laboratuvarda analize tabi tutarak ayar garantili üretim yapmaktayız. Ürün kimliği numaranızla 
                analiz sonuçlarını görebilirsiniz.
              </p>
            </div>

            {/* Ömür Boyu Bakım */}
            <div className="bg-brand-dark-gray p-8 rounded-xl border border-brand-medium-gray hover:border-brand-gold transition-all duration-300 group">
              <div className="flex justify-center mb-6">
                <Clock className="w-16 h-16 text-brand-gold group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-2xl font-serif text-brand-light-gray text-center mb-4">
                Ömür Boyu Ücretsiz Bakım
              </h3>
              <p className="text-brand-medium-gray text-center leading-relaxed">
                Kullanıcı hatalarından oluşabilen ürün deformasyonlarında dahi ücretsiz bakım ve onarım imkanları 
                sunuyoruz. Kilit problemi, form bozulması gibi problemlerde ücretsiz bakım ve onarım sağlamaktayız.
              </p>
            </div>

            {/* Kalite Güvencesi */}
            <div className="bg-brand-dark-gray p-8 rounded-xl border border-brand-medium-gray hover:border-brand-gold transition-all duration-300 group">
              <div className="flex justify-center mb-6">
                <Gem className="w-16 h-16 text-brand-gold group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-2xl font-serif text-brand-light-gray text-center mb-4">
                Sürdürülebilir Kalite
              </h3>
              <p className="text-brand-medium-gray text-center leading-relaxed">
                Yıllardır tecrübeli, seçkin ustalarımız tarafından üretilen ürünlerimiz kalite kursuna tabii tutulmuştur. 
                Ustalarımız kalite kontrol eğitimlerine tabi tutularak çalışmaktadırlar.
              </p>
            </div>

            {/* Patentli Teknik */}
            <div className="bg-brand-dark-gray p-8 rounded-xl border border-brand-medium-gray hover:border-brand-gold transition-all duration-300 group">
              <div className="flex justify-center mb-6">
                <Calculator className="w-16 h-16 text-brand-gold group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-2xl font-serif text-brand-light-gray text-center mb-4">
                İleri Teknoloji Üretim
              </h3>
              <p className="text-brand-medium-gray text-center leading-relaxed">
                Üretim aşamasında kullandığımız ileri teknoloji buluşlar sayesinde piyasa standartlarının en hafif 
                ve en kaliteli ürünlerini üretiyoruz. Kalitemizi standart bir hale getirdik.
              </p>
            </div>

            {/* Özel Tasarım */}
            <div className="bg-brand-dark-gray p-8 rounded-xl border border-brand-medium-gray hover:border-brand-gold transition-all duration-300 group">
              <div className="flex justify-center mb-6">
                <Package className="w-16 h-16 text-brand-gold group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-2xl font-serif text-brand-light-gray text-center mb-4">
                Kişiye Özel Üretim
              </h3>
              <p className="text-brand-medium-gray text-center leading-relaxed">
                Müşterilerimizin isteklerine göre özel tasarım ve üretim hizmeti sunuyoruz. Hayalinizdeki mücevheri 
                birlikte tasarlayıp, size özel üretiyoruz.
              </p>
            </div>

            {/* Uzman Kadro */}
            <div className="bg-brand-dark-gray p-8 rounded-xl border border-brand-medium-gray hover:border-brand-gold transition-all duration-300 group">
              <div className="flex justify-center mb-6">
                <Users className="w-16 h-16 text-brand-gold group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-2xl font-serif text-brand-light-gray text-center mb-4">
                Uzman Kadro
              </h3>
              <p className="text-brand-medium-gray text-center leading-relaxed">
                Alanında uzman, deneyimli ustalarımız ve danışmanlarımızla size en iyi hizmeti sunmak için çalışıyoruz. 
                Her aşamada profesyonel destek sağlamaktayız.
              </p>
            </div>
          </div>
        </section>

        {/* Alt Bilgi */}
        <section className="text-center bg-brand-dark-gray rounded-2xl p-12 border border-brand-gold">
          <h2 className="text-3xl font-serif text-brand-light-gray mb-6">
            Yaşayan Efsanenizi Bizimle Yaratın
          </h2>
          <p className="text-brand-medium-gray text-lg max-w-3xl mx-auto mb-8">
            Aktürk Kuyumculuk olarak, sizlere sadece mücevher değil, nesilden nesile aktarılacak yaşayan efsaneler sunuyoruz. 
            Her ürünümüz, özenle seçilmiş malzemeler ve ustalarımızın maharetli elleriyle hayat buluyor.
          </p>
          <div className="inline-block">
            <a 
              href="tel:05312831934" 
              className="border-2 px-8 py-4 btn-primary"
            >
              Bizi Arayın: (0531) 283 19 34
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

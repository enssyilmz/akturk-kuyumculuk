import { Flame, Cog, TestTube, Hammer, Sparkles, Medal } from 'lucide-react';
import Link from 'next/link';

export default function Uretim() {
  const productionSteps = [
    {
      icon: Flame,
      title: 'Eritme Aşaması',
      description: 'Üretimde kullandığımız altın tellerin üretimine, has altın ve alloy karışımıyla 1064-1150 derecede eritme ocaklarında başlanır. Karışım eritilerek altında istenilen ayara dönüşüm sağlanır. Eritilen altının, 8mm kalınlığındaki kalıpta çubuk dökümü gerçekleştirilir.',
      temp: '1064-1150°C',
    },
    {
      icon: Cog,
      title: 'Silindir Makinesi',
      description: 'Elde edilen altın çubuk silindir makinesindeki silindirlerin arasından defalarca geçirilerek, ürünlerin tellerini oluşturacak incelikte olması sağlanır. Silindir makinesi ile 8 mm kalınlıktaki altın çubuğun 1.2 milimetreye kadar inceltilmesi sağlanır.',
      detail: '8mm → 1.2mm',
    },
    {
      icon: Flame,
      title: 'Tav Fırını',
      description: 'Ürününüzün telini oluşturacak 1.2mm inceliğe ulaşmış altın teli tav fırını içerisinde 700 derece sıcaklıkta yumuşadıktan sonra daha da incelip tel görüntüsüne kavuşması için haddeli tel makinesindeki işleme geçilir.',
      temp: '700°C',
    },
    {
      icon: Cog,
      title: 'Haddeli Tel Makinesi',
      description: '1.2 mm kalınlıktaki altın tel haddeler arasında su ile sıyrıla sıyrıla 31 micron (saç telinin 7 katı) inceliğine ulaşarak ürünlerimizin tellerine dönüşür.',
      detail: '1.2mm → 31 micron',
    },
    {
      icon: TestTube,
      title: 'Laboratuvar Analizi',
      description: 'Birçok aşamadan geçerek 31 micron inceliğine ulaşan altın tel, Kuyumcular Odası Ayar Evi ve laboratuvarlarda teste tabii tutularak, altın ayarı laboratuvar sonuçlarıyla onaylatılır.',
      detail: 'Sertifikalı Ayar',
    },
    {
      icon: Hammer,
      title: 'Usta İşçiliği',
      description: 'Siparişin ağırlığına göre gramlara ayrılan teller, firmamızda çalışan ve sosyal haklara sahip usta zanaatkârlarımıza verilir. Tecrübeli ustalarımız, her ürünü titizlikle işler ve mükemmelliğe ulaştırır.',
      detail: 'El İşçiliği',
    },
  ];

  const workshopSteps = [
    {
      icon: Hammer,
      title: 'Tokmak ve Form Verme',
      description: 'Profesyonel ellerimize teslim edilen ürünlerdeki tellerin üst üste gelen noktaları tespit edilir. Ürün, oval şimşir tokmakla tokmaklanarak tellerin yerine oturtulması sağlanır.',
    },
    {
      icon: Cog,
      title: 'Pressleme',
      description: 'Ürün, press makinesinde kontrollü bir şekilde belli aralıklarla presslenerek tellerin yerine tamamen oturtulması sağlanır. Buradaki amaç ürünün tokmak aşamasında yerine oturmayan tellerinin tamamen yerine oturmasını sağlamaktır.',
    },
    {
      icon: Sparkles,
      title: 'Renklendirme',
      description: 'Kalite kontrolleri de sağlandıktan sonra ürün hor ateşle ısıtılarak renklendirme aşaması tamamlanır. Ürünler son teknoloji döküm işlemiyle hazırlanır ve laboratuvarda analize tabi tutulur.',
    },
  ];

  return (
    <div className="min-h-screen bg-brand-black pt-16 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Başlık */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif text-brand-light-gray mb-4">
            Üretim Aşaması
          </h1>
          <div className="w-32 h-1 bg-brand-gold mx-auto mb-6"></div>
          <p className="text-xl text-brand-medium-gray max-w-3xl mx-auto">
            Her bir ürünümüz, ustalık ve teknolojinin mükemmel uyumuyla hayat buluyor
          </p>
        </div>

        {/* Ayar Seçenekleri */}
        <section className="mb-16">
          <div className="bg-brand-dark-gray rounded-2xl p-8 border border-brand-medium-gray">
            <div className="flex items-center justify-center mb-6">
              <Medal className="w-12 h-12 text-brand-gold mr-4" />
              <h2 className="text-3xl font-serif text-brand-light-gray">
                Ayar Seçenekleri
              </h2>
            </div>
            <p className="text-brand-medium-gray text-lg text-center mb-8">
              Ürünlerimiz, müşterilerimizin talebine göre farklı ayarlarda üretilir
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['22 Ayar', '18 Ayar', '14 Ayar', '8 Ayar'].map((ayar) => (
                <div key={ayar} className="bg-brand-gold p-6 rounded-lg text-center">
                  <p className="text-brand-light-gray text-2xl font-bold">{ayar}</p>
                </div>
              ))}
            </div>
            <p className="text-brand-medium-gray text-center mt-6">
              Altın rafinerilerinden ham madde olarak aldığımız has altını laboratuvarda analize tabi tutarak, 
              müşterilerimizden talep edilen ayarı ayarlayıp işleme tabi tutarız.
            </p>
          </div>
        </section>

        {/* Üretim Aşamaları */}
        <section className="mb-16">
          <h2 className="text-4xl font-serif text-brand-light-gray text-center mb-12">
            Üretim Süreci
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productionSteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div 
                  key={index}
                  className="bg-brand-dark-gray p-8 rounded-xl border border-brand-medium-gray hover:border-brand-gold transition-all duration-300 group relative"
                >
                  {/* Numara Badge */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-brand-gold rounded-full flex items-center justify-center text-brand-black font-bold text-xl shadow-lg">
                    {index + 1}
                  </div>
                  
                  <div className="flex justify-center mb-6 mt-4">
                    <IconComponent className="w-16 h-16 text-brand-gold group-hover:scale-110 transition-transform" />
                  </div>
                  
                  <h3 className="text-2xl font-serif text-brand-light-gray text-center mb-4">
                    {step.title}
                  </h3>
                  
                  {(step.temp || step.detail) && (
                    <div className="text-center mb-4">
                      <span className="inline-block bg-brand-gold text-brand-black px-4 py-1 rounded-full text-sm font-semibold">
                        {step.temp || step.detail}
                      </span>
                    </div>
                  )}
                  
                  <p className="text-brand-medium-gray text-center leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Atölye Aşaması */}
        <section className="mb-16">
          <div className="bg-brand-dark-gray rounded-2xl p-8 md:p-12 border border-brand-medium-gray">
            <h2 className="text-4xl font-serif text-brand-light-gray text-center mb-12">
              Atölye Aşaması
            </h2>
            <p className="text-brand-medium-gray text-lg text-center mb-12 max-w-3xl mx-auto">
              Tokmak - Form Verme - Pressleme - Renklendirme
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {workshopSteps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <div key={index} className="bg-brand-dark-gray p-6 rounded-xl border border-brand-medium-gray">
                    <div className="flex justify-center mb-4">
                      <IconComponent className="w-12 h-12 text-brand-gold" />
                    </div>
                    <h3 className="text-xl font-serif text-brand-light-gray text-center mb-4">
                      {step.title}
                    </h3>
                    <p className="text-brand-medium-gray text-center leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="bg-brand-dark-gray rounded-xl p-8 border-l-4 border-brand-gold">
              <h3 className="text-2xl font-serif text-brand-light-gray mb-4">
                Son Aşama ve Kalite Kontrolü
              </h3>
              <p className="text-brand-medium-gray leading-relaxed mb-4">
                Atölyedeki üretim aşamasında kullanılan kilitler ve tasarım parçaları, son teknoloji döküm işlemiyle üretilir. 
                Sonrasında, ürünler laboratuvarda analize tabi tutulur ve olumlu sonuç alındığı takdirde, üretim tamamlanır 
                ve yaklaşık 3 gün içinde ürün hazır hale getirilir.
              </p>
              <p className="text-brand-medium-gray leading-relaxed">
                Bu süreçte, ürünün ustasının kim olduğu, hangi personel tarafından üretildiği ve analiz raporları ürün kimliği 
                ve seri numaralarına kaydedilir. Müşterilerimiz, bu numaralar sayesinde ürünlerin kim tarafından üretildiğini 
                ve analiz raporlarını internet sitemizden kontrol edebilirler.
              </p>
            </div>
          </div>
        </section>

        {/* Ürün Kimliği ve Güvence */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-brand-dark-gray p-8 rounded-xl border border-brand-gold">
              <div className="flex items-center mb-6">
                <TestTube className="w-10 h-10 text-brand-gold mr-4" />
                <h3 className="text-2xl font-serif text-brand-light-gray">
                  Ürün Kimliği Sistemi
                </h3>
              </div>
              <p className="text-brand-medium-gray leading-relaxed mb-4">
                Her ürünümüze özel ürün kimliği numarası ile müşterilerimiz:
              </p>
              <ul className="space-y-3 text-brand-medium-gray">
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2 font-bold">✓</span>
                  Ürünün hangi ustalar tarafından üretildiğini görebilir
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2 font-bold">✓</span>
                  Laboratuvar analiz raporlarına ulaşabilir
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2 font-bold">✓</span>
                  Ürünün sıfır ve orijinal olduğunu teyit edebilir
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2 font-bold">✓</span>
                  Sadece kendilerine özel üretildiğini görebilir
                </li>
              </ul>
            </div>

            <div className="bg-brand-dark-gray p-8 rounded-xl border border-brand-gold">
              <div className="flex items-center mb-6">
                <Sparkles className="w-10 h-10 text-brand-gold mr-4" />
                <h3 className="text-2xl font-serif text-brand-light-gray">
                  Kalite Garantisi
                </h3>
              </div>
              <p className="text-brand-medium-gray leading-relaxed mb-4">
                Aktürk Kuyumculuk olarak her aşamada kaliteyi garanti ediyoruz:
              </p>
              <ul className="space-y-3 text-brand-medium-gray">
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2 font-bold">✓</span>
                  Sertifikalı laboratuvar analizleri
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2 font-bold">✓</span>
                  Ayar garantisi ve belgelendirme
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2 font-bold">✓</span>
                  Uzman usta kadrosu ile üretim
                </li>
                <li className="flex items-start">
                  <span className="text-brand-gold mr-2 font-bold">✓</span>
                  Ömür boyu bakım ve onarım desteği
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-brand-dark-gray rounded-2xl p-12 border-2 border-brand-gold">
          <h2 className="text-3xl font-serif text-brand-light-gray mb-6">
            Sizin İçin Üretiyoruz
          </h2>
          <p className="text-brand-medium-gray text-lg max-w-3xl mx-auto mb-8">
            Her bir ürünümüz, geleneksel ustalık ve modern teknolojinin birleşimiyle hayat buluyor. 
            Yaşayan efsanenizi bizimle yaratın, nesilden nesile aktarın.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:05312831934" 
              className="bg-brand-gold text-brand-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-500 transition-colors text-center"
            >
              Bizi Arayın
            </a>
            <Link
              href="/urunler/bilezik"
              className="border-2 border-brand-gold text-brand-gold px-8 py-4 rounded-lg font-semibold text-lg hover:bg-brand-gold hover:text-brand-black transition-colors text-center"
            >
              Ürünleri İnceleyin
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

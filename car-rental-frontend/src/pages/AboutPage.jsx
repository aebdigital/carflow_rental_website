import { CheckIcon, ShieldCheckIcon, ClockIcon, StarIcon } from '@heroicons/react/24/outline';

const AboutPage = () => {
  const stats = [
    { label: 'Rokov skúseností', value: '15+' },
    { label: 'Spokojných zákazníkov', value: '10,000+' },
    { label: 'Vozidiel vo flotile', value: '200+' },
    { label: 'Obsluhovaných miest', value: '25+' },
  ];

  const values = [
    {
      icon: ShieldCheckIcon,
      title: 'Spoľahlivosť',
      description: 'Naše vozidlá udržujeme v najvyššom štandarde a poskytujeme 24/7 pomoc na ceste.'
    },
    {
      icon: StarIcon,
      title: 'Kvalitné služby',
      description: 'Náš tím sa venuje poskytovaniu výnimočných služieb zákazníkom a personalizovanej pozornosti.'
    },
    {
      icon: ClockIcon,
      title: 'Pohodlie',
      description: 'Jednoduché rezervácie, flexibilné miesta prevzatia a bezproblémový proces prenájmu.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              O nás
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Váš dôveryhodný partner pre prémiové služby prenájmu vozidiel na Slovensku od roku 2009
            </p>
          </div>
        </div>
      </div>

      {/* Company Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Náš príbeh</h2>
              <p className="text-gray-600 mb-6">
                AutoPožičovňa bola založená v roku 2009 a vyrastla z malého miestneho podniku 
                na jednu z najdôveryhodnejších spoločností na prenájom vozidiel na Slovensku. 
                Naša cesta začala s jednoduchou misiou: poskytovať spoľahlivé, cenovo dostupné 
                a pohodlné dopravné riešenia pre miestnych obyvateľov aj návštevníkov.
              </p>
              <p className="text-gray-600 mb-6">
                Počas rokov sme rozšírili našu flotilu o širokú škálu vozidiel, 
                od ekonomických áut až po luxusné sedany a SUV. Využili sme aj technológie 
                na to, aby sme proces prenájmu urobili čo najjednoduchší, pričom sme si 
                zachovali osobný prístup, ktorý nás odlišuje.
              </p>
              <p className="text-gray-600">
                Dnes sme hrdí na to, že ročne obslúžime tisíce zákazníkov, pomáhame im 
                objavovať Slovensko a okolie s dôverou a pohodlím.
              </p>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2026&q=80"
                alt="Kancelária autopožičovne"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-black mb-2">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-gray-800">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Naša misia</h3>
              <p className="text-gray-600">
                Poskytovať výnimočné služby prenájmu vozidiel, ktoré predčia očakávania zákazníkov 
                pri dodržiavaní najvyšších štandardov bezpečnosti, spoľahlivosti a 
                environmentálnej zodpovednosti. Snažíme sa, aby každá cesta bola nezabudnuteľná 
                a bez stresu.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Naša vízia</h3>
              <p className="text-gray-600">
                Byť poprednou spoločnosťou na prenájom vozidiel v strednej Európe, uznávanou pre 
                naše inovatívne riešenia, udržateľné praktiky a neochvejný záväzok k spokojnosti 
                zákazníkov. Predstavujeme si budúcnosť, kde je mobilita dostupná, cenovo prijateľná 
                a environmentálne zodpovedná.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Naše hodnoty</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Princípy, ktoré riadia všetko, co robíme
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-accent rounded-full mb-4">
                  <value.icon className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Spokojní zákazníci"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Prečo si vybrať AutoPožičovňu?</h2>
              <div className="space-y-4">
                {[
                  'Komplexné poistné krytie v cene',
                  'Bezplatné zrušenie až do 24 hodín pred prevzatím',
                  '24/7 zákaznícka podpora a pomoc na ceste',
                  'Žiadne skryté poplatky - transparentné ceny',
                  'Široký výber dobre udržiavaných vozidiel',
                  'Flexibilné miesta prevzatia a vrátenia',
                  'Jednoduchý online rezervačný systém',
                  'Vernostný program s exkluzívnymi výhodami'
                ].map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckIcon className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

     
      
    </div>
  );
};

export default AboutPage; 
import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

const FAQPage = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      question: "Aké dokumenty potrebujem na prenájom vozidla?",
      answer: "Potrebujete platný vodičský preukaz (vydaný minimálne pred 1 rokom), kreditnú kartu na meno hlavného vodiča a pas alebo občiansky preukaz. Zahraniční návštevníci môžu potrebovať medzinárodný vodičský preukaz."
    },
    {
      question: "Aký je minimálny vek na prenájom vozidla?",
      answer: "Minimálny vek je 21 rokov. Vodiči mladší ako 25 rokov môžu podliehať poplatkovi za mladého vodiča a majú obmedzenia na určité kategórie vozidiel."
    },
    {
      question: "Je poistenie zahrnuté v cene prenájmu?",
      answer: "Áno, základné poistenie (Collision Damage Waiver a Theft Protection) je zahrnuté vo všetkých našich cenách prenájmu. Dodatočné možnosti krytia są dostupné pre väčší pokoj."
    },
    {
      question: "Môžem zmeniť alebo zrušiť svoju rezerváciu?",
      answer: "Áno, môžete zmeniť alebo zrušiť svoju rezerváciu až do 24 hodín pred časom prevzatia bez penále. Zmeny vykonané do 24 hodín môžu podliehať poplatkom."
    },
    {
      question: "Čo sa stane, ak vrátim auto neskoro?",
      answer: "Poskytuje sa doba odkladu 29 minút. Po tomto čase vám bude účtovaný ďalší deň. Ak viete, že budete meškať, kontaktujte nás prosím pre dohodnutie predĺženia."
    },
    {
      question: "Sú tam nejaké skryté poplatky?",
      answer: "Nie, veríme v transparentné ceny. Všetky povinné poplatky sú zahrnuté v uvedenej cene. Voliteľné doplnky (GPS, detské sedačky, dodatoční vodiči) sú jasne označené s ich nákladmi."
    },
    {
      question: "Akú palivovú politiku používate?",
      answer: "Používame politiku 'Plná nádrž na plnú nádrž'. Vozidlo dostanete s plnou nádržou a mali by ste ho vrátiť s plnou nádržou. Ak nebude vrátené plné, budú účtované poplatky za doplnenie paliva."
    },
    {
      question: "Môžem pridať dodatočného vodiča?",
      answer: "Áno, dodatoční vodiči môžu byť pridaní za denný poplatok. Musia spĺňať rovnaké požiadavky ako hlavný vodič a byť prítomní počas prevzatia so svojimi dokumentmi."
    },
    {
      question: "Čo ak sa auto pokazí?",
      answer: "Všetky naše vozidlá majú 24/7 asistenčnú službu na ceste. Zavolajte na číslo uvedené vo vašich dokumentoch k prenájmu a my vám okamžite pomôžeme. Náhradné vozidlá sú poskytované v prípade potreby."
    },
    {
      question: "Ponúkate služby vyzdvihnutia a doručenia?",
      answer: "Áno, ponúkame služby vyzdvihnutia a doručenia v Bratislave a okolí za dodatočný poplatok. Vyzdvihnutie/doručenie na letisko je tiež k dispozícii."
    },
    {
      question: "Môžem vzať auto do iných krajín?",
      answer: "Cestovanie cez hranice do krajín EÚ je všeobecne povolené s predchádzajúcim oznámením a dodatočnou dokumentáciou. Prosím informujte nás počas rezervácie, ak plánujete cestovať medzinárodne."
    },
    {
      question: "Čo ak poškodím auto?",
      answer: "Nahláste akékoľvek poškodenie okamžite. So základným poistením ste zodpovedný za sumu spoluúčasti. Zvážte naše možnosti plného krytia na zníženie alebo elimináciu vašej finančnej zodpovednosti."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Často kladené otázky</h1>
          <p className="text-gray-600 mt-2">
            Nájdite odpovede na bežné otázky o našich službách prenájmu vozidiel
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm">
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg font-medium text-gray-900 pr-4">
                  {faq.question}
                </span>
                {openFAQ === index ? (
                  <ChevronUpIcon className="h-5 w-5 text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronDownIcon className="h-5 w-5 text-gray-500 flex-shrink-0" />
                )}
              </button>
              {openFAQ === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 bg-white rounded-lg shadow-sm p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Stále máte otázky?
          </h2>
          <p className="text-gray-600 mb-6">
            Náš tím zákazníckych služieb je tu pre vás 24/7
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn-primary">
              Kontaktujte nás
            </a>
            <a href="tel:+421123456789" className="btn-accent">
              Zavolajte +421 123 456 789
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage; 
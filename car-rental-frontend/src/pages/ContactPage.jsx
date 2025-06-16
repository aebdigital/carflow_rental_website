import { useState } from 'react';
import { PhoneIcon, EnvelopeIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';
import Button from '../components/Button';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Ďakujeme za vašu správu! Čoskoro sa vám ozveme.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Kontakt</h1>
          <p className="text-gray-600 mt-2">
            Kontaktujte náš tím pri akýchkoľvek otázkach alebo požiadavkách o pomoc
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Spojte sa s nami</h2>
            <p className="text-gray-600 mb-8">
              Máte otázky k našim službám? Potrebujete pomoc s rezerváciou? 
              Náš priateľský tím je tu pre vás 24/7.
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <PhoneIcon className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Telefón</h3>
                  <p className="text-gray-600">+421 123 456 789</p>
                  <p className="text-sm text-gray-500">Dostupný 24/7</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <EnvelopeIcon className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Email</h3>
                  <p className="text-gray-600">info@autopozicovna.sk</p>
                  <p className="text-sm text-gray-500">Odpovedáme do 24 hodín</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <MapPinIcon className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Adresa</h3>
                  <p className="text-gray-600">
                    Hlavná 123<br />
                    821 08 Bratislava<br />
                    Slovensko
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <ClockIcon className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Otváracie hodiny</h3>
                  <div className="text-gray-600">
                    <p>Pondelok - Piatok: 8:00 - 18:00</p>
                    <p>Sobota: 9:00 - 16:00</p>
                    <p>Nedeľa: Zatvorené</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Nájdite nás</h3>
              <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                <p className="text-gray-500">Interaktívna mapa - čoskoro</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Pošlite nám správu</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vaše meno *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="Ján Novák"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefónne číslo
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="+421 xxx xxx xxx"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Emailová adresa *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="jan@priklad.sk"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Predmet
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="">Vyberte predmet</option>
                  <option value="booking">Otázka k rezervácii</option>
                  <option value="support">Zákaznícka podpora</option>
                  <option value="feedback">Spätná väzba</option>
                  <option value="other">Iné</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Správa *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="input-field resize-none"
                  placeholder="Napíšte nám, ako vám môžeme pomôcť..."
                ></textarea>
              </div>

              <Button type="submit" fullWidth>
                Odoslať správu
              </Button>
            </form>
          </div>
        </div>

        {/* Additional Contact Options */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <PhoneIcon className="h-12 w-12 text-accent mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Zavolajte nám</h3>
            <p className="text-gray-600 mb-4">
              Pre okamžitú pomoc a podporu
            </p>
            <a href="tel:+421123456789" className="btn-accent">
              +421 123 456 789
            </a>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <EnvelopeIcon className="h-12 w-12 text-accent mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Napíšte email</h3>
            <p className="text-gray-600 mb-4">
              Odpovedáme do 24 hodín
            </p>
            <a href="mailto:info@autopozicovna.sk" className="btn-accent">
              Poslať email
            </a>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <MapPinIcon className="h-12 w-12 text-accent mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Navštívte nás</h3>
            <p className="text-gray-600 mb-4">
              Hlavná 123, Bratislava
            </p>
            <a href="/about" className="btn-accent">
              Smer k nám
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage; 
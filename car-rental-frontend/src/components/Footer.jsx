import { Link } from 'react-router-dom';
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon,
  ClockIcon 
} from '@heroicons/react/24/outline';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">AutoPožičovňa</h3>
            <p className="text-gray-300 mb-4">
              Váš spoľahlivý partner pre prenájom vozidiel. Ponúkame širokú škálu prémiových vozidiel za konkurenčné ceny.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-accent transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-accent transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.328-1.297C4.243 14.814 3.5 13.455 3.5 11.987c0-1.467.743-2.827 1.621-3.704.88-.807 2.031-1.297 3.328-1.297 1.297 0 2.448.49 3.328 1.297.878.877 1.621 2.237 1.621 3.704 0 1.468-.743 2.827-1.621 3.704-.88.807-2.031 1.297-3.328 1.297z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Rýchle odkazy</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-accent transition-colors">
                  Domov
                </Link>
              </li>
              <li>
                <Link to="/fleet" className="text-gray-300 hover:text-accent transition-colors">
                  Vozidlá
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-accent transition-colors">
                  O nás
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-accent transition-colors">
                  Kontakt
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-accent transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontakt</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <PhoneIcon className="h-5 w-5 text-accent" />
                <span className="text-gray-300">+421 123 456 789</span>
              </li>
              <li className="flex items-center space-x-3">
                <EnvelopeIcon className="h-5 w-5 text-accent" />
                <span className="text-gray-300">info@autopozicovna.sk</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPinIcon className="h-5 w-5 text-accent mt-1" />
                <span className="text-gray-300">
                  Hlavná 123<br />
                  821 08 Bratislava<br />
                  Slovensko
                </span>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Otváracie hodiny</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-3">
                <ClockIcon className="h-5 w-5 text-accent" />
                <div className="text-gray-300">
                  <div>Po - Pi: 8:00 - 18:00</div>
                  <div>So: 9:00 - 16:00</div>
                  <div>Ne: Zatvorené</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 AutoPožičovňa. Všetky práva vyhradené.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-accent text-sm transition-colors">
                Ochrana súkromia
              </a>
              <a href="#" className="text-gray-400 hover:text-accent text-sm transition-colors">
                Podmienky služby
              </a>
              <a href="#" className="text-gray-400 hover:text-accent text-sm transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
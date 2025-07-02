import { Link } from 'react-router-dom';
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon,
  ClockIcon 
} from '@heroicons/react/24/outline';
import facebookIcon from '../assets/facebook.png';
import instagramIcon from '../assets/instagram.png';
import googleIcon from '../assets/icons8-google-48.png';

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
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <a 
                  href="#" 
                  className="flex items-center space-x-1 hover:bg-gray-800 px-2 py-1 rounded transition-colors duration-200"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <img src={facebookIcon} alt="Facebook" className="h-6 w-6" />
                </a>
                <a 
                  href="#" 
                  className="flex items-center space-x-1 hover:bg-gray-800 px-2 py-1 rounded transition-colors duration-200"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <img src={instagramIcon} alt="Instagram" className="h-6 w-6" />
                </a>
              </div>
              <div className="ml-4">
                <a 
                  href="#" 
                  className="flex items-center space-x-2 bg-white text-black hover:bg-gray-100 px-3 py-2 rounded transition-colors duration-200"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <img src={googleIcon} alt="Google" className="h-4 w-4" />
                  <span className="text-sm font-medium">Recenzie</span>
                </a>
              </div>
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
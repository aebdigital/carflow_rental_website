import { PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import facebookIcon from '../assets/facebook.png';
import instagramIcon from '../assets/instagram.png';
import googleIcon from '../assets/icons8-google-48.png';

const TopBar = () => {
  return (
    <div className="bg-accent text-black py-2 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Left side - Contact buttons */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <a 
              href="tel:+421907633517" 
              className="flex items-center space-x-1 md:space-x-2 text-xs md:text-sm font-medium bg-white text-black hover:bg-gray-100 px-2 md:px-3 py-1 rounded transition-colors duration-200"
            >
              <PhoneIcon className="h-4 w-4" />
              <span className="hidden sm:inline">+421 907 633 517</span>
              <span className="sm:hidden">Call</span>
            </a>
            <a 
              href="/contact" 
              className="flex items-center space-x-1 md:space-x-2 text-xs md:text-sm font-medium bg-white text-black hover:bg-gray-100 px-2 md:px-3 py-1 rounded transition-colors duration-200"
            >
              <EnvelopeIcon className="h-4 w-4" />
              <span className="hidden md:inline">NAPÍŠTE NÁM / FORMULÁR</span>
              <span className="md:hidden">Contact</span>
            </a>
          </div>

          {/* Right side - Social media buttons */}
          <div className="flex items-center">
            <div className="flex items-center space-x-1">
              <a 
                href="#" 
                className="flex items-center space-x-1 hover:bg-white hover:text-black px-1 md:px-2 py-1 rounded transition-colors duration-200"
                target="_blank" 
                rel="noopener noreferrer"
              >
                <img src={facebookIcon} alt="Facebook" className="h-4 md:h-5 w-4 md:w-5" />
              </a>
              <a 
                href="#" 
                className="flex items-center space-x-1 hover:bg-white hover:text-black px-1 md:px-2 py-1 rounded transition-colors duration-200"
                target="_blank" 
                rel="noopener noreferrer"
              >
                <img src={instagramIcon} alt="Instagram" className="h-4 md:h-5 w-4 md:w-5" />
              </a>
            </div>
            <div className="ml-2 md:ml-3">
              <a 
                href="#" 
                className="flex items-center space-x-1 md:space-x-2 bg-white text-black hover:bg-gray-100 px-1 md:px-2 py-1 rounded transition-colors duration-200"
                target="_blank" 
                rel="noopener noreferrer"
              >
                <img src={googleIcon} alt="Google" className="h-3 md:h-4 w-3 md:w-4" />
                <span className="text-xs md:text-sm font-medium hidden sm:inline">Recenzie</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar; 
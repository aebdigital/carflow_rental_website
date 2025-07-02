import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarIcon,
  ClockIcon,
  ShieldCheckIcon,
  CurrencyEuroIcon,
  PhoneIcon,
  StarIcon,
  CheckCircleIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import Button from '../components/Button';
import CarCard from '../components/CarCard';
import { carsAPI } from '../services/api';
import headerBg from '../assets/header.webp';

const HomePage = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [carType, setCarType] = useState('');
  const [featuredCars, setFeaturedCars] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load featured cars from API
  useEffect(() => {
    const loadFeaturedCars = async () => {
      try {
        setLoading(true);
        const cars = await carsAPI.getAvailableCars();
        // Show first 3 cars as featured
        setFeaturedCars(cars.slice(0, 3));
      } catch (error) {
        console.error('Failed to load featured cars:', error);
        setFeaturedCars([]);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedCars();
  }, []);

  const features = [
    {
      icon: CheckCircleIcon,
      title: 'Najlepšie ceny',
      description: 'Konkurenčné ceny s transparentným účtovaním bez skrytých poplatkov.'
    },
    {
      icon: ClockIcon,
      title: '24/7 podpora',
      description: 'Naša zákaznícka podpora je k dispozícii kedykoľvek potrebujete pomoc.'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Plne poistené',
      description: 'Všetky naše vozidlá sú komplexne poistené pre váš pokoj.'
    }
  ];

  const testimonials = [
    {
      name: 'Peter Novák',
      rating: 5,
      comment: 'Výborná služba! Auto bolo čisté a proces rezervácie bol veľmi jednoduchý.'
    },
    {
      name: 'Mária Svobodová',
      rating: 5,
      comment: 'Profesionálny prístup a široký výber vozidiel. Určite odporúčam!'
    },
    {
      name: 'Tomáš Horváth',
      rating: 5,
      comment: 'Rýchle vybavenie a férové ceny. Už niekoľkokrát som využil ich služby.'
    }
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Redirect to fleet page with filters
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    if (carType) params.append('category', carType);
    
    window.location.href = `/fleet?${params.toString()}`;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative text-white py-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${headerBg})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Váš spoľahlivý partner pre <span className="text-accent">prenájom vozidiel</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Objavte slobodu cestovania s našou prémiovou flotilou vozidiel. 
              Od mestských áut až po luxusné SUV - máme to pravé auto pre vašu cestu.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/fleet">
                <Button size="large" className="w-full sm:w-auto">
                  Preskúmať vozidlá
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="large" className="w-full sm:w-auto text-white border-white hover:bg-white hover:text-black">
                  Zistiť viac
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      

      {/* Featured Cars Section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Odporúčané vozidlá
            </h2>
          
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-gray-200 rounded-lg h-96 animate-pulse"></div>
              ))}
            </div>
          ) : featuredCars.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredCars.map(car => (
                  <CarCard key={car._id} car={car} />
                ))}
              </div>
              <div className="text-center mt-12">
                <Link to="/fleet">
                  <Button variant="outline" size="large">
                    Zobraziť všetky vozidlá
                    <ArrowRightIcon className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Momentálne nie sú dostupné žiadne vozidlá.</p>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Prečo si vybrať nás?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              S rokmi skúseností poskytujeme najlepšie služby prenájmu vozidiel na Slovensku
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-accent bg-opacity-10 rounded-full mb-4">
                  <feature.icon className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Čo hovoria naši zákazníci
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Prečítajte si skutočné recenzie od našich spokojných zákazníkov
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.comment}"</p>
                <div className="font-semibold text-gray-900">{testimonial.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

  
    </div>
  );
};

export default HomePage; 
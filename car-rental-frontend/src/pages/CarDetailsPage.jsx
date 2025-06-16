import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  BoltIcon, 
  GlobeAltIcon, 
  CogIcon, 
  UsersIcon,
  MapPinIcon,
  CalendarIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import Button from '../components/Button';
import CarImage from '../components/CarImage';
import DatePicker from '../components/DatePicker';
import { carsAPI } from '../services/api';

const CarDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unavailableDates, setUnavailableDates] = useState([]);
  
  const [bookingData, setBookingData] = useState({
    pickupLocation: '',
    returnLocation: '',
    pickupDate: null,
    returnDate: null,
    pickupTime: '08:00',
    returnTime: '08:00',
    allowedKm: 0,
    depositOption: 'standard'
  });

  const locations = [
    'Centrum - Bratislava',
    'Letisko - M. R. Štefánika',
    'Petržalka - Bratislava',
    'Ružinov - Bratislava',
    'Nové Mesto - Bratislava'
  ];

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30'
  ];

  useEffect(() => {
    const loadCarDetails = async () => {
      try {
        setLoading(true);
        const carData = await carsAPI.getCarDetails(id);
        setCar(carData);
        
        // Load availability
        const startDate = new Date();
        const endDate = new Date();
        endDate.setMonth(endDate.getMonth() + 6);
        
        try {
          const availability = await carsAPI.getCarAvailability(id, startDate, endDate);
          setUnavailableDates(availability.unavailableDates || []);
        } catch (err) {
          console.warn('Could not load availability:', err);
        }
      } catch (err) {
        setError('Nepodarilo sa načítať detaily vozidla');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadCarDetails();
    }
  }, [id]);

  const handleInputChange = (field, value) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculatePrice = () => {
    if (!car || !bookingData.pickupDate || !bookingData.returnDate) return 0;
    const days = Math.ceil((bookingData.returnDate - bookingData.pickupDate) / (1000 * 60 * 60 * 24));
    return car.dailyRate * days;
  };

  const getDeposit = () => {
    if (!car) return 0;
    const baseDeposit = car.deposit || 1000;
    return bookingData.depositOption === 'extended' ? baseDeposit * 1.3 : baseDeposit;
  };

  const handleBookNow = () => {
    if (!bookingData.pickupDate || !bookingData.returnDate || !bookingData.pickupLocation || !bookingData.returnLocation) {
      alert('Prosím vyplňte všetky požadované údaje rezervácie');
      return;
    }
    
    const queryParams = new URLSearchParams({
      car: id,
      pickupDate: bookingData.pickupDate.toISOString().split('T')[0],
      returnDate: bookingData.returnDate.toISOString().split('T')[0],
      pickupLocation: bookingData.pickupLocation,
      returnLocation: bookingData.returnLocation
    });
    
    navigate(`/booking?${queryParams.toString()}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-accent mx-auto"></div>
          <p className="mt-4 text-gray-600">Načítavajú sa detaily vozidla...</p>
        </div>
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Vozidlo sa nenašlo</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => navigate('/fleet')}>
            Späť na flotilu
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Car Details */}
          <div className="lg:col-span-2">
            {/* Car Header */}
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {car.brand} {car.model}
              </h1>
              <p className="text-xl text-gray-600 mb-4 capitalize">{car.category}</p>
              <div className="flex items-center space-x-6 text-gray-600">
                <div className="flex items-center space-x-1">
                  <BoltIcon className="h-5 w-5" />
                  <span>110 kW</span>
                </div>
                <div className="flex items-center space-x-1">
                  <GlobeAltIcon className="h-5 w-5" />
                  <span>{car.fuelType}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CogIcon className="h-5 w-5" />
                  <span>5 l/100km</span>
                </div>
                <div className="flex items-center space-x-1">
                  <UsersIcon className="h-5 w-5" />
                  <span>{car.transmission}</span>
                </div>
              </div>
            </div>

            {/* Car Image */}
            <div className="relative rounded-2xl overflow-hidden mb-8 shadow-lg">
              {car.status === 'available' && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                    Dostupné na prenájom
                  </span>
                </div>
              )}
              <CarImage
                car={car}
                size="large"
                className="w-full h-96 object-cover"
                fallbackClass="w-full h-96 bg-gray-300 flex items-center justify-center text-gray-500"
              />
            </div>

            {/* Car Description */}
            {car.description && (
              <div className="bg-white rounded-lg p-6 mb-6 shadow-sm border">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">O tomto vozidle</h3>
                <p className="text-gray-700 leading-relaxed">{car.description}</p>
              </div>
            )}

            {/* Car Specifications */}
            <div className="bg-white rounded-lg p-6 mb-6 shadow-sm border">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Špecifikácie vozidla</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <div className="text-gray-500 text-sm font-medium">Rok</div>
                  <div className="text-lg font-semibold text-gray-900">{car.year}</div>
                </div>
                <div>
                  <div className="text-gray-500 text-sm font-medium">Sedadlá</div>
                  <div className="text-lg font-semibold text-gray-900">{car.seats}</div>
                </div>
                <div>
                  <div className="text-gray-500 text-sm font-medium">Prevodovka</div>
                  <div className="text-lg font-semibold text-gray-900">{car.transmission === 'manual' ? 'Manuálna' : car.transmission === 'automatic' ? 'Automatická' : car.transmission}</div>
                </div>
                <div>
                  <div className="text-gray-500 text-sm font-medium">Typ paliva</div>
                  <div className="text-lg font-semibold text-gray-900">{car.fuelType === 'petrol' ? 'Benzín' : car.fuelType === 'diesel' ? 'Diesel' : car.fuelType === 'electric' ? 'Elektrické' : car.fuelType === 'hybrid' ? 'Hybrid' : car.fuelType}</div>
                </div>
                {car.mileage && (
                  <div>
                    <div className="text-gray-500 text-sm font-medium">Najazdené</div>
                    <div className="text-lg font-semibold text-gray-900">{car.mileage?.toLocaleString()} km</div>
                  </div>
                )}
                {car.doors && (
                  <div>
                    <div className="text-gray-500 text-sm font-medium">Dvere</div>
                    <div className="text-lg font-semibold text-gray-900">{car.doors}</div>
                  </div>
                )}
                {car.color && (
                  <div>
                    <div className="text-gray-500 text-sm font-medium">Farba</div>
                    <div className="text-lg font-semibold text-gray-900 capitalize">{car.color}</div>
                  </div>
                )}
                <div>
                  <div className="text-gray-500 text-sm font-medium">Denná sadzba</div>
                  <div className="text-lg font-semibold text-primary">{car.dailyRate}€</div>
                </div>
              </div>
            </div>

            {/* Features */}
            {car.features && car.features.length > 0 && (
              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Vybavenie a funkcie</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {car.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span className="text-gray-700 capitalize">{feature.replace('-', ' ')}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Booking Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-lg border sticky top-24">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Rezervovať toto vozidlo</h2>
              
              <div className="space-y-4">
                {/* Pickup Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPinIcon className="h-4 w-4 inline mr-1" />
                    Miesto prevzatia
                  </label>
                  <select
                    value={bookingData.pickupLocation}
                    onChange={(e) => handleInputChange('pickupLocation', e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="">Vyberte miesto prevzatia</option>
                    {locations.map((location, index) => (
                      <option key={index} value={location}>{location}</option>
                    ))}
                  </select>
                </div>

                {/* Return Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPinIcon className="h-4 w-4 inline mr-1" />
                    Miesto vrátenia
                  </label>
                  <select
                    value={bookingData.returnLocation}
                    onChange={(e) => handleInputChange('returnLocation', e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="">Vyberte miesto vrátenia</option>
                    {locations.map((location, index) => (
                      <option key={index} value={location}>{location}</option>
                    ))}
                  </select>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <CalendarIcon className="h-4 w-4 inline mr-1" />
                      Dátum prevzatia
                    </label>
                    <DatePicker
                      selectedDate={bookingData.pickupDate}
                      onDateSelect={(date) => handleInputChange('pickupDate', date)}
                      minDate={new Date()}
                      unavailableDates={unavailableDates}
                      carId={id}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <CalendarIcon className="h-4 w-4 inline mr-1" />
                      Dátum vrátenia
                    </label>
                    <DatePicker
                      selectedDate={bookingData.returnDate}
                      onDateSelect={(date) => handleInputChange('returnDate', date)}
                      minDate={bookingData.pickupDate ? new Date(bookingData.pickupDate.getTime() + 86400000) : new Date()}
                      unavailableDates={unavailableDates}
                      carId={id}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Times */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <ClockIcon className="h-4 w-4 inline mr-1" />
                      Čas prevzatia
                    </label>
                    <select
                      value={bookingData.pickupTime}
                      onChange={(e) => handleInputChange('pickupTime', e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    >
                      {timeSlots.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <ClockIcon className="h-4 w-4 inline mr-1" />
                      Čas vrátenia
                    </label>
                    <select
                      value={bookingData.returnTime}
                      onChange={(e) => handleInputChange('returnTime', e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    >
                      {timeSlots.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Pricing Information */}
                <div className="bg-gray-50 rounded-lg p-4 space-y-3 border">
                  <h4 className="font-semibold text-gray-900">Pricing Details</h4>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Allowed kilometers:</span>
                    <span className="font-semibold text-gray-900">{bookingData.allowedKm} km</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rental price:</span>
                    <span className="font-semibold text-primary text-lg">${calculatePrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price per excess km:</span>
                    <span className="font-semibold text-gray-900">$0.30</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Deposit:</span>
                    <span className="font-semibold text-gray-900">${getDeposit().toFixed(2)}</span>
                  </div>
                </div>

                {/* Deposit Options */}
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Coverage Options</h4>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="depositOption"
                      value="standard"
                      checked={bookingData.depositOption === 'standard'}
                      onChange={(e) => handleInputChange('depositOption', e.target.value)}
                      className="text-primary focus:ring-primary"
                    />
                    <span className="text-gray-700">Standard Coverage</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="depositOption"
                      value="extended"
                      checked={bookingData.depositOption === 'extended'}
                      onChange={(e) => handleInputChange('depositOption', e.target.value)}
                      className="text-primary focus:ring-primary"
                    />
                    <span className="text-gray-700">Extended Coverage (+30% deposit)</span>
                  </label>
                </div>

                {/* Book Now Button */}
                <Button
                  onClick={handleBookNow}
                  fullWidth
                  className="mt-6"
                  disabled={car.status !== 'available'}
                >
                  {car.status === 'available' ? 'Reserve Now' : 'Currently Unavailable'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsPage; 
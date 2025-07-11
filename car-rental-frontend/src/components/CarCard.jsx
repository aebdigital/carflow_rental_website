import { Link } from 'react-router-dom';
import { 
  UsersIcon, 
  CogIcon, 
  GlobeAltIcon,
  CalendarIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import CarImage from './CarImage';

const CarCard = ({ car, selectedDates, unavailableDates = [] }) => {
  // API data structure mapping
  const {
    _id: id,
    brand,
    model,
    year,
    dailyRate,
    deposit,
    category,
    features,
    transmission,
    fuelType,
    seats,
    description,
    status
  } = car;

  // Combine brand and model for display name
  const carName = `${brand} ${model}`;
  
  // Since we're getting cars from the available cars API endpoint, assume they're available by default
  // Only show as unavailable if explicitly marked as 'unavailable' or 'maintenance'
  const isAvailable = status !== 'unavailable' && status !== 'maintenance' && status !== 'out-of-service';

  // Check if car is available for selected dates
  const isAvailableForDates = selectedDates?.pickupDate && selectedDates?.returnDate ? 
    (() => {
      const currentDate = new Date(selectedDates.pickupDate);
      while (currentDate <= selectedDates.returnDate) {
        const dateStr = currentDate.toISOString().split('T')[0];
        if (unavailableDates.includes(dateStr)) {
          return false;
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
      return true;
    })() : true;

  // Build URL with selected dates as query parameters
  const buildCarUrl = () => {
    const baseUrl = `/car/${id}`;
    if (selectedDates?.pickupDate && selectedDates?.returnDate) {
      const params = new URLSearchParams({
        pickupDate: selectedDates.pickupDate.toISOString().split('T')[0],
        returnDate: selectedDates.returnDate.toISOString().split('T')[0]
      });
      return `${baseUrl}?${params.toString()}`;
    }
    return baseUrl;
  };

  // Count unavailable dates in the next 30 days for display
  const getUnavailableDaysCount = () => {
    const today = new Date();
    const next30Days = new Date();
    next30Days.setDate(today.getDate() + 30);
    
    let count = 0;
    const currentDate = new Date(today);
    while (currentDate <= next30Days) {
      const dateStr = currentDate.toISOString().split('T')[0];
      if (unavailableDates.includes(dateStr)) {
        count++;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return count;
  };

  const unavailableDaysCount = getUnavailableDaysCount();

  return (
    <Link to={buildCarUrl()} className="block no-underline">
      <div className="card p-6 hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105">
        {/* Car Image */}
        <div className="relative mb-4">
          <CarImage
            car={car}
            size="medium"
            className="w-full h-48 object-cover rounded-lg"
          />
          <div className="absolute top-3 left-3">
            <span className="bg-accent text-black px-3 py-1 rounded-full text-sm font-medium">
              {category}
            </span>
          </div>
          {/* Only show unavailable banner for specific dates when dates are selected */}
          {selectedDates?.pickupDate && selectedDates?.returnDate && !isAvailableForDates && (
            <div className="absolute top-3 right-3">
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Rezervované
              </span>
            </div>
          )}
        </div>

        {/* Car Info */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 h-14 flex items-center leading-tight">{carName} ({year})</h3>
          
          {/* Availability Status for Selected Dates */}
          {selectedDates?.pickupDate && selectedDates?.returnDate && (
            <div className={`mb-3 p-2 rounded-md text-sm ${
              isAvailableForDates 
                ? 'bg-green-50 border border-green-200 text-green-800' 
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}>
              <div className="flex items-center space-x-1">
                {isAvailableForDates ? (
                  <>
                    <CalendarIcon className="h-4 w-4" />
                    <span>Dostupné pre vybrané dátumy</span>
                  </>
                ) : (
                  <>
                    <ExclamationTriangleIcon className="h-4 w-4" />
                    <span>Rezervované pre vybrané dátumy</span>
                  </>
                )}
              </div>
            </div>
          )}

          {/* General Availability Info - Show only if there are some reservations */}
          {!selectedDates?.pickupDate && unavailableDaysCount > 0 && (
            <div className="mb-3 p-2 bg-blue-50 border border-blue-200 rounded-md text-sm text-blue-800">
              <div className="flex items-center space-x-1">
                <CalendarIcon className="h-4 w-4" />
                <span>{unavailableDaysCount} dní rezervovaných v nasledujúcich 30 dňoch</span>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            {seats && (
              <div className="flex items-center space-x-2">
                <UsersIcon className="h-4 w-4" />
                <span>{seats} miest</span>
              </div>
            )}
            {transmission && (
              <div className="flex items-center space-x-2">
                <CogIcon className="h-4 w-4" />
                <span>{transmission === 'manual' ? 'Manuálna' : transmission === 'automatic' ? 'Automatická' : transmission}</span>
              </div>
            )}
            {fuelType && (
              <div className="flex items-center space-x-2">
                <GlobeAltIcon className="h-4 w-4" />
                <span>{fuelType === 'petrol' ? 'Benzín' : fuelType === 'diesel' ? 'Diesel' : fuelType === 'electric' ? 'Elektrické' : fuelType === 'hybrid' ? 'Hybrid' : fuelType}</span>
              </div>
            )}
            <div className="flex items-center space-x-2">
              <CalendarIcon className="h-4 w-4" />
              <span>{year}</span>
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex flex-col">
              <div>
                <span className="text-2xl font-bold text-primary">{dailyRate}€</span>
                <span className="text-gray-500 text-sm">/deň</span>
              </div>
              {deposit && (
                <span className="text-sm text-gray-600">
                  Záloha: {deposit}€
                </span>
              )}
            </div>
          </div>
          <div className="text-right">
            <div className="text-accent font-medium text-sm">
              Kliknite pre detail
            </div>
            {/* Only show unavailable message for cars that are explicitly marked as unavailable */}
            {!isAvailable && (
              <div className="text-red-500 text-xs mt-1">
                Dočasne nedostupné
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CarCard; 
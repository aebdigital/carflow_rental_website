import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FunnelIcon, AdjustmentsHorizontalIcon, CalendarIcon } from '@heroicons/react/24/outline';
import CarCard from '../components/CarCard';
import Button from '../components/Button';
import DatePicker from '../components/DatePicker';
import { carsAPI } from '../services/api';

const FleetPage = () => {
  const [searchParams] = useSearchParams();
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDates, setSelectedDates] = useState({
    pickupDate: null,
    returnDate: null
  });
  const [carAvailability, setCarAvailability] = useState({});
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    transmission: '',
    fuelType: '',
    priceRange: '',
    sortBy: 'price'
  });
  const [showFilters, setShowFilters] = useState(false);

  // Load cars from API
  useEffect(() => {
    const loadCars = async () => {
      try {
        setLoading(true);
        setError(null);
        const carsData = await carsAPI.getAvailableCars();
        setCars(carsData);
        applyFilters(carsData, filters);
        
        // Load availability for all cars for the next 6 months
        await loadCarsAvailability(carsData);
      } catch (err) {
        console.error('Failed to load cars:', err);
        setError('Failed to load cars. Please try again later.');
        setCars([]);
        setFilteredCars([]);
      } finally {
        setLoading(false);
      }
    };

    loadCars();
  }, []);

  useEffect(() => {
    applyFilters(cars, filters);
  }, [filters, cars]);

  // Re-apply filters when dates change
  useEffect(() => {
    applyFilters(cars, filters);
  }, [selectedDates, carAvailability]);

  const applyFilters = (carList, currentFilters) => {
    let filtered = [...carList];

    // First filter by date availability if dates are selected
    filtered = filterCarsByAvailability(filtered);

    // Apply category filter
    if (currentFilters.category) {
      filtered = filtered.filter(car => 
        car.category?.toLowerCase() === currentFilters.category.toLowerCase()
      );
    }

    // Apply transmission filter
    if (currentFilters.transmission) {
      filtered = filtered.filter(car => 
        car.transmission?.toLowerCase() === currentFilters.transmission.toLowerCase()
      );
    }

    // Apply fuel type filter
    if (currentFilters.fuelType) {
      filtered = filtered.filter(car => 
        car.fuelType?.toLowerCase() === currentFilters.fuelType.toLowerCase()
      );
    }

    // Apply price range filter
    if (currentFilters.priceRange) {
      const [min, max] = currentFilters.priceRange.split('-').map(Number);
      filtered = filtered.filter(car => 
        car.dailyRate >= min && (max ? car.dailyRate <= max : true)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (currentFilters.sortBy) {
        case 'price-low':
          return a.dailyRate - b.dailyRate;
        case 'price-high':
          return b.dailyRate - a.dailyRate;
        case 'name':
          return `${a.brand} ${a.model}`.localeCompare(`${b.brand} ${b.model}`);
        case 'year':
          return b.year - a.year;
        default:
          return a.dailyRate - b.dailyRate;
      }
    });

    setFilteredCars(filtered);
  };

  // Load availability for all cars
  const loadCarsAvailability = async (carList) => {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 6);

    const availabilityPromises = carList.map(async (car) => {
      try {
        const availability = await carsAPI.getCarAvailability(car._id, startDate, endDate);
        return { carId: car._id, unavailableDates: availability.unavailableDates || [] };
      } catch (error) {
        console.warn(`Failed to load availability for car ${car._id}:`, error);
        return { carId: car._id, unavailableDates: [] };
      }
    });

    const availabilityResults = await Promise.all(availabilityPromises);
    const availabilityMap = {};
    availabilityResults.forEach(({ carId, unavailableDates }) => {
      availabilityMap[carId] = unavailableDates;
    });
    
    setCarAvailability(availabilityMap);
  };

  // Handle date selection
  const handleDateSelect = (field, date) => {
    setSelectedDates(prev => {
      const updated = {
        ...prev,
        [field]: date
      };
      
      // If pickup date is selected and is after return date, clear return date
      if (field === 'pickupDate' && prev.returnDate && date >= prev.returnDate) {
        updated.returnDate = null;
      }
      
      return updated;
    });
  };

  // Filter cars based on selected dates (show only available cars for those dates)
  const filterCarsByAvailability = (carList) => {
    if (!selectedDates.pickupDate || !selectedDates.returnDate) {
      return carList; // Show all cars if no dates selected
    }

    return carList.filter(car => {
      const unavailableDates = carAvailability[car._id] || [];
      const pickupDate = selectedDates.pickupDate.toISOString().split('T')[0];
      const returnDate = selectedDates.returnDate.toISOString().split('T')[0];
      
      // Check if any date in the range is unavailable
      const currentDate = new Date(selectedDates.pickupDate);
      while (currentDate <= selectedDates.returnDate) {
        const dateStr = currentDate.toISOString().split('T')[0];
        if (unavailableDates.includes(dateStr)) {
          return false; // Car is not available for this date range
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
      
      return true; // Car is available for the entire date range
    });
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      transmission: '',
      fuelType: '',
      priceRange: '',
      sortBy: 'price'
    });
  };

  // Get unique values for filter options
  const getUniqueValues = (field) => {
    return [...new Set(cars.map(car => car[field]).filter(Boolean))];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-accent mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading vehicles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Unable to Load Fleet</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Naša flotila</h1>
          <p className="text-gray-600 mt-2">
            Vyberte si z našej širokej ponuky prémiových vozidiel ({filteredCars.length} dostupných)
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Date Selection Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <CalendarIcon className="h-5 w-5 mr-2" />
            Vyberte dátumy prenájmu
          </h3>
          <p className="text-gray-600 mb-4">
            Zvoľte si dátum prevzatia a vrátenia vozidla pre zobrazenie dostupnosti. Nedostupné dátumy budú zobrazené červeno.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dátum prevzatia
              </label>
              <DatePicker
                selectedDate={selectedDates.pickupDate}
                onDateSelect={(date) => handleDateSelect('pickupDate', date)}
                minDate={new Date()}
                unavailableDates={[]} // We'll show individual car availability in the cards
                placeholder="Vyberte dátum prevzatia"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dátum vrátenia
              </label>
              <DatePicker
                selectedDate={selectedDates.returnDate}
                onDateSelect={(date) => handleDateSelect('returnDate', date)}
                minDate={selectedDates.pickupDate ? new Date(selectedDates.pickupDate.getTime() + 86400000) : new Date()}
                unavailableDates={[]} // We'll show individual car availability in the cards
                placeholder="Vyberte dátum vrátenia"
              />
            </div>
          </div>
          
          {selectedDates.pickupDate && selectedDates.returnDate && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
              <p className="text-green-800 text-sm">
                <strong>Vybrané dátumy:</strong> {selectedDates.pickupDate.toLocaleDateString('sk-SK')} do {selectedDates.returnDate.toLocaleDateString('sk-SK')}
                ({Math.ceil((selectedDates.returnDate - selectedDates.pickupDate) / (1000 * 60 * 60 * 24))} dní)
              </p>
              <p className="text-green-700 text-xs mt-1">
                Zobrazujú sa len vozidlá dostupné pre vybrané dátumy.
              </p>
            </div>
          )}
          
          {selectedDates.pickupDate && selectedDates.returnDate && filteredCars.length === 0 && cars.length > 0 && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
              <p className="text-yellow-800 text-sm">
                <strong>Žiadne vozidlá nie sú dostupné</strong> pre vybrané dátumy. Skúste iné dátumy alebo zrušte výber pre zobrazenie všetkých vozidiel.
              </p>
              <button 
                onClick={() => setSelectedDates({ pickupDate: null, returnDate: null })}
                className="text-yellow-700 hover:text-yellow-900 text-xs underline mt-1"
              >
                Zrušiť dátumy
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <FunnelIcon className="h-5 w-5 mr-2" />
                  Filtre
                </h3>
                <button 
                  onClick={clearFilters}
                  className="text-sm text-accent hover:text-yellow-600"
                >
                  Zrušiť všetko
                </button>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kategória
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="">Všetky kategórie</option>
                  {getUniqueValues('category').map(category => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Transmission Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prevodovka
                </label>
                <select
                  value={filters.transmission}
                  onChange={(e) => handleFilterChange('transmission', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="">Všetky typy</option>
                  {getUniqueValues('transmission').map(transmission => (
                    <option key={transmission} value={transmission}>
                      {transmission === 'manual' ? 'Manuálna' : transmission === 'automatic' ? 'Automatická' : transmission.charAt(0).toUpperCase() + transmission.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Fuel Type Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Typ paliva
                </label>
                <select
                  value={filters.fuelType}
                  onChange={(e) => handleFilterChange('fuelType', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="">Všetky typy</option>
                  {getUniqueValues('fuelType').map(fuelType => (
                    <option key={fuelType} value={fuelType}>
                      {fuelType === 'petrol' ? 'Benzín' : fuelType === 'diesel' ? 'Diesel' : fuelType === 'electric' ? 'Elektrické' : fuelType === 'hybrid' ? 'Hybrid' : fuelType.charAt(0).toUpperCase() + fuelType.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Denná sadzba
                </label>
                <select
                  value={filters.priceRange}
                  onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="">Všetky ceny</option>
                  <option value="0-50">0€ - 50€</option>
                  <option value="50-100">50€ - 100€</option>
                  <option value="100-150">100€ - 150€</option>
                  <option value="150-200">150€ - 200€</option>
                  <option value="200">200€+</option>
                </select>
              </div>

              {/* Sort By */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Zoradiť podľa
                </label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="price-low">Cena: Od najnižšej</option>
                  <option value="price-high">Cena: Od najvyššej</option>
                  <option value="name">Názov: A až Z</option>
                  <option value="year">Rok: Najnovšie prvé</option>
                </select>
              </div>
            </div>
          </div>

          {/* Cars Grid */}
          <div className="lg:w-3/4">
            {filteredCars.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732L14.146 12.8l-1.179 4.456a1 1 0 01-1.934 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732L9.854 7.2l1.179-4.456A1 1 0 0112 2z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Žiadne vozidlá sa nenašli</h3>
                <p className="text-gray-500 mb-4">
                  Skúste upraviť filtre pre zobrazenie viacerých výsledkov.
                </p>
                <Button onClick={clearFilters} variant="accent">
                  Zrušiť filtre
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCars.map(car => (
                  <CarCard 
                    key={car._id} 
                    car={car} 
                    selectedDates={selectedDates}
                    unavailableDates={carAvailability[car._id] || []}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FleetPage; 
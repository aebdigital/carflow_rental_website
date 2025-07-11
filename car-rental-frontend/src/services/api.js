// Production API base URL
const API_BASE = 'https://carflow-reservation-system.onrender.com/api';

// Tenant-specific user email for all API calls
const TENANT_EMAIL = 'admin@example.com';

// Helper function to get auth token
const getToken = () => localStorage.getItem('authToken');

// Helper function to handle API responses
const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || data.error || 'API request failed');
  }
  return data;
};

// Authentication API
export const authAPI = {
  // Register a new customer
  register: async (customerData) => {
    const response = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...customerData,
        role: 'customer', // Always set to customer
      })
    });

    const result = await handleResponse(response);
    
    if (result.success) {
      localStorage.setItem('authToken', result.token);
      return result.user;
    } else {
      throw new Error(result.message);
    }
  },

  // Login customer
  login: async (email, password) => {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    });

    const result = await handleResponse(response);
    
    if (result.success) {
      localStorage.setItem('authToken', result.token);
      return result.user;
    } else {
      throw new Error(result.message);
    }
  },

  // Get current user info
  getCurrentUser: async () => {
    const token = getToken();
    if (!token) return null;

    try {
      const response = await fetch(`${API_BASE}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      const result = await handleResponse(response);
      return result.data;
    } catch (error) {
      localStorage.removeItem('authToken');
      return null;
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('authToken');
  }
};

// Cars API (Using Tenant-Specific Public Endpoints)
export const carsAPI = {
  // Get all available cars for admin@example.com tenant with advanced filtering
  getAvailableCars: async (filters = {}) => {
    const queryParams = new URLSearchParams(filters);

    const response = await fetch(`${API_BASE}/public/users/${encodeURIComponent(TENANT_EMAIL)}/cars?${queryParams}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const result = await handleResponse(response);
    console.log('Cars returned from API:', result.data?.length || 0, 'cars');
    console.log('Car data:', result.data);
    return result.data || [];
  },

  // Get single car details for admin@example.com tenant
  getCarDetails: async (carId) => {
    const response = await fetch(`${API_BASE}/public/users/${encodeURIComponent(TENANT_EMAIL)}/cars/${carId}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const result = await handleResponse(response);
    return result.data;
  },

  // Get car availability for date range for admin@example.com tenant
  getCarAvailability: async (carId, startDate, endDate) => {
    const queryParams = new URLSearchParams({
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0]
    });

    try {
      const response = await fetch(`${API_BASE}/public/users/${encodeURIComponent(TENANT_EMAIL)}/cars/${carId}/availability?${queryParams}`, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const result = await handleResponse(response);
      return result.data || { isAvailable: false, isAvailableForDates: false };
    } catch (error) {
      console.warn('Availability check failed, assuming not available:', error);
      return { isAvailable: false, isAvailableForDates: false };
    }
  },

  // Get cars by category for admin@example.com tenant
  getCarsByCategory: async (category) => {
    const response = await fetch(`${API_BASE}/public/users/${encodeURIComponent(TENANT_EMAIL)}/cars/category/${category}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const result = await handleResponse(response);
    return result.data || [];
  },

  // Get available features for admin@example.com tenant
  getAvailableFeatures: async () => {
    const response = await fetch(`${API_BASE}/public/users/${encodeURIComponent(TENANT_EMAIL)}/features`, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const result = await handleResponse(response);
    return result.data || [];
  },

  // Get car booking calendar
  getCarCalendar: async (carId, startDate = null, endDate = null, includePending = true) => {
    const queryParams = new URLSearchParams({
      includePending: includePending.toString()
    });
    
    if (startDate) queryParams.append('startDate', startDate.toISOString().split('T')[0]);
    if (endDate) queryParams.append('endDate', endDate.toISOString().split('T')[0]);

    const response = await fetch(`${API_BASE}/public/users/${encodeURIComponent(TENANT_EMAIL)}/cars/${carId}/calendar?${queryParams}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const result = await handleResponse(response);
    return result.data;
  },

  // Get reserved dates for multiple cars
  getReservedDates: async (carIds = [], startDate = null, endDate = null, includePending = true) => {
    const queryParams = new URLSearchParams({
      includePending: includePending.toString()
    });
    
    if (carIds.length > 0) queryParams.append('carIds', carIds.join(','));
    if (startDate) queryParams.append('startDate', startDate.toISOString().split('T')[0]);
    if (endDate) queryParams.append('endDate', endDate.toISOString().split('T')[0]);

    const response = await fetch(`${API_BASE}/public/users/${encodeURIComponent(TENANT_EMAIL)}/cars/reserved-dates?${queryParams}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const result = await handleResponse(response);
    return result.data;
  }
};

// Reservations API
export const reservationsAPI = {
  // Create a new reservation for admin@example.com tenant using PUBLIC endpoint
  createPublicReservation: async (reservationData) => {
    console.log('Sending reservation data to backend:', reservationData);
    
    const response = await fetch(`${API_BASE}/public/users/${encodeURIComponent(TENANT_EMAIL)}/reservations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reservationData)
    });

    const result = await handleResponse(response);
    return result.data;
  },

  // Create a new reservation (authenticated)
  create: async (reservationData) => {
    const token = getToken();
    
    const response = await fetch(`${API_BASE}/reservations`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reservationData)
    });

    const result = await handleResponse(response);
    
    if (result.success) {
      return result.data;
    } else {
      throw new Error(result.message);
    }
  },

  // Get customer's reservations
  getMyReservations: async () => {
    const token = getToken();
    
    const response = await fetch(`${API_BASE}/reservations?populate=car`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });

    const result = await handleResponse(response);
    return result.data || [];
  },

  // Cancel reservation
  cancel: async (reservationId, reason) => {
    const token = getToken();
    
    const response = await fetch(`${API_BASE}/reservations/${reservationId}/cancel`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ reason })
    });

    const result = await handleResponse(response);
    return result.data;
  }
};

// Website Settings API
export const websiteAPI = {
  // Get website settings for admin@example.com tenant
  getSettings: async () => {
    const response = await fetch(`${API_BASE}/public/users/${encodeURIComponent(TENANT_EMAIL)}/website-settings`, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const result = await handleResponse(response);
    return result.data;
  },

  // Get active info bar
  getInfoBar: async (page = 'all-pages') => {
    const queryParams = new URLSearchParams({ page });

    const response = await fetch(`${API_BASE}/public/users/${encodeURIComponent(TENANT_EMAIL)}/info-bar?${queryParams}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const result = await handleResponse(response);
    return result.data;
  },

  // Get active modal
  getModal: async (page = 'all-pages') => {
    const queryParams = new URLSearchParams({ page });

    const response = await fetch(`${API_BASE}/public/users/${encodeURIComponent(TENANT_EMAIL)}/modal?${queryParams}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const result = await handleResponse(response);
    return result.data;
  }
};

// Marketing API
export const marketingAPI = {
  // Subscribe to newsletter
  subscribeNewsletter: async (subscriberEmail, firstName = '', lastName = '') => {
    const response = await fetch(`${API_BASE}/public/users/${encodeURIComponent(TENANT_EMAIL)}/newsletter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subscriberEmail,
        firstName,
        lastName
      })
    });

    const result = await handleResponse(response);
    return result;
  },

  // Verify discount code
  verifyDiscountCode: async (code, reservationAmount, reservationDays = 1, carCategory = '') => {
    const response = await fetch(`${API_BASE}/public/users/${encodeURIComponent(TENANT_EMAIL)}/verify-discount`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code,
        reservationAmount,
        reservationDays,
        carCategory
      })
    });

    const result = await handleResponse(response);
    return result;
  }
};

// Utility functions for booking flow
export const bookingAPI = {
  // Complete booking process using tenant-specific PUBLIC API
  completeBooking: async (bookingData, customerData = null) => {
    try {
      let user = await authAPI.getCurrentUser();

      // If no user is logged in, use tenant-specific public reservation endpoint
      if (!user && customerData) {
        // Use tenant-specific public reservation API which auto-creates customer
        const publicReservationData = {
          firstName: customerData.firstName,
          lastName: customerData.lastName,
          customerEmail: customerData.email, // This will be the customer's email
          phone: customerData.phone,
          licenseNumber: customerData.licenseNumber,
          carId: bookingData.selectedCarId,
          startDate: bookingData.startDate,
          endDate: bookingData.endDate,
          pickupLocation: {
            name: bookingData.pickupLocation.name || 'Pickup Location',
            address: {
              street: bookingData.pickupLocation.address || bookingData.pickupLocation.street || '123 Main St',
              city: bookingData.pickupLocation.city || 'New York',
              state: bookingData.pickupLocation.state || 'NY',
              zipCode: bookingData.pickupLocation.postalCode || '10001',
              country: bookingData.pickupLocation.country || 'US'
            }
          },
          dropoffLocation: {
            name: bookingData.dropoffLocation.name || 'Dropoff Location',
            address: {
              street: bookingData.dropoffLocation.address || bookingData.dropoffLocation.street || '123 Main St',
              city: bookingData.dropoffLocation.city || 'New York',
              state: bookingData.dropoffLocation.state || 'NY',
              zipCode: bookingData.dropoffLocation.postalCode || '10001',
              country: bookingData.dropoffLocation.country || 'US'
            }
          },
          specialRequests: bookingData.specialRequests || '',
          discountCode: bookingData.discountCode || '',
          // Include frontend pricing override
          pricing: {
            dailyRate: bookingData.dailyRate || 50.00,
            totalAmount: bookingData.totalAmount || 250.00,
            rentalCost: bookingData.rentalCost || 250.00,
            taxes: 0.00,
            deposit: bookingData.deposit || 0.00
          },
          // Optional fields
          dateOfBirth: customerData.dateOfBirth,
          licenseExpiry: customerData.licenseExpiry,
          address: customerData.address
        };

        const result = await reservationsAPI.createPublicReservation(publicReservationData);
        
        // The public API should return reservation details and created user info
        return {
          reservation: result.reservation,
          car: result.car || await carsAPI.getCarDetails(bookingData.selectedCarId),
          costs: result.pricing || {
            rentalCost: result.reservation.totalAmount || 0,
            deposit: 0,
            totalCost: result.reservation.totalAmount || 0,
            days: Math.ceil((new Date(bookingData.endDate) - new Date(bookingData.startDate)) / (1000 * 60 * 60 * 24))
          },
          user: result.customer,
          credentials: result.loginInfo, // Login credentials for new user
          debug: result.debug // Debug information
        };
      }

      // If user is logged in, use authenticated endpoint
      if (user) {
        // Get selected car details
        const car = await carsAPI.getCarDetails(bookingData.selectedCarId);

        // Calculate costs
        const days = Math.ceil((new Date(bookingData.endDate) - new Date(bookingData.startDate)) / (1000 * 60 * 60 * 24));
        const rentalCost = car.dailyRate * days;
        const totalCost = rentalCost + (car.deposit || 0);

        // Create reservation using authenticated endpoint
        const reservation = await reservationsAPI.create({
          customer: user._id || user.id,
          car: bookingData.selectedCarId,
          startDate: new Date(bookingData.startDate).toISOString(),
          endDate: new Date(bookingData.endDate).toISOString(),
          pickupLocation: bookingData.pickupLocation,
          dropoffLocation: bookingData.dropoffLocation,
          additionalDrivers: bookingData.additionalDrivers || [],
          specialRequests: bookingData.specialRequests || ''
        });

        return {
          reservation,
          car,
          costs: {
            rentalCost,
            deposit: car.deposit || 0,
            totalCost,
            days
          },
          user
        };
      }

      throw new Error('Authentication required or customer data missing');

    } catch (error) {
      console.error('Booking failed:', error.message);
      throw error;
    }
  },

  // Calculate pricing with discount
  calculatePricing: async (carId, startDate, endDate, discountCode = null) => {
    try {
      const car = await carsAPI.getCarDetails(carId);
      const days = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
      const rentalCost = car.pricing.dailyRate * days;
      
      let pricing = {
        dailyRate: car.pricing.dailyRate,
        days: days,
        subtotal: rentalCost,
        discountAmount: 0,
        taxes: 0,
        totalAmount: rentalCost,
        deposit: car.pricing.deposit || 0
      };

      // Apply discount if provided
      if (discountCode) {
        try {
          const discountResult = await marketingAPI.verifyDiscountCode(
            discountCode, 
            rentalCost, 
            days, 
            car.category
          );
          
          if (discountResult.success && discountResult.valid) {
            pricing.discountAmount = discountResult.data.discountAmount;
            pricing.totalAmount = discountResult.data.finalAmount;
            pricing.discountInfo = discountResult.data;
          }
        } catch (error) {
          console.warn('Discount verification failed:', error);
        }
      }

      return pricing;
    } catch (error) {
      console.error('Pricing calculation failed:', error);
      throw error;
    }
  }
};

export default {
  auth: authAPI,
  cars: carsAPI,
  reservations: reservationsAPI,
  website: websiteAPI,
  marketing: marketingAPI,
  booking: bookingAPI
}; 
// Production API base URL
const API_BASE = 'https://carflow-reservation-system.onrender.com/api';

// Helper function to get auth token
const getToken = () => localStorage.getItem('authToken');

// Helper function to handle API responses
const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'API request failed');
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

// Cars API (Using Public Endpoints)
export const carsAPI = {
  // Get all available cars using PUBLIC endpoint
  getAvailableCars: async (filters = {}) => {
    const queryParams = new URLSearchParams({
      status: 'available',
      ...filters
    });

    const response = await fetch(`${API_BASE}/public/cars?${queryParams}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const result = await handleResponse(response);
    console.log('Cars returned from API:', result.data?.length || 0, 'cars');
    console.log('Car data:', result.data);
    return result.data || [];
  },

  // Get single car details using PUBLIC endpoint
  getCarDetails: async (carId) => {
    const response = await fetch(`${API_BASE}/public/cars/${carId}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const result = await handleResponse(response);
    return result.data;
  },

  // Get car availability for date range using PUBLIC endpoint
  getCarAvailability: async (carId, startDate, endDate) => {
    const queryParams = new URLSearchParams({
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0]
    });

    try {
      const response = await fetch(`${API_BASE}/public/cars/${carId}/availability?${queryParams}`, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const result = await handleResponse(response);
      return result.data || { unavailableDates: [] };
    } catch (error) {
      console.warn('Availability check failed, assuming all dates available:', error);
      return { unavailableDates: [] };
    }
  }
};

// Reservations API
export const reservationsAPI = {
  // Create a new reservation using PUBLIC endpoint
  createPublicReservation: async (reservationData) => {
    console.log('Sending reservation data to backend:', reservationData);
    
    const response = await fetch(`${API_BASE}/public/reservations`, {
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

// Utility functions for booking flow
export const bookingAPI = {
  // Complete booking process using PUBLIC API
  completeBooking: async (bookingData, customerData = null) => {
    try {
      let user = await authAPI.getCurrentUser();

      // If no user is logged in, use public reservation endpoint
      if (!user && customerData) {
        // Use public reservation API which auto-creates customer
        const publicReservationData = {
          firstName: customerData.firstName,
          lastName: customerData.lastName,
          email: customerData.email,
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
              postalCode: bookingData.pickupLocation.postalCode || '10001',
              country: bookingData.pickupLocation.country || 'US'
            }
          },
          dropoffLocation: {
            name: bookingData.dropoffLocation.name || 'Dropoff Location',
            address: {
              street: bookingData.dropoffLocation.address || bookingData.dropoffLocation.street || '123 Main St',
              city: bookingData.dropoffLocation.city || 'New York',
              state: bookingData.dropoffLocation.state || 'NY',
              postalCode: bookingData.dropoffLocation.postalCode || '10001',
              country: bookingData.dropoffLocation.country || 'US'
            }
          },
          specialRequests: bookingData.specialRequests || '',
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
          credentials: result.credentials // Login credentials for new user
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
  }
};

export default {
  auth: authAPI,
  cars: carsAPI,
  reservations: reservationsAPI,
  booking: bookingAPI
}; 
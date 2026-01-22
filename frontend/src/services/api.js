import {
  MOCK_USERS,
  MOCK_VEHICLES,
  MOCK_RESERVATIONS,
  MOCK_DEVIS,
  delay,
  findUser,
  getVehiclesByClient,
  getReservationsByClient,
  getDevisByClient,
  generateId
} from './mockData'

const USE_MOCK = true; // Change en false en Phase 2
const API_URL = 'http://localhost:5000/api';

// Auth Service
export const authService = {
  login: async (email, password) => {
    if (USE_MOCK) {
      await delay(800);
      const user = findUser(email, password);
      
      if (!user) {
        throw new Error('Email ou mot de passe incorrect');
      }
      
      return {
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        },
        token: 'mock_token_' + user.id
      };
    } else {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      if (!response.ok) throw new Error('Erreur de connexion');
      return await response.json();
    }
  },

  register: async (userData) => {
    if (USE_MOCK) {
      await delay(800);
      const newUser = {
        id: generateId(),
        ...userData,
        role: 'client',
        createdAt: new Date().toISOString()
      };
      
      MOCK_USERS.push(newUser);
      
      return {
        success: true,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role
        },
        token: 'mock_token_' + newUser.id
      };
    } else {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      
      if (!response.ok) throw new Error('Erreur inscription');
      return await response.json();
    }
  }
};

// Vehicle Service
export const vehicleService = {
  getByClient: async (clientId) => {
    if (USE_MOCK) {
      await delay(500);
      return getVehiclesByClient(clientId);
    } else {
      const response = await fetch(`${API_URL}/vehicles?clientId=${clientId}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      
      if (!response.ok) throw new Error('Erreur chargement véhicules');
      return await response.json();
    }
  },

  create: async (vehicleData) => {
    if (USE_MOCK) {
      await delay(500);
      const newVehicle = {
        id: generateId(),
        ...vehicleData,
        status: 'active'
      };
      
      MOCK_VEHICLES.push(newVehicle);
      return newVehicle;
    } else {
      const response = await fetch(`${API_URL}/vehicles`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(vehicleData)
      });
      
      if (!response.ok) throw new Error('Erreur création véhicule');
      return await response.json();
    }
  }
};

// Reservation Service
export const reservationService = {
  getByClient: async (clientId) => {
    if (USE_MOCK) {
      await delay(500);
      return getReservationsByClient(clientId);
    } else {
      const response = await fetch(`${API_URL}/reservations?clientId=${clientId}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      
      if (!response.ok) throw new Error('Erreur chargement réservations');
      return await response.json();
    }
  },

  create: async (reservationData) => {
    if (USE_MOCK) {
      await delay(800);
      const newReservation = {
        id: generateId(),
        ...reservationData,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      
      MOCK_RESERVATIONS.push(newReservation);
      return newReservation;
    } else {
      const response = await fetch(`${API_URL}/reservations`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(reservationData)
      });
      
      if (!response.ok) throw new Error('Erreur création réservation');
      return await response.json();
    }
  }
};

// Devis Service
export const devisService = {
  getByClient: async (clientId) => {
    if (USE_MOCK) {
      await delay(500);
      return getDevisByClient(clientId);
    } else {
      const response = await fetch(`${API_URL}/devis?clientId=${clientId}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      
      if (!response.ok) throw new Error('Erreur chargement devis');
      return await response.json();
    }
  }
};
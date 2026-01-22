export const MOCK_USERS = [
  {
    id: 1,
    name: "yassine",
    email: "test@test.com",
    password: "123456",
    phone: "+216 12 345 678",
    role: "client",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    name: "Admin",
    email: "admin@autoexpert.tn",
    password: "admin123",
    role: "admin",
    createdAt: "2024-01-01",
  },
];

export const MOCK_VEHICLES = [
  {
    id: 1,
    clientId: 1,
    brand: "Renault",
    model: "Clio",
    year: 2020,
    plate: "123 TU 4567",
    km: 45000,
    status: "active",
  },
  {
    id: 2,
    clientId: 1,
    brand: "Peugeot",
    model: "208",
    year: 2019,
    plate: "456 TU 7890",
    km: 62000,
    status: "active",
  },
];

export const MOCK_RESERVATIONS = [
  {
    id: 1,
    clientId: 1,
    vehicleId: 1,
    service: "Vidange complète",
    department: "mecanique",
    date: "2026-01-25",
    time: "10:00",
    status: "confirmed",
    description: "Vidange moteur + filtres",
    createdAt: "2026-01-10",
  },
];

export const MOCK_DEVIS = [
  {
    id: 1,
    reservationId: 1,
    clientId: 1,
    title: "Vidange + filtres",
    amount: 120,
    status: "accepted",
    date: "2026-01-15",
    vehicle: "Renault Clio",
    items: [
      { name: "Huile moteur 5L", price: 60 },
      { name: "Filtre à huile", price: 20 },
      { name: "Filtre à air", price: 15 },
      { name: "Main d'œuvre", price: 25 },
    ],
    generatedByAI: false,
  },
];

export const delay = (ms = 500) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const findUser = (email, password) => {
  return MOCK_USERS.find((u) => u.email === email && u.password == password);
};

export const getVehiclesByClient = (clientId) => {
  return MOCK_VEHICLES.filter((v) => v.clientId === clientId);
};

export const getReservationsByClient = (clientId) => {
  return MOCK_RESERVATIONS.filter((r) => r.clientId === clientId).map(
    (reservation) => {
      const vehicle = MOCK_VEHICLES.find((v) => v.id === reservation.vehicleId);
      return {
        ...reservation,
        vehicleName: vehicle
          ? `${vehicle.brand} ${vehicle.model}`
          : "Vehicule inconnu",
      };
    },
  );
};

export const getDevisByClient = (clientId) => {
  return MOCK_DEVIS.filter(d => d.clientId === clientId);
};

export const generateId = () => Date.now();
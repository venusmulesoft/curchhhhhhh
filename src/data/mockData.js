// Mock Users for WeredaBetekihinet
export const mockUsers = [
  {
    id: 1,
    username: 'wereda_admin',
    password: 'password123',
    role: 'wereda_admin',
    name: 'Abebe Kebede',
    email: 'abebe@wereda.org',
    phone: '+251911234567',
    WeredaBetekihinet: {
      id: 1,
      name: 'St. Mary Church',
      address: {
        region: 'Addis Ababa',
        zone: 'Central',
        woreda: 'Kolfe Keranio',
        kebele: 'Kebele 01'
      }
    },
    isActive: true,
    lastLogin: new Date('2024-01-15T10:30:00Z')
  },
  {
    id: 2,
    username: 'admin',
    password: 'admin123',
    role: 'Admin',
    name: 'Tigist Haile',
    email: 'tigist@wereda.org',
    phone: '+251922345678',
    WeredaBetekihinet: {
      id: 1,
      name: 'St. Mary Church',
      address: {
        region: 'Addis Ababa',
        zone: 'Central',
        woreda: 'Kolfe Keranio',
        kebele: 'Kebele 01'
      }
    },
    isActive: true,
    lastLogin: new Date('2024-01-15T09:15:00Z')
  }
];

// Mock Hageresibket (Super Admin)
export const mockHageresibket = [
  {
    id: 1,
    name: 'Addis Ababa Diocese',
    superAdminUsername: 'diocese_admin',
    superAdminPassword: 'diocese123',
    superAdminEmail: 'admin@diocese.org',
    contactInfo: {
      phone: '+251933456789',
      address: {
        region: 'Addis Ababa',
        zone: 'Central',
        city: 'Addis Ababa',
        street: 'Church Street 123'
      }
    },
    weredaBetekihinetList: [1, 2, 3],
    permissions: {
      canCreateWereda: true,
      canDeleteWereda: true,
      canModifyWereda: true,
      canViewAllData: true,
      canManageUsers: true,
      canSystemSettings: true
    },
    isActive: true,
    lastLogin: new Date('2024-01-15T08:00:00Z')
  }
];

// Mock WeredaBetekihinet
export const mockWeredaBetekihinet = [
  {
    id: 1,
    name: 'St. Mary Church',
    address: {
      region: 'Addis Ababa',
      zone: 'Central',
      woreda: 'Kolfe Keranio',
      kebele: 'Kebele 01'
    },
    hageresibket: 1,
    isActive: true,
    createdAt: new Date('2023-01-01T00:00:00Z')
  },
  {
    id: 2,
    name: 'St. Gabriel Church',
    address: {
      region: 'Addis Ababa',
      zone: 'Central',
      woreda: 'Yeka',
      kebele: 'Kebele 02'
    },
    hageresibket: 1,
    isActive: true,
    createdAt: new Date('2023-02-01T00:00:00Z')
  },
  {
    id: 3,
    name: 'St. Michael Church',
    address: {
      region: 'Addis Ababa',
      zone: 'Central',
      woreda: 'Bole',
      kebele: 'Kebele 03'
    },
    hageresibket: 1,
    isActive: true,
    createdAt: new Date('2023-03-01T00:00:00Z')
  }
];

// Mock Atbiya (Church Workers)
export const mockAtbiya = [
  {
    id: 1,
    name: 'Father Yohannes',
    role: 'Priest',
    phone: '+251944567890',
    email: 'yohannes@church.org',
    weredaBetekihinet: 1,
    isActive: true,
    createdAt: new Date('2023-01-15T00:00:00Z')
  },
  {
    id: 2,
    name: 'Deacon Mariam',
    role: 'Deacon',
    phone: '+251955678901',
    email: 'mariam@church.org',
    weredaBetekihinet: 1,
    isActive: true,
    createdAt: new Date('2023-02-15T00:00:00Z')
  },
  {
    id: 3,
    name: 'Sunday School Teacher',
    role: 'Sunday School Teacher',
    phone: '+251966789012',
    email: 'teacher@church.org',
    weredaBetekihinet: 1,
    isActive: true,
    createdAt: new Date('2023-03-15T00:00:00Z')
  }
];

// Mock Believers
export const mockBelievers = [
  {
    id: 1,
    firstName: 'Kebede',
    lastName: 'Alemu',
    gender: 'Male',
    dateOfBirth: new Date('1980-05-15T00:00:00Z'),
    phone: '+251977890123',
    email: 'kebede@email.com',
    address: {
      region: 'Addis Ababa',
      zone: 'Central',
      woreda: 'Kolfe Keranio',
      kebele: 'Kebele 01',
      houseNumber: '123'
    },
    role: 'Church Member',
    weredaBetekihinet: 1,
    atbiya: 1,
    isActive: true,
    createdAt: new Date('2023-01-20T00:00:00Z')
  },
  {
    id: 2,
    firstName: 'Tigist',
    lastName: 'Haile',
    gender: 'Female',
    dateOfBirth: new Date('1985-08-20T00:00:00Z'),
    phone: '+251988901234',
    email: 'tigist@email.com',
    address: {
      region: 'Addis Ababa',
      zone: 'Central',
      woreda: 'Kolfe Keranio',
      kebele: 'Kebele 01',
      houseNumber: '456'
    },
    role: 'Sunday School Student',
    weredaBetekihinet: 1,
    atbiya: 3,
    isActive: true,
    createdAt: new Date('2023-02-20T00:00:00Z')
  },
  {
    id: 3,
    firstName: 'Abebe',
    lastName: 'Tessema',
    gender: 'Male',
    dateOfBirth: new Date('1990-12-10T00:00:00Z'),
    phone: '+251999012345',
    email: 'abebe@email.com',
    address: {
      region: 'Addis Ababa',
      zone: 'Central',
      woreda: 'Kolfe Keranio',
      kebele: 'Kebele 01',
      houseNumber: '789'
    },
    role: 'Church Member',
    weredaBetekihinet: 1,
    atbiya: 1,
    isActive: true,
    createdAt: new Date('2023-03-20T00:00:00Z')
  }
];

// Mock Baptisms
export const mockBaptisms = [
  {
    id: 1,
    believer: 1,
    baptismDate: new Date('2023-06-15T00:00:00Z'),
    baptismPlace: 'St. Mary Church',
    priest: 'Father Yohannes',
    godfather: 'Ato Haile',
    godmother: 'Wro Tigist',
    weredaBetekihinet: 1,
    isActive: true,
    createdAt: new Date('2023-06-15T00:00:00Z')
  },
  {
    id: 2,
    believer: 2,
    baptismDate: new Date('2023-07-20T00:00:00Z'),
    baptismPlace: 'St. Mary Church',
    priest: 'Father Yohannes',
    godfather: 'Ato Abebe',
    godmother: 'Wro Mariam',
    weredaBetekihinet: 1,
    isActive: true,
    createdAt: new Date('2023-07-20T00:00:00Z')
  }
];

// Mock Marriages
export const mockMarriages = [
  {
    id: 1,
    groom: 1,
    bride: 2,
    marriageDate: new Date('2023-09-10T00:00:00Z'),
    marriagePlace: 'St. Mary Church',
    priest: 'Father Yohannes',
    witnesses: ['Ato Haile', 'Wro Mariam'],
    weredaBetekihinet: 1,
    isActive: true,
    createdAt: new Date('2023-09-10T00:00:00Z')
  }
];

// Mock Deaths
export const mockDeaths = [
  {
    id: 1,
    believer: 3,
    deathDate: new Date('2023-11-05T00:00:00Z'),
    deathPlace: 'Addis Ababa',
    causeOfDeath: 'Natural causes',
    burialDate: new Date('2023-11-07T00:00:00Z'),
    burialPlace: 'St. Mary Cemetery',
    weredaBetekihinet: 1,
    isActive: true,
    createdAt: new Date('2023-11-05T00:00:00Z')
  }
];

// Mock Statistics
export const mockStatistics = {
  totalBelievers: 150,
  totalAtbiya: 8,
  totalBaptisms: 25,
  totalMarriages: 12,
  totalDeaths: 3,
  believersByRole: {
    'Church Member': 80,
    'Sunday School Student': 45,
    'Sunday School Teacher': 15,
    'Deacon': 5,
    'Priest': 5
  },
  believersByGender: {
    'Male': 75,
    'Female': 75
  },
  monthlyBaptisms: [
    { month: 'Jan', count: 2 },
    { month: 'Feb', count: 3 },
    { month: 'Mar', count: 1 },
    { month: 'Apr', count: 4 },
    { month: 'May', count: 2 },
    { month: 'Jun', count: 3 },
    { month: 'Jul', count: 2 },
    { month: 'Aug', count: 1 },
    { month: 'Sep', count: 2 },
    { month: 'Oct', count: 3 },
    { month: 'Nov', count: 1 },
    { month: 'Dec', count: 1 }
  ],
  monthlyMarriages: [
    { month: 'Jan', count: 1 },
    { month: 'Feb', count: 0 },
    { month: 'Mar', count: 2 },
    { month: 'Apr', count: 1 },
    { month: 'May', count: 0 },
    { month: 'Jun', count: 1 },
    { month: 'Jul', count: 2 },
    { month: 'Aug', count: 0 },
    { month: 'Sep', count: 1 },
    { month: 'Oct', count: 2 },
    { month: 'Nov', count: 1 },
    { month: 'Dec', count: 1 }
  ]
};

// Mock Hageresibket Statistics
export const mockHageresibketStats = {
  totalWeredaBetekihinet: 3,
  totalBelievers: 450,
  totalAtbiya: 24,
  totalBaptisms: 75,
  totalMarriages: 36,
  totalDeaths: 9,
  weredaStats: [
    {
      id: 1,
      name: 'St. Mary Church',
      believers: 150,
      atbiya: 8,
      baptisms: 25,
      marriages: 12,
      deaths: 3
    },
    {
      id: 2,
      name: 'St. Gabriel Church',
      believers: 160,
      atbiya: 9,
      baptisms: 28,
      marriages: 15,
      deaths: 4
    },
    {
      id: 3,
      name: 'St. Michael Church',
      believers: 140,
      atbiya: 7,
      baptisms: 22,
      marriages: 9,
      deaths: 2
    }
  ]
};

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
    lastLogin: new Date('2024-01-15T10:30:00Z'),
    createdAt: new Date('2023-01-01T00:00:00Z')
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
    lastLogin: new Date('2024-01-15T09:15:00Z'),
    createdAt: new Date('2023-01-15T00:00:00Z')
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
    lastLogin: new Date('2024-01-15T08:00:00Z'),
    createdAt: new Date('2022-01-01T00:00:00Z')
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
    phone: '+251911111111',
    email: 'stmary@church.org',
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
    phone: '+251922222222',
    email: 'stgabriel@church.org',
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
    phone: '+251933333333',
    email: 'stmichael@church.org',
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
    role: 'priest',
    phone: '+251944567890',
    email: 'yohannes@church.org',
    weredaBetekihinet: 1,
    location: 'St. Mary Church',
    status: 'active',
    believerCount: 45,
    isActive: true,
    createdAt: new Date('2023-01-15T00:00:00Z')
  },
  {
    id: 2,
    name: 'Deacon Mariam',
    role: 'deacon',
    phone: '+251955678901',
    email: 'mariam@church.org',
    weredaBetekihinet: 1,
    location: 'St. Mary Church',
    status: 'active',
    believerCount: 32,
    isActive: true,
    createdAt: new Date('2023-02-15T00:00:00Z')
  },
  {
    id: 3,
    name: 'Teacher Alemayehu',
    role: 'sunday_school_teacher',
    phone: '+251966789012',
    email: 'alemayehu@church.org',
    weredaBetekihinet: 1,
    location: 'St. Mary Church',
    status: 'active',
    believerCount: 28,
    isActive: true,
    createdAt: new Date('2023-03-15T00:00:00Z')
  }
];

// Mock Believers
export const mockBelievers = [
  {
    id: 1,
    name: 'Kebede Alemu',
    role: 'adult',
    gender: 'male',
    dateOfBirth: '1980-05-15',
    phone: '+251977890123',
    email: 'kebede@email.com',
    idNumber: 'AA123456B',
    address: 'Kolfe Keranio, Kebele 01, House 123',
    atbiyaId: 1,
    status: 'active',
    weredaBetekihinet: 1,
    isActive: true,
    createdAt: new Date('2023-01-20T00:00:00Z')
  },
  {
    id: 2,
    name: 'Tigist Haile',
    role: 'youth',
    gender: 'female',
    dateOfBirth: '1995-08-20',
    phone: '+251988901234',
    email: 'tigist@email.com',
    idNumber: 'AA234567C',
    address: 'Kolfe Keranio, Kebele 01, House 456',
    atbiyaId: 3,
    status: 'active',
    weredaBetekihinet: 1,
    isActive: true,
    createdAt: new Date('2023-02-20T00:00:00Z')
  },
  {
    id: 3,
    name: 'Abebe Tessema',
    role: 'elder',
    gender: 'male',
    dateOfBirth: '1950-12-10',
    phone: '+251999012345',
    email: 'abebe@email.com',
    idNumber: 'AA345678D',
    address: 'Kolfe Keranio, Kebele 01, House 789',
    atbiyaId: 1,
    status: 'active',
    weredaBetekihinet: 1,
    isActive: true,
    createdAt: new Date('2023-03-20T00:00:00Z')
  }
];

// Mock Baptisms
export const mockBaptisms = [
  {
    id: 1,
    believerName: 'Tigist Haile',
    believerAge: 28,
    baptismNumber: 'BAP2024001',
    baptismDate: '2024-06-15',
    baptismPlace: 'St. Mary Church',
    location: 'St. Mary Church',
    atbiyaId: 1,
    priest: 'Father Yohannes',
    godfather: 'Ato Haile',
    godmother: 'Wro Tigist',
    weredaBetekihinet: 1,
    status: 'completed',
    notes: 'Beautiful ceremony with family present',
    isActive: true,
    createdAt: new Date('2024-06-15T00:00:00Z')
  },
  {
    id: 2,
    believerName: 'Abebe Tessema',
    believerAge: 25,
    baptismNumber: 'BAP2024002',
    baptismDate: '2024-07-20',
    baptismPlace: 'St. Mary Church',
    location: 'St. Mary Church',
    atbiyaId: 1,
    priest: 'Father Yohannes',
    godfather: 'Ato Abebe',
    godmother: 'Wro Mariam',
    weredaBetekihinet: 1,
    status: 'completed',
    notes: 'Joyful celebration',
    isActive: true,
    createdAt: new Date('2024-07-20T00:00:00Z')
  }
];

// Mock Marriages
export const mockMarriages = [
  {
    id: 1,
    groomName: 'Kebede Alemu',
    groomAge: 30,
    brideName: 'Tigist Haile',
    brideAge: 28,
    marriageNumber: 'MAR2024001',
    marriageDate: '2024-09-10',
    marriagePlace: 'St. Mary Church',
    location: 'St. Mary Church',
    atbiyaId: 1,
    priest: 'Father Yohannes',
    witnesses: ['Ato Haile', 'Wro Mariam'],
    weredaBetekihinet: 1,
    status: 'completed',
    notes: 'Beautiful wedding ceremony',
    isActive: true,
    createdAt: new Date('2024-09-10T00:00:00Z')
  }
];

// Mock Deaths
export const mockDeaths = [
  {
    id: 1,
    believerName: 'Abebe Tessema',
    believerAge: 73,
    deathNumber: 'DEA2024001',
    deathDate: '2024-11-05',
    funeralDate: '2024-11-07',
    deathPlace: 'Addis Ababa',
    location: 'St. Mary Cemetery',
    causeOfDeath: 'Natural causes',
    burialDate: '2024-11-07',
    burialPlace: 'St. Mary Cemetery',
    atbiyaId: 1,
    weredaBetekihinet: 1,
    status: 'completed',
    notes: 'Peaceful passing, well attended funeral',
    isActive: true,
    createdAt: new Date('2024-11-05T00:00:00Z')
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
    'elder': 25,
    'adult': 80,
    'youth': 35,
    'child': 10
  },
  believersByGender: {
    'male': 75,
    'female': 75
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
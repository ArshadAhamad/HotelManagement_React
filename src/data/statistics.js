// Mock data for hotel statistics and analytics

// Overall hotel statistics
const hotelStats = {
  totalBookings: 156,
  pendingBookings: 23,
  occupiedRooms: 42,
  availableRooms: 58,
  revenue: 28750,
  customers: 89,
  averageStay: 3.2, // days
  occupancyRate: 72, // percentage
};

// Revenue data for charts
const revenueData = {
  monthly: [
    { month: 'Jan', revenue: 24500 },
    { month: 'Feb', revenue: 22800 },
    { month: 'Mar', revenue: 25600 },
    { month: 'Apr', revenue: 27300 },
    { month: 'May', revenue: 26900 },
    { month: 'Jun', revenue: 28750 },
    { month: 'Jul', revenue: 0 },
    { month: 'Aug', revenue: 0 },
    { month: 'Sep', revenue: 0 },
    { month: 'Oct', revenue: 0 },
    { month: 'Nov', revenue: 0 },
    { month: 'Dec', revenue: 0 }
  ],
  weekly: [
    { day: 'Mon', revenue: 3850 },
    { day: 'Tue', revenue: 4200 },
    { day: 'Wed', revenue: 4500 },
    { day: 'Thu', revenue: 5100 },
    { day: 'Fri', revenue: 5800 },
    { day: 'Sat', revenue: 6200 },
    { day: 'Sun', revenue: 5600 }
  ]
};

// Occupancy data for charts
const occupancyData = {
  monthly: [
    { month: 'Jan', rate: 65 },
    { month: 'Feb', rate: 68 },
    { month: 'Mar', rate: 72 },
    { month: 'Apr', rate: 75 },
    { month: 'May', rate: 70 },
    { month: 'Jun', rate: 72 },
    { month: 'Jul', rate: 0 },
    { month: 'Aug', rate: 0 },
    { month: 'Sep', rate: 0 },
    { month: 'Oct', rate: 0 },
    { month: 'Nov', rate: 0 },
    { month: 'Dec', rate: 0 }
  ],
  roomTypes: [
    { type: 'Standard Room', rate: 68 },
    { type: 'Deluxe Ocean View', rate: 85 },
    { type: 'Premium Suite', rate: 72 },
    { type: 'Executive Room', rate: 65 },
    { type: 'Family Suite', rate: 78 }
  ]
};

// Customer satisfaction data
const satisfactionData = {
  overall: 4.7,
  categories: [
    { category: 'Cleanliness', rating: 4.8 },
    { category: 'Service', rating: 4.7 },
    { category: 'Amenities', rating: 4.5 },
    { category: 'Location', rating: 4.9 },
    { category: 'Value', rating: 4.6 }
  ],
  trends: [
    { month: 'Jan', rating: 4.5 },
    { month: 'Feb', rating: 4.6 },
    { month: 'Mar', rating: 4.6 },
    { month: 'Apr', rating: 4.7 },
    { month: 'May', rating: 4.7 },
    { month: 'Jun', rating: 4.7 }
  ]
};

// Recent reviews
const recentReviews = [
  {
    id: 'R1001',
    guest: 'John Smith',
    rating: 5,
    comment: 'Excellent stay! The ocean view room was spectacular and the staff was incredibly helpful.',
    date: '2023-06-18',
    bookingId: 'B1001'
  },
  {
    id: 'R1002',
    guest: 'Emily Davis',
    rating: 4,
    comment: 'Great family suite, very spacious. The kids loved the pool area. Breakfast could have more options.',
    date: '2023-06-19',
    bookingId: 'B1004'
  },
  {
    id: 'R1003',
    guest: 'Michael Chen',
    rating: 5,
    comment: 'Perfect location and amazing service. The concierge was particularly helpful with restaurant recommendations.',
    date: '2023-06-15',
    bookingId: 'B995'
  },
  {
    id: 'R1004',
    guest: 'Sarah Johnson',
    rating: 4,
    comment: 'Beautiful premium suite with great amenities. The spa service was excellent.',
    date: '2023-06-12',
    bookingId: 'B982'
  },
  {
    id: 'R1005',
    guest: 'Robert Wilson',
    rating: 3,
    comment: 'Room was clean but the AC was a bit noisy. Staff was responsive when we reported the issue.',
    date: '2023-06-17',
    bookingId: 'B998'
  }
];

// Inventory status
const inventoryStatus = {
  amenities: [
    { item: 'Towels', inStock: 450, reorderLevel: 200, lastRestocked: '2023-06-15' },
    { item: 'Toiletries', inStock: 320, reorderLevel: 150, lastRestocked: '2023-06-10' },
    { item: 'Bed Linens', inStock: 210, reorderLevel: 100, lastRestocked: '2023-06-05' },
    { item: 'Bathrobes', inStock: 95, reorderLevel: 50, lastRestocked: '2023-05-28' },
    { item: 'Mini Bar Items', inStock: 180, reorderLevel: 100, lastRestocked: '2023-06-12' }
  ],
  maintenance: [
    { item: 'Light Bulbs', inStock: 85, reorderLevel: 30, lastRestocked: '2023-06-08' },
    { item: 'Air Filters', inStock: 42, reorderLevel: 20, lastRestocked: '2023-05-30' },
    { item: 'Cleaning Supplies', inStock: 110, reorderLevel: 50, lastRestocked: '2023-06-14' }
  ]
};

export { 
  hotelStats, 
  revenueData, 
  occupancyData, 
  satisfactionData, 
  recentReviews,
  inventoryStatus 
};
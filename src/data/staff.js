// Mock data for hotel staff
const staff = [
  {
    id: 4,
    firstName: 'James',
    lastName: 'Wilson',
    email: 'frontdesk@baypalace.com',
    role: 'staff',
    department: 'Front Desk',
    position: 'Front Desk Manager',
    phone: '555-123-4567',
    hireDate: '2021-03-15',
    schedule: 'Morning Shift (7 AM - 3 PM)',
    status: 'active',
    lastLogin: '2023-06-19 07:30'
  },
  {
    id: 5,
    firstName: 'Maria',
    lastName: 'Rodriguez',
    email: 'housekeeping@baypalace.com',
    role: 'staff',
    department: 'Housekeeping',
    position: 'Housekeeping Manager',
    phone: '555-123-4568',
    hireDate: '2020-11-10',
    schedule: 'Morning Shift (6 AM - 2 PM)',
    status: 'active',
    lastLogin: '2023-06-19 06:50'
  },
  {
    id: 12,
    firstName: 'Robert',
    lastName: 'Johnson',
    email: 'maintenance@baypalace.com',
    role: 'staff',
    department: 'Maintenance',
    position: 'Maintenance Technician',
    phone: '555-123-4569',
    hireDate: '2022-01-05',
    schedule: 'Day Shift (9 AM - 5 PM)',
    status: 'active',
    lastLogin: '2023-06-19 08:15'
  },
  {
    id: 13,
    firstName: 'Susan',
    lastName: 'Chen',
    email: 'housekeeping-sup@baypalace.com',
    role: 'staff',
    department: 'Housekeeping',
    position: 'Housekeeping Supervisor',
    phone: '555-123-4570',
    hireDate: '2021-06-22',
    schedule: 'Morning Shift (6 AM - 2 PM)',
    status: 'active',
    lastLogin: '2023-06-19 06:45'
  },
  {
    id: 14,
    firstName: 'Michael',
    lastName: 'Garcia',
    email: 'concierge@baypalace.com',
    role: 'staff',
    department: 'Concierge',
    position: 'Head Concierge',
    phone: '555-123-4571',
    hireDate: '2021-09-15',
    schedule: 'Afternoon Shift (3 PM - 11 PM)',
    status: 'active',
    lastLogin: '2023-06-19 14:30'
  },
  {
    id: 15,
    firstName: 'Jennifer',
    lastName: 'Taylor',
    email: 'restaurant@baypalace.com',
    role: 'staff',
    department: 'Food & Beverage',
    position: 'Restaurant Manager',
    phone: '555-123-4572',
    hireDate: '2022-02-10',
    schedule: 'Split Shift (10 AM - 2 PM, 5 PM - 9 PM)',
    status: 'active',
    lastLogin: '2023-06-19 09:45'
  },
  {
    id: 16,
    firstName: 'David',
    lastName: 'Brown',
    email: 'security@baypalace.com',
    role: 'staff',
    department: 'Security',
    position: 'Security Officer',
    phone: '555-123-4573',
    hireDate: '2022-04-01',
    schedule: 'Night Shift (11 PM - 7 AM)',
    status: 'active',
    lastLogin: '2023-06-19 00:15'
  },
  {
    id: 17,
    firstName: 'Lisa',
    lastName: 'Martinez',
    email: 'spa@baypalace.com',
    role: 'staff',
    department: 'Spa & Wellness',
    position: 'Spa Manager',
    phone: '555-123-4574',
    hireDate: '2021-08-15',
    schedule: 'Day Shift (9 AM - 5 PM)',
    status: 'active',
    lastLogin: '2023-06-19 08:50'
  },
  {
    id: 18,
    firstName: 'Kevin',
    lastName: 'Lee',
    email: 'it@baypalace.com',
    role: 'staff',
    department: 'IT',
    position: 'IT Support Specialist',
    phone: '555-123-4575',
    hireDate: '2022-03-01',
    schedule: 'Day Shift (8 AM - 4 PM)',
    status: 'active',
    lastLogin: '2023-06-19 07:55'
  },
  {
    id: 19,
    firstName: 'Sarah',
    lastName: 'Wilson',
    email: 'events@baypalace.com',
    role: 'staff',
    department: 'Events',
    position: 'Events Coordinator',
    phone: '555-123-4576',
    hireDate: '2021-11-15',
    schedule: 'Flexible Schedule',
    status: 'active',
    lastLogin: '2023-06-19 10:30'
  }
];

// Staff departments for filtering and organization
const departments = [
  { id: 1, name: 'Front Desk', staffCount: 3 },
  { id: 2, name: 'Housekeeping', staffCount: 8 },
  { id: 3, name: 'Maintenance', staffCount: 4 },
  { id: 4, name: 'Food & Beverage', staffCount: 12 },
  { id: 5, name: 'Concierge', staffCount: 2 },
  { id: 6, name: 'Security', staffCount: 5 },
  { id: 7, name: 'Spa & Wellness', staffCount: 6 },
  { id: 8, name: 'Events', staffCount: 3 },
  { id: 9, name: 'IT', staffCount: 2 }
];

// Staff performance metrics
const staffPerformance = [
  { 
    staffId: 4, 
    metrics: {
      tasksCompleted: 45,
      avgCompletionTime: 22, // minutes
      customerRating: 4.8,
      attendanceRate: 98 // percentage
    },
    recentFeedback: [
      { date: '2023-06-15', comment: 'Excellent customer service with VIP guest', rating: 5 },
      { date: '2023-06-10', comment: 'Handled difficult situation professionally', rating: 5 },
      { date: '2023-06-05', comment: 'Slightly delayed in responding to guest request', rating: 4 }
    ]
  },
  { 
    staffId: 5, 
    metrics: {
      tasksCompleted: 78,
      avgCompletionTime: 35, // minutes
      customerRating: 4.6,
      attendanceRate: 100 // percentage
    },
    recentFeedback: [
      { date: '2023-06-18', comment: 'Rooms exceptionally clean', rating: 5 },
      { date: '2023-06-12', comment: 'Good management of housekeeping team', rating: 4 },
      { date: '2023-06-07', comment: 'Responded quickly to urgent cleaning request', rating: 5 }
    ]
  },
  { 
    staffId: 12, 
    metrics: {
      tasksCompleted: 32,
      avgCompletionTime: 45, // minutes
      customerRating: 4.5,
      attendanceRate: 95 // percentage
    },
    recentFeedback: [
      { date: '2023-06-17', comment: 'Fixed AC issue quickly', rating: 5 },
      { date: '2023-06-11', comment: 'Maintenance work was thorough', rating: 4 },
      { date: '2023-06-03', comment: 'Slightly messy after repair work', rating: 3 }
    ]
  }
];

export { staff, departments, staffPerformance };
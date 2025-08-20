// Mock data for staff tasks
const tasks = [
  { 
    id: 1, 
    title: 'Clean room 205', 
    description: 'Standard cleaning after guest checkout',
    priority: 'high', 
    status: 'pending', 
    assignedTo: 'Housekeeping', 
    assignedStaffId: 5,
    dueTime: '10:00 AM',
    dueDate: '2023-06-20',
    createdAt: '2023-06-19 08:00 AM'
  },
  { 
    id: 2, 
    title: 'Restock mini bar in room 310', 
    description: 'Replace consumed items and check inventory',
    priority: 'medium', 
    status: 'in-progress', 
    assignedTo: 'Room Service', 
    assignedStaffId: 4,
    dueTime: '11:30 AM',
    dueDate: '2023-06-20',
    createdAt: '2023-06-19 08:15 AM'
  },
  { 
    id: 3, 
    title: 'Replace towels in room 102', 
    description: 'Guest requested fresh towels',
    priority: 'medium', 
    status: 'pending', 
    assignedTo: 'Housekeeping', 
    assignedStaffId: 5,
    dueTime: '12:00 PM',
    dueDate: '2023-06-20',
    createdAt: '2023-06-19 09:00 AM'
  },
  { 
    id: 4, 
    title: 'Fix AC in room 206', 
    description: 'AC not cooling properly, guest complained about temperature',
    priority: 'high', 
    status: 'pending', 
    assignedTo: 'Maintenance', 
    assignedStaffId: 12,
    dueTime: '09:00 AM',
    dueDate: '2023-06-20',
    createdAt: '2023-06-19 07:45 AM'
  },
  { 
    id: 5, 
    title: 'Deliver room service to 402', 
    description: 'Breakfast order: Continental breakfast for 2',
    priority: 'medium', 
    status: 'completed', 
    assignedTo: 'Room Service', 
    assignedStaffId: 4,
    dueTime: '08:15 AM',
    dueDate: '2023-06-20',
    createdAt: '2023-06-19 07:30 AM',
    completedAt: '2023-06-19 08:10 AM'
  },
  { 
    id: 6, 
    title: 'Inspect room 115 before check-in', 
    description: 'VIP guest arriving, ensure everything is perfect',
    priority: 'high', 
    status: 'pending', 
    assignedTo: 'Housekeeping Supervisor', 
    assignedStaffId: 13,
    dueTime: '01:00 PM',
    dueDate: '2023-06-20',
    createdAt: '2023-06-19 10:00 AM'
  },
  { 
    id: 7, 
    title: 'Replace light bulb in room 310 bathroom', 
    description: 'Guest reported burned out light bulb',
    priority: 'low', 
    status: 'pending', 
    assignedTo: 'Maintenance', 
    assignedStaffId: 12,
    dueTime: '03:00 PM',
    dueDate: '2023-06-20',
    createdAt: '2023-06-19 11:30 AM'
  },
  { 
    id: 8, 
    title: 'Deliver extra blankets to room 101', 
    description: 'Guest requested 2 additional blankets',
    priority: 'medium', 
    status: 'completed', 
    assignedTo: 'Room Service', 
    assignedStaffId: 4,
    dueTime: '09:30 AM',
    dueDate: '2023-06-20',
    createdAt: '2023-06-19 09:15 AM',
    completedAt: '2023-06-19 09:45 AM'
  }
];

// Check-ins scheduled for today
const checkIns = [
  { 
    id: 'B1002', 
    guest: 'Sarah Johnson', 
    room: '205 - Premium Suite', 
    time: '3:00 PM', 
    status: 'scheduled',
    notes: 'VIP guest, prepare welcome package'
  },
  { 
    id: 'B1003', 
    guest: 'Michael Brown', 
    room: '310 - Standard Room', 
    time: '4:30 PM', 
    status: 'scheduled',
    notes: ''
  },
  { 
    id: 'B1006', 
    guest: 'Jennifer Lee', 
    room: '102 - Deluxe Ocean View', 
    time: '2:00 PM', 
    status: 'completed',
    notes: 'Anniversary celebration, champagne delivered to room',
    completedAt: '2023-06-19 02:15 PM'
  }
];

// Check-outs scheduled for today
const checkOuts = [
  { 
    id: 'B1001', 
    guest: 'John Smith', 
    room: '101 - Deluxe Ocean View', 
    time: '11:00 AM', 
    status: 'pending',
    notes: 'Late checkout approved'
  },
  { 
    id: 'B1004', 
    guest: 'Emily Davis', 
    room: '402 - Family Suite', 
    time: '12:00 PM', 
    status: 'pending',
    notes: ''
  },
  { 
    id: 'B1009', 
    guest: 'Thomas Wilson', 
    room: '103 - Deluxe Ocean View', 
    time: '10:00 AM', 
    status: 'completed',
    notes: 'Room needs deep cleaning',
    completedAt: '2023-06-19 10:15 AM'
  }
];

// Maintenance requests
const maintenanceRequests = [
  { 
    id: 'M101', 
    room: '206', 
    issue: 'AC not cooling properly', 
    description: 'Room temperature stays above 78°F despite AC set to 70°F',
    priority: 'high', 
    reportedAt: '2023-06-19 07:45 AM', 
    reportedBy: 'Front Desk',
    assignedTo: 'Maintenance Team',
    status: 'pending' 
  },
  { 
    id: 'M102', 
    room: '115', 
    issue: 'TV remote not working', 
    description: 'Guest tried replacing batteries but remote still not functioning',
    priority: 'low', 
    reportedAt: '2023-06-19 08:30 AM', 
    reportedBy: 'Guest',
    assignedTo: 'IT Support',
    status: 'in-progress' 
  },
  { 
    id: 'M103', 
    room: '310', 
    issue: 'Bathroom sink draining slowly', 
    description: 'Water accumulates in sink when used',
    priority: 'medium', 
    reportedAt: '2023-06-18 09:15 PM', 
    reportedBy: 'Housekeeping',
    assignedTo: 'Plumbing',
    status: 'completed',
    completedAt: '2023-06-19 11:30 AM',
    notes: 'Hair removed from drain, functioning properly now'
  },
  { 
    id: 'M104', 
    room: '402', 
    issue: 'Broken chair leg', 
    description: 'Desk chair in room has broken leg, needs replacement',
    priority: 'medium', 
    reportedAt: '2023-06-19 09:45 AM', 
    reportedBy: 'Guest',
    assignedTo: 'Maintenance Team',
    status: 'pending' 
  },
  { 
    id: 'M105', 
    room: 'Lobby', 
    issue: 'Flickering lights near reception', 
    description: 'Several recessed lights flickering intermittently',
    priority: 'low', 
    reportedAt: '2023-06-19 10:00 AM', 
    reportedBy: 'Front Desk',
    assignedTo: 'Electrical',
    status: 'pending' 
  }
];

export { tasks, checkIns, checkOuts, maintenanceRequests };
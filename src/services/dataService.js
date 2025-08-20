/**
 * Data Service
 *
 * This service handles data fetching from external API or local data files
 * Currently using local data files, but can be easily switched to API calls
 */

import rooms from "../data/rooms";
import galleryImages from "../data/gallery";
import { promotions, features } from "../data/promotions";
import bookings from "../data/bookings";
import { tasks, checkIns, checkOuts, maintenanceRequests } from "../data/tasks";
import { staff, departments, staffPerformance } from "../data/staff";
import {
  hotelStats,
  revenueData,
  occupancyData,
  satisfactionData,
  recentReviews,
  inventoryStatus,
} from "../data/statistics";

// Room related functions
export const getAllRooms = () => {
  // In the future, this could be replaced with an API call
  // return axios.get('/api/rooms');
  return Promise.resolve(rooms);
};

export const getRoomById = (id) => {
  // In the future, this could be replaced with an API call
  // return axios.get(`/api/rooms/${id}`);
  const room = rooms.find((room) => room.id === parseInt(id));
  return Promise.resolve(room);
};

export const getRoomsByType = (type) => {
  // In the future, this could be replaced with an API call
  // return axios.get(`/api/rooms?type=${type}`);
  const filteredRooms =
    type === "all" ? rooms : rooms.filter((room) => room.type === type);
  return Promise.resolve(filteredRooms);
};

// Gallery related functions
export const getAllGalleryImages = () => {
  // In the future, this could be replaced with an API call
  // return axios.get('/api/gallery');
  return Promise.resolve(galleryImages);
};

export const getGalleryImagesByCategory = (category) => {
  // In the future, this could be replaced with an API call
  // return axios.get(`/api/gallery?category=${category}`);
  const filteredImages =
    category === "all"
      ? galleryImages
      : galleryImages.filter((image) => image.category === category);
  return Promise.resolve(filteredImages);
};

// Promotions related functions
export const getAllPromotions = () => {
  // In the future, this could be replaced with an API call
  // return axios.get('/api/promotions');
  return Promise.resolve(promotions);
};

export const getPromotionById = (id) => {
  // In the future, this could be replaced with an API call
  // return axios.get(`/api/promotions/${id}`);
  const promotion = promotions.find((promo) => promo.id === parseInt(id));
  return Promise.resolve(promotion);
};

export const getActivePromotions = () => {
  // In the future, this could be replaced with an API call
  // return axios.get('/api/promotions?active=true');
  const activePromos = promotions.filter((promo) => promo.active);
  return Promise.resolve(activePromos);
};

// Features related functions
export const getAllFeatures = () => {
  // In the future, this could be replaced with an API call
  // return axios.get('/api/features');
  return Promise.resolve(features);
};

// Booking related functions
export const getAllBookings = () => {
  // In the future, this could be replaced with an API call
  // return axios.get('/api/bookings');
  return Promise.resolve(bookings);
};

export const getBookingById = (id) => {
  // In the future, this could be replaced with an API call
  // return axios.get(`/api/bookings/${id}`);
  const booking = bookings.find((booking) => booking.id === id);

  if (!booking) {
    return Promise.reject(new Error(`Booking with ID ${id} not found`));
  }

  // Format the booking data to match the expected structure in EditBookingModal
  const formattedBooking = {
    ...booking,
    guest: {
      firstName: booking.guest.split(" ")[0],
      lastName: booking.guest.split(" ")[1] || "",
    },
    room: {
      id: booking.roomId,
      number: booking.room.split(" - ")[0],
      type: booking.room.split(" - ")[1] || "",
    },
    checkInDate: booking.checkIn,
    checkOutDate: booking.checkOut,
    totalCost: booking.total,
  };

  return Promise.resolve(formattedBooking);
};

export const getBookingsByStatus = (status) => {
  // In the future, this could be replaced with an API call
  // return axios.get(`/api/bookings?status=${status}`);
  const filteredBookings =
    status === "all"
      ? bookings
      : bookings.filter((booking) => booking.status === status);
  return Promise.resolve(filteredBookings);
};

// Staff related functions
export const getAllStaff = () => {
  // In the future, this could be replaced with an API call
  // return axios.get('/api/staff');
  return Promise.resolve(staff);
};

export const getStaffById = (id) => {
  // In the future, this could be replaced with an API call
  // return axios.get(`/api/staff/${id}`);
  const staffMember = staff.find((member) => member.id === parseInt(id));
  return Promise.resolve(staffMember);
};

export const getStaffByDepartment = (department) => {
  // In the future, this could be replaced with an API call
  // return axios.get(`/api/staff?department=${department}`);
  const filteredStaff =
    department === "all"
      ? staff
      : staff.filter((member) => member.department === department);
  return Promise.resolve(filteredStaff);
};

export const getAllDepartments = () => {
  // In the future, this could be replaced with an API call
  // return axios.get('/api/departments');
  return Promise.resolve(departments);
};

export const getStaffPerformance = (staffId) => {
  // In the future, this could be replaced with an API call
  // return axios.get(`/api/staff/${staffId}/performance`);
  const performance = staffId
    ? staffPerformance.find((perf) => perf.staffId === parseInt(staffId))
    : staffPerformance;
  return Promise.resolve(performance);
};

// Task related functions
export const getAllTasks = () => {
  // In the future, this could be replaced with an API call
  // return axios.get('/api/tasks');
  return Promise.resolve(tasks);
};

export const getTaskById = (id) => {
  // In the future, this could be replaced with an API call
  // return axios.get(`/api/tasks/${id}`);
  const task = tasks.find((task) => task.id === parseInt(id));
  return Promise.resolve(task);
};

export const getTasksByStatus = (status) => {
  // In the future, this could be replaced with an API call
  // return axios.get(`/api/tasks?status=${status}`);
  const filteredTasks =
    status === "all" ? tasks : tasks.filter((task) => task.status === status);
  return Promise.resolve(filteredTasks);
};

export const getTasksByAssignee = (assignedTo) => {
  // In the future, this could be replaced with an API call
  // return axios.get(`/api/tasks?assignedTo=${assignedTo}`);
  const filteredTasks = tasks.filter((task) => task.assignedTo === assignedTo);
  return Promise.resolve(filteredTasks);
};

export const getCheckIns = () => {
  // In the future, this could be replaced with an API call
  // return axios.get('/api/check-ins');
  return Promise.resolve(checkIns);
};

export const getCheckOuts = () => {
  // In the future, this could be replaced with an API call
  // return axios.get('/api/check-outs');
  return Promise.resolve(checkOuts);
};

export const getMaintenanceRequests = () => {
  // In the future, this could be replaced with an API call
  // return axios.get('/api/maintenance');
  return Promise.resolve(maintenanceRequests);
};

// Statistics related functions
export const getHotelStats = () => {
  // In the future, this could be replaced with an API call
  // return axios.get('/api/stats');
  return Promise.resolve(hotelStats);
};

export const getRevenueData = (period = "monthly") => {
  // In the future, this could be replaced with an API call
  // return axios.get(`/api/stats/revenue?period=${period}`);
  return Promise.resolve(
    period === "weekly" ? revenueData.weekly : revenueData.monthly
  );
};

export const getOccupancyData = (view = "monthly") => {
  // In the future, this could be replaced with an API call
  // return axios.get(`/api/stats/occupancy?view=${view}`);
  return Promise.resolve(
    view === "roomTypes" ? occupancyData.roomTypes : occupancyData.monthly
  );
};

export const getSatisfactionData = () => {
  // In the future, this could be replaced with an API call
  // return axios.get('/api/stats/satisfaction');
  return Promise.resolve(satisfactionData);
};

export const getRecentReviews = () => {
  // In the future, this could be replaced with an API call
  // return axios.get('/api/reviews/recent');
  return Promise.resolve(recentReviews);
};

export const getInventoryStatus = (category = "all") => {
  // In the future, this could be replaced with an API call
  // return axios.get(`/api/inventory?category=${category}`);
  if (category === "amenities")
    return Promise.resolve(inventoryStatus.amenities);
  if (category === "maintenance")
    return Promise.resolve(inventoryStatus.maintenance);
  return Promise.resolve({
    amenities: inventoryStatus.amenities,
    maintenance: inventoryStatus.maintenance,
  });
};

// Add new booking function
export const addBooking = (bookingData) => {
  // Generate a new booking ID (format: B1xxx where xxx is a number)
  const lastId =
    bookings.length > 0
      ? parseInt(bookings[bookings.length - 1].id.substring(1))
      : 1000;
  const newId = `B${lastId + 1}`;

  // Create new booking object with generated ID and current date
  const newBooking = {
    ...bookingData,
    id: newId,
    createdAt: new Date().toISOString().split("T")[0], // Current date in YYYY-MM-DD format
    status: "confirmed", // Default status for new bookings
  };

  // Add to bookings array
  bookings.push(newBooking);

  // In a real application, this would be an API call
  // return axios.post('/api/bookings', newBooking);
  return Promise.resolve(newBooking);
};

// Add new room function
export const addRoom = (roomData) => {
  // Generate a new room ID
  const lastId = rooms.length > 0 ? rooms[rooms.length - 1].id : 0;
  const newId = lastId + 1;

  // Create new room object with generated ID
  const newRoom = {
    ...roomData,
    id: newId,
  };

  // Add to rooms array
  rooms.push(newRoom);

  // In a real application, this would be an API call
  // return axios.post('/api/rooms', newRoom);
  return Promise.resolve(newRoom);
};

// Add new user function
export const addUser = (userData) => {
  // Import users array
  return import("../data/users").then((module) => {
    const users = module.users || module.default;

    // Generate a new user ID
    const lastId = users.length > 0 ? users[users.length - 1].id : 0;
    const newId = lastId + 1;

    // Create new user object with generated ID
    const newUser = {
      ...userData,
      id: newId,
    };

    // Add to users array
    users.push(newUser);

    // In a real application, this would be an API call
    // return axios.post('/api/users', newUser);
    return newUser;
  });
};

// Room CRUD functions
export const updateRoom = (roomId, roomData) => {
  // Find the room to update
  const roomIndex = rooms.findIndex((room) => room.id === roomId);

  if (roomIndex === -1) {
    return Promise.reject(new Error(`Room with ID ${roomId} not found`));
  }

  // Update the room data
  const updatedRoom = {
    ...rooms[roomIndex],
    ...roomData,
  };

  // Replace the old room with the updated one
  rooms[roomIndex] = updatedRoom;

  // In a real application, this would be an API call
  // return axios.put(`/api/rooms/${roomId}`, roomData);
  return Promise.resolve(updatedRoom);
};

// Booking CRUD functions
export const updateBooking = (bookingId, bookingData) => {
  // Find the booking to update
  const bookingIndex = bookings.findIndex(
    (booking) => booking.id === bookingId
  );

  if (bookingIndex === -1) {
    return Promise.reject(new Error(`Booking with ID ${bookingId} not found`));
  }

  // Update the booking data
  const updatedBooking = {
    ...bookings[bookingIndex],
    ...bookingData,
  };

  // Replace the old booking with the updated one
  bookings[bookingIndex] = updatedBooking;

  // In a real application, this would be an API call
  // return axios.put(`/api/bookings/${bookingId}`, bookingData);
  return Promise.resolve(updatedBooking);
};

export const cancelBooking = (bookingId) => {
  // Find the booking to cancel
  const bookingIndex = bookings.findIndex(
    (booking) => booking.id === bookingId
  );

  if (bookingIndex === -1) {
    return Promise.reject(new Error(`Booking with ID ${bookingId} not found`));
  }

  // Update the booking status to cancelled
  const updatedBooking = {
    ...bookings[bookingIndex],
    status: "cancelled",
  };

  // Replace the old booking with the updated one
  bookings[bookingIndex] = updatedBooking;

  // In a real application, this would be an API call
  // return axios.put(`/api/bookings/${bookingId}/cancel`);
  return Promise.resolve(updatedBooking);
};

// User CRUD functions
export const updateUser = (userId, userData) => {
  // Import users array
  return import("../data/users").then((module) => {
    const users = module.users || module.default;

    // Find the user to update
    const userIndex = users.findIndex((user) => user.id === userId);

    if (userIndex === -1) {
      return Promise.reject(new Error(`User with ID ${userId} not found`));
    }

    // Update the user data
    const updatedUser = {
      ...users[userIndex],
      ...userData,
    };

    // Replace the old user with the updated one
    users[userIndex] = updatedUser;

    // In a real application, this would be an API call
    // return axios.put(`/api/users/${userId}`, userData);
    return updatedUser;
  });
};

export const deactivateUser = (userId) => {
  // Import users array
  return import("../data/users").then((module) => {
    const users = module.users || module.default;

    // Find the user to deactivate
    const userIndex = users.findIndex((user) => user.id === userId);

    if (userIndex === -1) {
      return Promise.reject(new Error(`User with ID ${userId} not found`));
    }

    // Update the user status to inactive
    const updatedUser = {
      ...users[userIndex],
      status: "inactive",
    };

    // Replace the old user with the updated one
    users[userIndex] = updatedUser;

    // In a real application, this would be an API call
    // return axios.put(`/api/users/${userId}/deactivate`);
    return Promise.resolve(updatedUser);
  });
};

export const getUserById = (userId) => {
  // Import users array
  return import("../data/users").then((module) => {
    const users = module.users || module.default;

    // Find the user by ID
    const user = users.find((user) => user.id === userId);

    if (!user) {
      return Promise.reject(new Error(`User with ID ${userId} not found`));
    }

    // In a real application, this would be an API call
    // return axios.get(`/api/users/${userId}`);
    return user;
  });
};

export const markRoomCleaned = (roomId) => {
  // Find the room to update
  const roomIndex = rooms.findIndex((room) => room.id === roomId);

  if (roomIndex === -1) {
    return Promise.reject(new Error(`Room with ID ${roomId} not found`));
  }

  // Update the room's cleaning status
  const updatedRoom = {
    ...rooms[roomIndex],
    status: "available",
    lastCleaned: new Date().toISOString().split("T")[0], // Current date in YYYY-MM-DD format
  };

  // Replace the old room with the updated one
  rooms[roomIndex] = updatedRoom;

  // In a real application, this would be an API call
  // return axios.put(`/api/rooms/${roomId}/clean`, { lastCleaned: updatedRoom.lastCleaned });
  return Promise.resolve(updatedRoom);
};

export const markRoomMaintenance = (roomId, issue = "") => {
  // Find the room to update
  const roomIndex = rooms.findIndex((room) => room.id === roomId);

  if (roomIndex === -1) {
    return Promise.reject(new Error(`Room with ID ${roomId} not found`));
  }

  // Update the room's maintenance status
  const updatedRoom = {
    ...rooms[roomIndex],
    status: "maintenance",
    maintenanceIssue: issue,
  };

  // Replace the old room with the updated one
  rooms[roomIndex] = updatedRoom;

  // Create a maintenance request with a unique ID
  // Get existing IDs to ensure uniqueness
  const existingIds = maintenanceRequests.map((request) => request.id);
  let newRequestId;

  // Keep generating IDs until we find a unique one that doesn't exist in the maintenanceRequests array
  do {
    newRequestId = `M${Math.floor(1000 + Math.random() * 9000)}`;
  } while (existingIds.includes(newRequestId));

  const newRequest = {
    id: newRequestId,
    room: `${updatedRoom.id} - ${updatedRoom.name}`,
    issue: issue || "General maintenance",
    priority: "medium",
    reportedAt: new Date().toISOString().split("T")[0], // Current date in YYYY-MM-DD format
    status: "pending",
  };

  // Add to maintenance requests
  maintenanceRequests.push(newRequest);

  // In a real application, this would be API calls
  // return axios.put(`/api/rooms/${roomId}/maintenance`, { status: 'maintenance', issue });
  return Promise.resolve({ room: updatedRoom, maintenanceRequest: newRequest });
};

// Staff functions
export const addTask = (taskData) => {
  // Generate a new task ID based on timestamp and existing tasks to ensure uniqueness
  const existingIds = tasks.map((task) => task.id);
  let newId;

  // Keep generating IDs until we find a unique one that doesn't exist in the tasks array
  do {
    newId = `T${Math.floor(1000 + Math.random() * 9000)}`;
  } while (existingIds.includes(newId));

  // Create new task object with generated ID
  const newTask = {
    ...taskData,
    id: newId,
    createdAt: new Date().toISOString().split("T")[0], // Current date in YYYY-MM-DD format
    status: "pending",
  };

  // Add to tasks array
  tasks.push(newTask);

  // In a real application, this would be an API call
  // return axios.post('/api/tasks', newTask);
  return Promise.resolve(newTask);
};

export const updateTask = (taskId, taskData) => {
  // Find the task to update
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    return Promise.reject(new Error(`Task with ID ${taskId} not found`));
  }

  // Update the task data
  const updatedTask = {
    ...tasks[taskIndex],
    ...taskData,
  };

  // Replace the old task with the updated one
  tasks[taskIndex] = updatedTask;

  // In a real application, this would be an API call
  // return axios.put(`/api/tasks/${taskId}`, taskData);
  return Promise.resolve(updatedTask);
};

export const addMaintenanceRequest = (requestData) => {
  // Generate a new request ID based on existing requests to ensure uniqueness
  const existingIds = maintenanceRequests.map((request) => request.id);
  let newId;

  // Keep generating IDs until we find a unique one that doesn't exist in the maintenanceRequests array
  do {
    newId = `M${Math.floor(1000 + Math.random() * 9000)}`;
  } while (existingIds.includes(newId));

  // Create new request object with generated ID
  const newRequest = {
    ...requestData,
    id: newId,
    reportedAt: new Date().toISOString().split("T")[0], // Current date in YYYY-MM-DD format
    status: "pending",
  };

  // Add to maintenance requests array
  maintenanceRequests.push(newRequest);

  // In a real application, this would be an API call
  // return axios.post('/api/maintenance', newRequest);
  return Promise.resolve(newRequest);
};

// Create a default export object with all functions
export default {
  getAllRooms,
  getRoomById,
  getRoomsByType,
  getAllGalleryImages,
  getGalleryImagesByCategory,
  getAllPromotions,
  getPromotionById,
  getAllFeatures,
  getAllBookings,
  getBookingById,
  getBookingsByStatus,
  getAllStaff,
  getStaffById,
  getStaffByDepartment,
  getAllDepartments,
  getStaffPerformance,
  getAllTasks,
  getTaskById,
  getTasksByStatus,
  getCheckIns,
  getCheckOuts,
  getMaintenanceRequests,
  getHotelStats,
  getRevenueData,
  getOccupancyData,
  getSatisfactionData,
  getRecentReviews,
  getInventoryStatus,
  addBooking,
  addRoom,
  addUser,
  updateRoom,
  updateBooking,
  cancelBooking,
  updateUser,
  deactivateUser,
  getUserById,
  markRoomCleaned,
  markRoomMaintenance,
  addTask,
  updateTask,
  addMaintenanceRequest,
};

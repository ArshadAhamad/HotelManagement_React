/**
 * Promotions Data
 * 
 * This file contains promotional content used throughout the application
 */

export const promotions = [
  {
    id: 1,
    title: 'Summer Special Offer',
    description: 'Book now and get 20% off on all premium suites for stays between June and August. Includes complimentary breakfast and spa access.',
    offerCode: 'SUMMER23',
    validUntil: 'Aug 31, 2023',
    active: true
  },
  {
    id: 2,
    title: 'Weekend Getaway',
    description: 'Enjoy a relaxing weekend with our special package including room upgrade and late checkout.',
    offerCode: 'WEEKEND23',
    validUntil: 'Dec 31, 2023',
    active: true
  },
  {
    id: 3,
    title: 'Honeymoon Package',
    description: 'Celebrate your special occasion with our romantic package including champagne, flowers, and dinner for two.',
    offerCode: 'HONEY23',
    validUntil: 'Dec 31, 2023',
    active: true
  }
];

export const features = [
  {
    id: 1,
    title: 'Luxury Experience',
    description: 'Indulge in our premium amenities and exceptional service for an unforgettable stay. From plush bedding to personalized concierge service, every detail is designed for your comfort.',
    icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z'
  },
  {
    id: 2,
    title: 'Prime Location',
    description: 'Situated in the heart of Bay City with easy access to attractions, dining, and shopping. Our central location makes exploring the city effortless and convenient.',
    icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z'
  },
  {
    id: 3,
    title: 'Best Value',
    description: 'Enjoy premium accommodations at competitive rates. Our packages are designed to provide exceptional value without compromising on quality or comfort.',
    icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
  }
];

export default { promotions, features };
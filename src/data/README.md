# External Data Files

## Overview
This directory contains external data files used throughout the application. These files serve as mock data that can be easily replaced with API calls in the future.

## Files
- `rooms.js`: Contains data for hotel rooms including details like room type, price, capacity, and features.
- `gallery.js`: Contains data for the gallery images including categories, titles, descriptions, and image URLs.

## Integration with API
The application is designed to easily switch from local data files to API calls. The `dataService.js` file in the `services` directory provides functions that currently return the local data but can be modified to make API calls instead.

To integrate with an API:

1. Update the functions in `dataService.js` to make API calls instead of returning local data.
2. Example:
   ```javascript
   // Current implementation (using local data)
   export const getAllRooms = () => {
     return Promise.resolve(rooms);
   };
   
   // API implementation (using axios)
   export const getAllRooms = () => {
     return axios.get('/api/rooms');
   };
   ```

3. Ensure that the API returns data in the same format as the local data files, or modify the components to handle the different format.

## Data Structure

### Rooms
Each room object should have the following properties:
```javascript
{
  id: Number,
  name: String,
  type: String, // 'standard', 'deluxe', 'suite'
  price: Number,
  capacity: Number,
  description: String,
  features: Array<String>
}
```

### Gallery Images
Each gallery image object should have the following properties:
```javascript
{
  id: Number,
  category: String, // 'rooms', 'dining', 'spa', 'pool', 'exterior'
  title: String,
  description: String,
  imageUrl: String
}
```

## Adding New Data
To add new data, simply add new objects to the respective arrays in the data files. Make sure to follow the data structure and provide unique IDs for each object.
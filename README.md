# Weather Forecast App Documentation

## Overview
This is a modern weather forecast application that shows current weather and 5-day forecast for any city. The app features a dark mode, temperature unit conversion (°C/°F), and dynamic backgrounds based on weather conditions.

## Features
1. **Current Weather Display**
   - City name and current date
   - Temperature with unit toggle (°C/°F)
   - Weather description with icon
   - Humidity percentage
   - Wind speed in km/h

2. **5-Day Forecast**
   - Daily weather predictions
   - Temperature for each day
   - Weather icons and descriptions
   - Date and day of the week

3. **User Interface Features**
   - Dark/Light mode toggle
   - Temperature unit switch (°C/°F)
   - Dynamic backgrounds based on weather
   - Responsive design for all devices
   - Search functionality for any city

## How It Works

### 1. File Structure
- `index.html`: Contains the structure of the app
- `style.css`: Handles all styling and themes
- `script.js`: Contains all the functionality

### 2. API Integration
- Uses OpenWeather API for weather data
- Two main API endpoints:
  1. Current weather: `api.openweathermap.org/data/2.5/weather`
  2. 5-day forecast: `api.openweathermap.org/data/2.5/forecast`

### 3. Main Functions

#### Weather Data Fetching
```javascript
async function getWeatherData(city) {
    // Fetches both current weather and forecast data
    // Updates the UI with received data
}
```

#### Dark Mode
```javascript
function toggleDarkMode() {
    // Switches between light and dark themes
    // Changes the moon/sun icon
}
```

#### Temperature Unit Conversion
```javascript
function toggleUnit() {
    // Switches between Celsius and Fahrenheit
    // Updates all temperature displays
}
```

#### Dynamic Backgrounds
```javascript
function setWeatherBackground(weatherMain) {
    // Changes background based on weather:
    // - Clear: Blue sky gradient
    // - Clouds: Grey gradient
    // - Rain: Dark blue gradient
    // - Snow: Light blue gradient
    // - Thunderstorm: Dark purple gradient
}
```

### 4. Weather Display Features

#### Current Weather
- Shows real-time weather data including:
  - Temperature
  - Weather description
  - Humidity
  - Wind speed
  - Weather icon

#### Forecast Display
- Shows 5-day forecast with:
  - Day and date
  - Weather icon
  - Temperature
  - Weather description

### 5. User Interaction

#### Search Function
- Users can search for any city
- Handles errors if city isn't found
- Updates all weather information on successful search

#### Theme Toggle
- Moon/Sun icon to switch between dark and light modes
- Automatically updates all UI elements

#### Temperature Unit
- Button to switch between °C and °F
- Automatically converts all temperature displays

## Technical Details

### CSS Features
- CSS Variables for theme colors
- Responsive design using media queries
- Smooth transitions for theme changes
- Backdrop filters for glass effect
- Dynamic weather-based gradients

### JavaScript Features
- Async/await for API calls
- Error handling for failed requests
- DOM manipulation for dynamic updates
- Event listeners for user interactions
- Date formatting for readable display

## Usage

1. **Search for a City**
   - Type city name in the search box
   - Press Enter or click Search button

2. **Change Theme**
   - Click the moon/sun icon to toggle dark/light mode

3. **Change Temperature Unit**
   - Click the °C/°F button to switch units

## Error Handling
- Shows alert if city is not found
- Gracefully handles API errors
- Provides feedback for invalid searches

## API Key
- Requires OpenWeather API key
- Current key: Included in script.js
- Can be replaced with your own API key

## Browser Compatibility
- Works on all modern browsers
- Responsive design for mobile devices
- Supports touch interactions

This documentation provides a comprehensive overview of how the weather app works.

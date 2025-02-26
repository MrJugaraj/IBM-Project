// Replace 'YOUR_API_KEY' with your actual OpenWeather API key
const apiKey = '482d648eb7b48959dc03bfde18f8cfb3';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';

// DOM Elements
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const cityElement = document.getElementById('city');
const dateElement = document.getElementById('date');
const temperatureElement = document.getElementById('temperature');
const tempUnitElement = document.getElementById('temp-unit');
const weatherIcon = document.getElementById('weather-icon');
const descriptionElement = document.getElementById('description');
const humidityElement = document.getElementById('humidity');
const windSpeedElement = document.getElementById('wind-speed');
const darkModeToggle = document.getElementById('dark-mode-toggle');
const unitToggle = document.getElementById('unit-toggle');
const forecastContainer = document.getElementById('forecast-container');

// State
let currentTemp = 0;
let isMetric = true;
let isDarkMode = false;

// Function to toggle dark mode
function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    darkModeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
}

// Function to toggle temperature unit
function toggleUnit() {
    isMetric = !isMetric;
    unitToggle.textContent = isMetric ? '°C' : '°F';
    tempUnitElement.textContent = isMetric ? '°C' : '°F';
    updateTemperatureDisplay();
}

// Function to update temperature display
function updateTemperatureDisplay() {
    const displayTemp = isMetric ? currentTemp : (currentTemp * 9/5) + 32;
    temperatureElement.textContent = Math.round(displayTemp);
}

// Function to set weather-based background
function setWeatherBackground(weatherMain) {
    const body = document.body;
    const validWeatherTypes = ['clear', 'clouds', 'rain', 'snow', 'thunderstorm'];
    const weatherType = weatherMain.toLowerCase();
    
    body.setAttribute('data-weather', 
        validWeatherTypes.includes(weatherType) ? weatherType : 'clear'
    );
}

// Function to format date
function formatDate(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Function to create forecast card
function createForecastCard(data) {
    const temp = isMetric ? data.main.temp : (data.main.temp * 9/5) + 32;
    const date = new Date(data.dt * 1000);
    const card = document.createElement('div');
    card.className = 'forecast-card';
    card.innerHTML = `
        <p>${date.toLocaleDateString('en-US', { weekday: 'short' })}</p>
        <p>${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather icon">
        <p class="forecast-temp">${Math.round(temp)}${isMetric ? '°C' : '°F'}</p>
        <p class="forecast-desc">${data.weather[0].description}</p>
    `;
    return card;
}

// Function to get unique dates from forecast data
function getUniqueDailyForecasts(forecastList) {
    const uniqueDays = {};
    forecastList.forEach(item => {
        const date = new Date(item.dt * 1000).toLocaleDateString();
        // Take the noon forecast for each day (closest to 12:00)
        if (!uniqueDays[date] || 
            Math.abs(new Date(item.dt * 1000).getHours() - 12) < 
            Math.abs(new Date(uniqueDays[date].dt * 1000).getHours() - 12)) {
            uniqueDays[date] = item;
        }
    });
    return Object.values(uniqueDays);
}

// Function to fetch weather data
async function getWeatherData(city) {
    try {
        // Current weather
        const weatherResponse = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);
        if (!weatherResponse.ok) {
            throw new Error('City not found');
        }
        const weatherData = await weatherResponse.json();
        
        // Forecast data
        const forecastResponse = await fetch(`${forecastUrl}?q=${city}&appid=${apiKey}&units=metric`);
        const forecastData = await forecastResponse.json();
        
        updateUI(weatherData, forecastData);
    } catch (error) {
        alert(error.message);
    }
}

// Function to update UI with weather data
function updateUI(weatherData, forecastData) {
    // Update current weather
    cityElement.textContent = weatherData.name;
    dateElement.textContent = formatDate(new Date());
    currentTemp = weatherData.main.temp;
    updateTemperatureDisplay();
    descriptionElement.textContent = weatherData.weather[0].description;
    humidityElement.textContent = `${weatherData.main.humidity}%`;
    windSpeedElement.textContent = `${Math.round(weatherData.wind.speed * 3.6)} km/h`;
    weatherIcon.src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
    
    // Set weather-based background
    setWeatherBackground(weatherData.weather[0].main);
    
    // Update forecast
    forecastContainer.innerHTML = '';
    
    // Get unique daily forecasts
    const dailyForecasts = getUniqueDailyForecasts(forecastData.list)
        .slice(1, 6); // Skip today and get next 5 days
    
    dailyForecasts.forEach(forecast => {
        forecastContainer.appendChild(createForecastCard(forecast));
    });
}

// Event listeners
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeatherData(city);
    }
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) {
            getWeatherData(city);
        }
    }
});

darkModeToggle.addEventListener('click', toggleDarkMode);
unitToggle.addEventListener('click', toggleUnit);

// Initial weather data for a default city
getWeatherData('London'); 
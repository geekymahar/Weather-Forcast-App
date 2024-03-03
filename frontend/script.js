// Execute the following code when the DOM content has been loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add event listener to 'fetchWeather' button click
    document.getElementById('fetchWeather').addEventListener('click', function() {
        // Retrieve the city input value
        const city = document.getElementById('cityInput').value;
        // Call fetchWeatherData function with city parameter
        fetchWeatherData({ city });
    });

    // Add event listener to 'fetchLocalWeather' button click
    document.getElementById('fetchLocalWeather').addEventListener('click', function() {
        // Check for geolocation support in the browser
        if (navigator.geolocation) {
            // Get current position using geolocation
            navigator.geolocation.getCurrentPosition(function(position) {
                // Call fetchWeatherData function with latitude and longitude parameters
                fetchWeatherData({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                });
            });
        } else {
            // Alert user if geolocation is not supported
            alert('Geolocation is not supported by this browser.');
        }
    });
});

// Function to fetch weather data from the API
function fetchWeatherData(params) {
    // Construct URL for fetching weather data
    const url = new URL('http://127.0.0.1:5000/weather');
    // Append query parameters to the URL
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    // Make a fetch request to the API
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Check status code and update weather display
            if (data.cod === 200) {
                updateWeatherDisplay(data);
            } else {
                // Throw an error if response status code is not 200
                throw new Error(data.message);
            }
        })
        .catch(error => {
            // Log error and alert user about failure to fetch weather data
            console.error('Error fetching weather:', error);
            alert('Failed to fetch weather data.');
        });
}

// Function to update the weather display on the webpage
function updateWeatherDisplay(data) {
    // Show the weather result display block
    document.getElementById('weatherResult').style.display = 'block';
    // Update weather information on the page
    document.getElementById('cityName').textContent = `Weather in ${data.name}`;
    document.getElementById('description').textContent = data.weather[0].description;
    document.getElementById('temperature').textContent = `Temperature: ${(data.main.temp - 273.15).toFixed(2)}°C`;
    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById('wind').textContent = `Wind: ${data.wind.speed} m/s`;
    // Check if 'rain' property exists and '1h' property is defined
    if (data.rain && typeof data.rain['1h'] !== 'undefined') {
        document.getElementById('rain').textContent = `Rain: ${data.rain['1h']} mm`;
    } else {
        document.getElementById('rain').textContent = "Rain data not available";
}}

function getWeather() {
    const apiKey = 'd8af5788b98a09806111adfefff6fb95'; // Replace with your OpenWeatherMap API key
        const locationInput = document.getElementById('location');
        const location = locationInput.value;
    
        if (location.trim() === '') {
            alert('Please enter a location.');
            return;
        }
    
        fetchWeatherData(location, apiKey);
    }
    
    function fetchWeatherData(location, apiKey) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
    
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                displayWeather(data);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
    }
    
    function displayWeather(data) {
        const weatherContainer = document.getElementById('weatherContainer');
        weatherContainer.innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <p class="weather-info">${data.weather[0].description}</p>
            <p class="weather-info">Temperature: ${data.main.temp} °C</p>
            <p class="weather-info">Humidity: ${data.main.humidity} %</p>
            <p class="weather-info">Wind Speed: ${data.wind.speed} m/s</p>
            <div class="weather-icon">
                ${getWeatherIcon(data.weather[0].icon)}
            </div>
        `;
    }
    
    function getWeatherIcon(iconCode) {
        if (iconCode.includes('01')) {
            return '<i class="fas fa-sun"></i>';
        } else if (iconCode.includes('02') || iconCode.includes('03') || iconCode.includes('04')) {
            return '<i class="fas fa-cloud"></i>';
        } else {
            return ''; // You can add more conditions for different weather conditions
        }
    }
    
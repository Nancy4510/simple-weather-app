function getWeather() {
    const apiKey = "YOUR-API-KEY";
    const city = document.getElementById('city').value;

    if (!city) {
        alert('Please enter a city');
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(currentWeatherUrl)
        .then(res => res.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching the current weather data:', error);
                alert('Error fetching current weather data. Please try again later.');
        });
    
    fetch(forecastUrl)
        .then(res => res.json())
        .then(data => {
            displayHourlyForecast(data.list);
        })    
        .catch(error => {
            console.error('Error fetching horly forecast data:', error);
            alert('Error fetching hourly forecast data. Please try again.');
        });
}

function displayWeather(data) {
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    // Clear previous content
    weatherInfoDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';

    if (data.code === '404') {
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`
    } else {
        const cityName = data.name;
        const tempToFahrenheit = Math.round((data.main.temp - 273.15) * (9/5) + 32);
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const tempHTML = `
            <p>${tempToFahrenheit}&deg;F</p>`;

        const weatherHtml = `
        <p>${cityName}</p>
        <p>${description}</p>`;
        
        tempDivInfo.innerHTML = tempHTML;
        weatherInfoDiv.innerHTML = weatherHtml;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        showImage();
    }
}

function displayHourlyForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementById('hourly-forecast');
    const next24Hours = hourlyData.slice(0,8);

    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000);
        const hour = dateTime.getHours();
        const tempToFahrenheit = Math.round((item.main.temp - 273.15) * (9/5) + 32);
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
        
    const hourlyItemHtml = `
        <div class = "hourly-item">
            <span>${hour}:00</span>
            <img src="${iconUrl}" alt="Hourly Weather Icon">
            <span>${tempToFahrenheit}</span>
        </div>`;
        
    hourlyForecastDiv.innerHTML += hourlyItemHtml;

    });
}

function showImage() {
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block';
}


function getWeather() {
    const apiKey = "YOUR-API-KEY";
    const city = document.getElementById('city').value;

    if (!city) {
        alert('Please enter a city');
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const forecastUrl = `api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(currentWeatherUrl)
        .then(res => res.jsaon())
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
        const temp = Math.round(data.main.temp - 273.15);
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const tempHTML = `
            <p>${temp}C</p>`;

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


const API_KEY = 'bd5e378503939ddaee76f12ad7a97608';
        const weatherInfo = document.getElementById('weather-info');
        const loading = document.getElementById('loading');

        async function getWeather(lat = null, lon = null) {
            const city = document.getElementById('search-input').value;
            loading.style.display = 'block';
            weatherInfo.style.opacity = '0.3';

            try {
                let url;
                if (lat && lon) {
                    url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
                } else {
                    url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
                }

                const response = await fetch(url);
                const data = await response.json();

                if (data.cod === '404') {
                    alert('City not found!');
                    return;
                }

                displayWeather(data);
            } catch (error) {
                alert('Error fetching weather data!');
            } finally {
                loading.style.display = 'none';
                weatherInfo.style.opacity = '1';
            }
        }

        function displayWeather(data) {
            document.getElementById('location').textContent = `${data.name}, ${data.sys.country}`;
            document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°C`;
            document.getElementById('condition').textContent = data.weather[0].description;
            document.getElementById('feels-like').textContent = `${Math.round(data.main.feels_like)}°C`;
            document.getElementById('humidity').textContent = `${data.main.humidity}%`;
            document.getElementById('wind-speed').textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;
        }

        function getCurrentLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        getWeather(position.coords.latitude, position.coords.longitude);
                    },
                    (error) => {
                        alert('Error getting location. Please search by city name.');
                    }
                );
            } else {
                alert('Geolocation is not supported by your browser');
            }
        }

        document.getElementById('search-input').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                getWeather();
            }
        });

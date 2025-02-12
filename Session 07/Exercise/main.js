import { writeFile } from 'fs';

const API_KEY = '387320aba377a04228f1963886c713f4';
const cities = ['London', 'New York', 'Tokyo'];

async function fetchWeather(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );

        if (!response.ok) {
            throw new Error(`Error fetching ${city}: ${response.statusText}`);
        }

        const data = await response.json();
        return {
            city: city,
            temp: data.main.temp,
            humidity: data.main.humidity
        };
    } catch (error) {
        console.error(error.message);
        return null;
    }
}

async function getWeatherData() {
    const results = await Promise.all(cities.map(fetchWeather));
    const filteredResults = results.filter((entry) => entry !== null);

    writeFile('weather.json', JSON.stringify(filteredResults, null, 2), (err) => {
        if (err) {
            console.error('Error writing to file:', err);
        } 
        
        else {
            console.log('Weather data saved to weather.json');
        }
    });
}

getWeatherData();
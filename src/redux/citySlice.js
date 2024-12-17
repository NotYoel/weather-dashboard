import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const API_KEY_apiNinjas = process.env.REACT_APP_API_NINJAS_API_KEY;
const API_KEY_openWeather = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
const API_KEY_weatherBit = process.env.REACT_APP_WEATHER_BIT_API_KEY;

const initialCityState = {
    city: {
        name: "N/A",
        dayOfWeek: "N/A",
        date: "N/A",
        time: "N/A",
    },
    weather: {
        minTemp: "N/A",
        maxTemp: "N/A",
        description: "N/A",
        feelsLike: "N/A",
        wind: "N/A",
        humidity: "N/A",
        pressure : "N/A",
        visibility: "N/A",
        sunrise: "N/A",
        sunset: "N/A",
        icon: ""
    },
    forecast: {
        data: []
    },
    status: 'idle' // 'idle', 'loading', 'succeeded', 'failed'
}

const citySlice = createSlice({
    name: "city",
    initialState: initialCityState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchCityData.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(fetchCityData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const { city, weather, forecast } = action.payload;

                // Set city data
                state.city.name = `${city.name}, ${city.country}`;
                state.city.dayOfWeek = city.dayOfTheWeek;
                state.city.date = city.date;
                state.city.time = city.time;

                // Set weather data
                state.weather.minTemp = weather.minTemp;
                state.weather.maxTemp = weather.maxTemp;
                state.weather.description = weather.description;
                state.weather.feelsLike = weather.feelsLike;
                state.weather.wind = weather.wind;
                state.weather.humidity = weather.humidity;
                state.weather.pressure = weather.pressure;
                state.weather.visibility = weather.visibility;
                state.weather.sunrise = weather.sunrise;
                state.weather.sunset = weather.sunset;
                state.weather.icon = weather.icon;

                // Set forecast data
                state.forecast.data = forecast.data;
            })
            .addCase(fetchCityData.rejected, (state) => {
                state.status = 'failed';
            });
    }
});

export const fetchCityData = createAsyncThunk(
    'city/fetchCityData',
    async (cityName, thunkAPI) => {
        try {
            // get city data
            const cityData = await fetchCityDetails(cityName);

            const timeZoneResponse = await fetch(`https://api.api-ninjas.com/v1/timezone?lat=${cityData.latitude}&lon=${cityData.longitude}`, {headers: {'X-Api-Key': API_KEY_apiNinjas}})
            let timeZoneData = await timeZoneResponse.json();
            const timezone = timeZoneData.timezone

            // get current time, date and day of the week
            const localTime = new Date();

            const time = localTime.toLocaleTimeString('en-US', {hour: "numeric", minute: "numeric", timeZone: timezone});
            const dayOfTheWeek = localTime.toLocaleDateString('en-US', {weekday: 'long', timeZone: timezone});
            const date = localTime.toLocaleDateString('en-US', {year: "numeric", month: "long", day: "numeric", timeZone: timezone});

            const weatherData = await fetchWeatherData(cityData.latitude, cityData.longitude, timezone);
            const forecastData = await fetchForecast(cityData.latitude, cityData.longitude);

            return {
                city: {
                    name: cityData.name, 
                    country: cityData.country, 
                    time: time, 
                    dayOfTheWeek: dayOfTheWeek, 
                    date: date
                },
                weather: {
                    ...weatherData
                },
                forecast: {
                    data: forecastData
                }
            }
        } catch(error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const fetchCityDetails = async (cityName) => {
    const cityResponse = await fetch(`https://api.api-ninjas.com/v1/city?name=${cityName}`, {headers: {'X-Api-Key': API_KEY_apiNinjas}});
    let cityData = await cityResponse.json();

    if(cityData.length == 0) {
        return new Error('Invalid city name.');
    }

    return cityData[0];
};

export const fetchWeatherData = async (lat, lon, timezone) => {
    try {
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY_openWeather}&units=metric`);
        const weatherData = await weatherResponse.json();

        // Use the city's timezone time for sunset and sunrise.
        return {
            minTemp: weatherData.main.temp_min, 
            maxTemp: weatherData.main.temp_max, 
            description: weatherData.weather[0].main, 
            feelsLike: weatherData.main.feels_like, 
            wind: weatherData.wind.speed, 
            humidity: weatherData.main.humidity,
            pressure: weatherData.main.pressure,
            visibility: weatherData.visibility,
            sunrise: (new Date(weatherData.sys.sunrise * 1000)).toLocaleTimeString('en-US', {hour: "numeric", minute: "numeric", timeZone: timezone}),
            sunset: (new Date(weatherData.sys.sunset * 1000)).toLocaleTimeString('en-US', {hour: "numeric", minute: "numeric", timeZone: timezone}),
            icon: weatherData.weather[0].icon
        }
    } catch(error) {
        return error;
    }
};

const fetchForecast = async (lat, lon) => {
    try {
        const forecastResponse = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?key=${API_KEY_weatherBit}&lat=${lat}&lon=${lon}`);
        const forecastData = await forecastResponse.json();

        const sevenDays = forecastData.data.slice(0, 7);
        const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        const getRelevantData = (data) => {
            return {weekday: weekDays[(new Date(data.datetime)).getDay()], icon: data.weather.icon, temp: data.temp}
        };

        const result = sevenDays.map((data) => getRelevantData(data));

        return result;
    } catch(error) {
        return error;
    }
};

export default citySlice.reducer;
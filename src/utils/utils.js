import { fetchCityDetails, fetchWeatherData } from "../redux/citySlice";

const cities = [
    { country: "Australia", city: "Sydney" },
    { country: "United States", city: "Los Angeles" },
    { country: "United Kingdom", city: "London" },
    { country: "India", city: "Mumbai" },
    { country: "Brazil", city: "Rio de Janeiro" },
    { country: "France", city: "Paris" },
    { country: "Canada", city: "Toronto" },
    { country: "Japan", city: "Tokyo" },
    { country: "Germany", city: "Berlin" },
    { country: "Italy", city: "Rome" },
    { country: "Canada", city: "Ottawa" },
    { country: "China", city: "Beijing" },
];

// Durstenfeld shuffle - an optimized version of Fisher-Yates
export function shuffleArray(arr) {
    const array = [...arr];

    for (let i = array.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}

export function randomCities() {
    const shuffledCities = shuffleArray(cities);
    return shuffledCities.slice(0, 3);
}

export function getWindSpeedStatus(speed) {
    switch(true) {
        case speed <= 20:
            return "Low Speed";
        case speed >= 21 && speed <= 40:
            return "Moderate Speed";
        case speed >= 41 && speed <= 75:
            return "High Speed"
        case speed >= 76:
            return "Very High Speed"
    }
}

export function getHumidityStatus(humidity) {
    switch(true) {
        case humidity <= 40:
            return "Low Humidity";
        case humidity >= 41 && humidity <= 70:
            return "Moderate Humidity";
        case humidity >= 71:
            return "High Humidity"
    }
}

export function getPressureStatus(pressure) {
    switch(true) {
        case pressure < 100:
            return "Low Pressure";
        case pressure >= 100 && pressure <= 102:
            return "Moderate Pressure";
        case pressure > 102:
            return "High Pressure";
    }
}

export function getVisibilityStatus(visibility) {
    switch(true) {
        case visibility <= 2:
            return "Low Visibility";
        case visibility >= 2.1 && visibility <= 5:
            return "Moderate Visibility";
        case visibility >= 5.1 && visibility <= 10:
            return "High Visibility";
    }
}

export async function fetchOtherCities() {
    const result = [];
    const randomCitiesArr = randomCities();

    const appendToResultArray = async (city) => {
        try {
            const cityData = await fetchCityDetails(city.city);
            const weatherData = await fetchWeatherData(cityData.latitude, cityData.longitude);

            result.push({
                ...city,
                minTemp: weatherData.minTemp,
                maxTemp: weatherData.maxTemp,
                description: weatherData.description,
                icon: weatherData.icon,
            });
        } catch(error) {
            console.error("Ran into an error for city: " + city.city);
        }
    };

    await Promise.all(randomCitiesArr.map((city) => appendToResultArray(city)));

    return result;
}
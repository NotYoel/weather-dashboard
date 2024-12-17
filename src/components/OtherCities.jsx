import Card from "./Card";
import CitySummary from "./CitySummary";
import { fetchOtherCities } from "../utils/utils";
import { useEffect, useState } from "react";

function OtherCities() {
    const [otherCities, setOtherCities] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const cities = await fetchOtherCities();
            setOtherCities(cities);
        };

        fetch()
    }, []);

    return <Card maxHeight="fit-content">
        <div className="flex justify-center lg:justify-between items-center mb-6">
            <h1 class="text-white font-semibold text-2xl text-center lg:text-left">Other Cities</h1>
        </div>

        <div className="space-y-4 overflow-y-auto max-h-[300px] md:max-h-[510px] lg:max-h-[332px]">
            {
                otherCities.map((city, index) => <CitySummary key={index} country={city.country} city={city.city} weather={city.description} tempHigh={city.maxTemp} tempLow={city.minTemp} icon={city.icon} />)
            }
        </div>
    </Card>
}

export default OtherCities;
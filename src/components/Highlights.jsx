import Card from "./Card";
import SmallCard from "./SmallCard";
import { useSelector } from "react-redux";
import { getWindSpeedStatus, getHumidityStatus, getPressureStatus, getVisibilityStatus } from "../utils/utils";

function Highlights() {
    const weather = useSelector((state) => state.city.weather);

    return <Card>
        <h1 class="text-white font-semibold text-2xl text-center lg:text-left">Today's Highlight</h1>

        <div id="highlights-grid" class="mt-6 min-h-[300px] grid gap-4">
            <Card bgColor="#272727" padding="1rem">
                <SmallCard icon="bx bx-wind" title="Wind Status" value={weather.wind} unit="km/h" bottom_text={getWindSpeedStatus(weather.wind)} />
            </Card>
            <Card bgColor="#272727" padding="1rem">
                <SmallCard icon="bx bxs-droplet" title="Humidity" value={weather.humidity} unit="%" bottom_text={getHumidityStatus(weather.humidity)} />
            </Card>
            <Card bgColor="#272727" padding="2rem">
                <div class="h-full flex flex-col text-center gap-2 lg:gap-0 lg:text-left lg:flex-row justify-between items-center">
                    <img src="/weather-icons/sunrise.png" alt="" />

                    <div class="flex flex-col">
                        <span class="text-white text-lg">Sunrise</span>
                        <span class="text-white text-2xl font-semibold">{weather.sunrise}</span>
                    </div>
                </div>
            </Card>
            <Card bgColor="#272727" padding="1rem">
                <SmallCard icon="bx bx-chevrons-up" title="Pressure" value={Math.round(weather.pressure * 0.1)} unit="kPa" bottom_text={getPressureStatus(Math.round(weather.pressure * 0.1))} />
            </Card>
            <Card bgColor="#272727" padding="1rem">
                <SmallCard icon="bx bx-low-vision" title="Visibility" value={weather.visibility / 1000 == 10 ? "±10" : weather.visibility / 1000} unit="km" bottom_text={getVisibilityStatus(weather.visibility / 1000)} />
            </Card>
            <Card bgColor="#272727" padding="2rem">
                <div class="h-full flex flex-col text-center gap-2 lg:gap-0 lg:text-left lg:flex-row justify-between items-center">
                    <img src="/weather-icons/sunset.png" alt="" />

                    <div class="flex flex-col">
                        <span class="text-white text-lg">Sunset</span>
                        <span class="text-white text-2xl font-semibold">{weather.sunset}</span>
                    </div>
                </div>
            </Card>
            
        </div>
    </Card>
}

export default Highlights;
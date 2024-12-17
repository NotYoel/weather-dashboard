import Card from "./Card";
import { useSelector } from "react-redux";

function CityInformation() {
    const cityState = useSelector((state) => state.city);
    const city = cityState.city;
    const weather = cityState.weather;

    return <Card>
        <div class="h-full flex flex-col">
            <header class="flex justify-center lg:justify-between">
                <div className="min-h-[40px] rounded-2xl py-2 px-4 bg-[#363636] text-center flex flex-col lg:flex-row items-center text-md text-white gap-2">
                    <i class='bx bx-current-location' ></i>
                    <span className="text-xs lg:text-base">{city.name}</span>
                </div>

                <div class="hidden lg:flex h-[40px] w-[50px] rounded-xl bg-[#363636] text-md font-semibold text-white text-center items-center justify-center">
                    ° C
                </div>
            </header>

            <section class="mt-4">
                <div class="text-center lg:text-left">
                    <span class="text-3xl text-white">{city.dayOfWeek}</span><br />
                    <span class="mt-2 text-white">{city.date}</span>
                </div>

                <div class="flex flex-col-reverse lg:flex-row justify-between items-center gap-2">
                    <div class="text-center lg:text-left">
                        <span class="text-white font-semibold text-3xl lg:text-5xl">{weather.maxTemp}°C</span>
                        <span class="text-white opacity-60 font-semibold text-xl lg:text-2xl ml-2">/{weather.minTemp}°C</span><br />
                        <p class="mt-2 text-white text-lg lg:text-2xl">{weather.description}</p>
                        <span class="text-white opacity-60">Feels like {weather.feelsLike}°C</span>
                    </div>

                    {
                        weather.icon !== "" ? 
                        <img class="h-[120px] lg:h-[160px]" src={`https://openweathermap.org/img/wn/${weather.icon}@4x.png`} alt="Weather Icon" /> : 
                        <div class="h-[120px] lg:h-[160px]"></div>
                    }
                    
                </div>
            </section>
        </div>
    </Card>
}


export default CityInformation;
import Card from "./Card";
import VerticalForecastCard from "./VerticalForecastCard";
import { useSelector } from "react-redux";

function ForecastCard() {
    const forecastData = useSelector((state) => state.city.forecast.data);

    const slideLeft = () => {
        const slider = document.getElementById('slider');
        const scrollAmount = 400; // Adjust this value based on your needs
        slider.scrollLeft = Math.max(slider.scrollLeft - scrollAmount, 0);
    };

    const slideRight = () => {
        const slider = document.getElementById('slider');
        const scrollAmount = 400; // Adjust this value based on your needs
        slider.scrollLeft = slider.scrollLeft + scrollAmount;
    };

    return <Card maxHeight="fit-content">
        <div className="flex items-center justify-between mb-4">
                <h1 className="text-white font-semibold text-2xl">7 Day Forecast</h1>
                <div className="flex gap-2">
                    <button 
                        onClick={slideLeft}
                        className="h-12 w-12 p-2 rounded-full bg-[#363636] text-white hover:bg-[#404040]"
                    >
                        <i className='bx bx-chevron-left text-2xl'></i>
                    </button>
                    <button 
                        onClick={slideRight}
                        className="h-12 w-12 p-2 rounded-full bg-[#363636] text-white hover:bg-[#404040]"
                    >
                        <i className='bx bx-chevron-right text-2xl'></i>
                    </button>
                </div>
            </div>

            <div class="grid h-[253px]" style={{gridTemplateColumns: "minmax(0, 1fr)"}}>
                <div 
                    id="slider"
                    className="flex gap-8 overflow-x-auto overflow-y-hidden scroll-smooth"
                >
                    {
                        forecastData.map((forecast, index) => <VerticalForecastCard key={index} day={forecast.weekday} temp={forecast.temp} icon={forecast.icon} />)
                    }
                </div>
            </div>
    </Card>
}

export default ForecastCard;
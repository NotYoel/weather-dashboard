function VerticalForecastCard(props) {
    return <div className="flex flex-col items-center bg-[#282828] rounded-2xl py-5 px-4 min-w-[150px]">
        <span className="text-white mb-4 text-xl">{props.day}</span>

        <div className="w-full bg-[#363636] h-[1px]"></div>
        
        <img 
                src={`https://cdn.weatherbit.io/static/img/icons/${props.icon}.png`}
                alt="Weather Icon"
                className="h-[100px] my-4"
        />
        
        <span className="text-white text-xl font-semibold mt-2">{props.temp}°C</span>
    </div>
}

export default VerticalForecastCard;
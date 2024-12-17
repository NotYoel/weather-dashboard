function CitySummary(props) {
    return <div className="bg-[#282828] rounded-2xl p-4">
        <div className="flex flex-col lg:flex-row text-center lg:text-left justify-between items-center">
            <div className="flex flex-col">
                <span className="text-sm text-white opacity-60 mb-1">{props.country}</span>
                <span className="text-white text-2xl mb-1">{props.city}</span>
                <span className="text-white text-sm">{props.weather}</span>
            </div>
            {props.icon !== "" ? <img class="h-[100px] mb-4 lg:mb-0" src={`https://openweathermap.org/img/wn/${props.icon}@4x.png`} alt="Weather Icon" /> : <div class="h-[100px] mb-4 lg:mb-0"></div>}
            <div className="text-white text-2xl font-semibold">
                {props.tempHigh}°C<span className="text-sm opacity-60">/{props.tempLow}°C</span>
            </div>
        </div>
    </div>
}

export default CitySummary;
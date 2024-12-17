function SmallCard(props) {
    return <div class="flex flex-col justify-between items-center h-full text-center">
        <div class='flex flex-col xl:flex-row gap-2'>
            <i class={`${props.icon} text-white text-md xl:text-lg`}></i>
            <span class="text-white font-semibold text-sm xl:text-base">{props.title}</span>
        </div>
        <p class="text-white text-xl xl:text-2xl font-semibold">{props.value} <span class="text-white text-[12px]">{props.unit}</span></p>
        <span class="text-white opacity-80 text-sm">{props.bottom_text}</span>
    </div>
}

export default SmallCard;
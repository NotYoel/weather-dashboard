function Card(props) {
    const color = props.bgColor ? props.bgColor : "#1E1E1E";
    const padding = props.padding ? props.padding : "1.5rem";
    const maxHeight = props.maxHeight ? props.maxHeight : "initial";
    return <div class="rounded-2xl" style={{backgroundColor: color, padding: padding, maxHeight: maxHeight}}>
        {props.children}
    </div>
}

export default Card;
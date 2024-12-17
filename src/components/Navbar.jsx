import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCityData } from '../redux/citySlice'

function Navbar() {
    const [inputValue, setInputValue] = useState("");
    const dispatch = useDispatch();

    const onFormSubmit = (event) => {
        // Stop it from reloading the page.
        event.preventDefault();
        
        // Change city name
        dispatch(fetchCityData(inputValue));
    }

    return <div className="w-full h-[100px] flex flex-col md:flex-row items-center justify-center md:justify-between mb-8 md:mb-0">
        <div className="text-center md:text-left">
            <span className="text-white text-lg">Hello,</span><br />
            <span className="font-semibold text-white text-2xl">Good Morning</span>
        </div>

        <div className='relative'>
            <form className="w-full md:w-[375px] h-[45px] rounded-full bg-[#1E1E1E] px-4 py-[5px] flex items-center mt-4 md:mt-0" onSubmit={onFormSubmit}>
                <button type="submit">
                    <i className='bx bx-search text-white opacity-60 text-xl relative top-[1px] hover:opacity-100' 
                       style={{transition: "opacity 0.3s ease"}}></i>
                </button>
                <input 
                    name="city" 
                    type="text"
                    className="h-full w-full ml-2 outline-none bg-transparent text-white opacity-60" 
                    placeholder="Search your location" 
                    autoComplete='off'
                    onChange={(event) => setInputValue(event.target.value)}
                />
            </form>
        </div>
    </div>
}

export default Navbar;
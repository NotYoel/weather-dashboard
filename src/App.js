import './App.css';
import CityInformation from './components/CityInformation';
import Navbar from './components/Navbar';
import Highlights from './components/Highlights';
import ForecastCard from './components/ForecastCard';
import OtherCities from './components/OtherCities';

function App() {
  return (
    <div className="App overflow-x-hidden">
      <div class="min-h-screen w-screen py-10 px-4 xl:px-20 bg-[#0f0f0f] grid grid-rows-[auto_1fr]">
        <Navbar />

        <div className="grid gap-[25px] grid-cols-1 md:grid-cols-[2fr_3fr]">

          <div class="grid gap-[25px]" style={{gridTemplateRows: "minmax(300px, auto) 1fr"}}>
            <CityInformation />
            <OtherCities />
          </div>

          <div class="grid gap-[25px]" style={{gridTemplateRows: "minmax(350px, auto) 1fr"}}>
            <Highlights />
            <ForecastCard />
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;

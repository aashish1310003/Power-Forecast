import React, { useEffect, useState } from "react";
import getFormattedWeatherData, { iconUrlFromCode } from "../api/weatherService"; // Adjust the path accordingly
import { WiThermometer, WiHumidity ,WiDaySunny,WiRaindrop,} from 'react-icons/wi';
const WeatherComponent = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Add the required search parameters here
        // For example: city name, zip code, etc.
        const searchParams = { q: "Erode" ,units:"metric"};
        const data = await getFormattedWeatherData(searchParams);
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures that this effect runs only once

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="detailsGrid">
      <div className="details1">
      
      </div>
      <div className="details2">
  <div className="detail-item">
    <WiThermometer style={{ fontSize: "5em", marginRight: "10px", marginTop: 30 ,marginLeft:-45}} />
    <div>
      <p style={{ fontSize: "1em" }}>Temp Feels Like</p>
      <h1 style={{ fontSize: "2em" ,marginTop:-2}}>{weatherData.feels_like}</h1>
    </div>
  </div>
</div>
<div className="details3">
  <div className="detail-item">
  <WiDaySunny style={{ fontSize: "5em", marginRight: "10px", marginTop: 30 }} />
    <div>
      <p>UV-I</p>
      <h1 style={{ fontSize: "2em" ,marginTop:-2}}>{weatherData.uvi}</h1>
    </div>
  </div>
</div>
      <div className="details4">
      <div className="detail-item">
    <WiRaindrop style={{ fontSize: "5em", marginRight: "10px", marginTop: 30 }} />
    <div>
      <p>Humidity</p>
      <h1 style={{ fontSize: "2em",marginTop:-2 }}>{weatherData.humidity}</h1>
    </div>
  </div>
      </div>
    </div>
  );
};

export default WeatherComponent;

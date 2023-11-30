import React, { useEffect, useState } from "react";
import getFormattedWeatherData from "../api/weatherService"; // Adjust the path accordingly
import "../styles/Pollution.css";
import { WiDaySunny, WiDust, WiDayFog } from 'react-icons/wi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeLowVision,faFeather } from '@fortawesome/free-solid-svg-icons';

const PollutionComponent = ({ latitude, longitude }) => {
  const [pollutionData, setPollutionData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchPollutionData = async () => {
      try {
        const pollutionUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=11.3306483&lon=77.7276519&appid=bd5e378503939ddaee76f12ad7a97608`;
        const pollutionResponse = await fetch(pollutionUrl);
        const pollution = await pollutionResponse.json();
        setPollutionData(pollution);
        const searchParams = { q: "Erode", units: "metric" };
        const data = await getFormattedWeatherData(searchParams);
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching pollution data:", error);
      }
    };

    fetchPollutionData();
  }, [latitude, longitude]);

  if (!pollutionData || !weatherData) {
    return <div>Loading data...</div>;
  }

  return (
    <div className="pollutionDetails">
      <h2>Pollution Details</h2>
      <div className="details-container">
  <div className="detail aqi">
    
    <p style={{ marginLeft: 100  }}><strong>AQI</strong></p>
    <FontAwesomeIcon size="2xl" icon={faFeather}  color="white" style={{ marginLeft: 25, marginTop:-5 }} />
  </div>
  <div className="detail pm">
        <p style={{ marginLeft: 80  }}><strong>PM2.5</strong></p>
        <WiDust size={60} color="white" style={{ marginLeft: 60, marginTop:-20 }} />

  </div>
  <div className="detail vis">
   <p style={{ marginLeft: 200 }}><strong>Visibility</strong></p>
   <FontAwesomeIcon size="2xl" icon={faEyeLowVision}  color="white" style={{ marginLeft: 130, marginTop:-10 }} />
  </div>
</div>
      <div className="answer">
      <p style={{marginLeft:140, marginTop:-45, fontSize:30}}><strong>{pollutionData.list[0].main.aqi}</strong></p>
      <p style={{marginLeft:200,marginTop:-45, fontSize:28}}><strong>{pollutionData.list[0].components.pm2_5}</strong></p>
      <p  style={{marginLeft:170,marginTop:-45, fontSize:28}}><strong>{weatherData.vis}</strong></p>
      </div>
    </div>
  );
};

export default PollutionComponent;


import React, { useState } from "react";
import SolarCard from "../api/fetchdata";
import "../styles/cost.css";

const CostEmission = () => {
  const [value, setValue] = useState(null);
  const [selectedButton, setSelectedButton] = useState('button1');

  const handleDataReceived = (data) => {
    setValue(data.todayValue);
    console.log(data.todayValue);
    // Do something with the data...
  };

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };
  <SolarCard onDataReceived={handleDataReceived} />
  return (
    <div className="costclass">
      {/* Wrap <SolarCard> component here */}

      {/* Log the value here to check */}
      {console.log(value)}
  
      <nav role="navigation">
        <ul>
          <li>
            <a href="#" onClick={() => handleButtonClick('button1')}>
              <span className="inner">Co</span>
              {/* <button className="icon-home"></button> */}
            </a>
          </li>
          <li>
            <a href="#" onClick={() => handleButtonClick('button2')}>
              <span className="inner">RS</span>
              {/* <button className="icon-html5"></button> */}
            </a>
          </li>
        </ul>
      </nav>
  
      {selectedButton === 'button1' && (
        <div className="divClass1">
          <h1>{(value * 6.29).toFixed(0)}</h1>
        </div>
      )}
  
      {selectedButton === 'button2' && (
        <div className="divClass2">
          <h1>{(value * 0.94).toFixed(0)} kg</h1>
        </div>
      )}
    </div>
  );
  
};

export default CostEmission;

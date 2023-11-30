import React, { useEffect, useState } from 'react';
import SunCalc from 'suncalc';
import "../test/test.css"
const SunPositionDisplay = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [sunPosition, setSunPosition] = useState({ azimuth: 0, elevation: 0 });

  useEffect(() => {
    const getCurrentSolarPosition = () => {
      // Get current date and time
      const now = new Date();

      // Get solar position using user-input latitude and longitude
      const solarPosition = SunCalc.getPosition(now, latitude, longitude);

      // Convert azimuth to degrees and map it to the range [0, 180)
      let azimuth = (solarPosition.azimuth * 180) / Math.PI;
      azimuth = (azimuth + 180) % 360; // Ensure azimuth is in the range [0, 360)
      azimuth = azimuth >= 180 ? azimuth - 180 : azimuth; // Map to the range [0, 180)

      // Convert elevation to degrees
      const elevation = (solarPosition.altitude * 180) / Math.PI;

      return { azimuth, elevation };
    };

    const updateSunPosition = () => {
      const { azimuth, elevation } = getCurrentSolarPosition();
      setSunPosition({ azimuth, elevation });
    };

    // Update sun position every second (you can adjust the interval as needed)
    const intervalId = setInterval(updateSunPosition, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [latitude, longitude]);

  const { azimuth, elevation } = sunPosition;

  // Scale the values to fit the specified range in your graph
  const scaledAzimuth = (azimuth / 180) * 45; // Map azimuth to [0, 45]
  const scaledElevation = (elevation / 90) * 180; // Map elevation to [0, 180]
  const currentDate = new Date();
  const hours = 10;
  const minutes = currentDate.getMinutes();

  // Calculate the angle for the sun's position
  const angle = (15 * hours + 0.25 * minutes - 90) % 360;

  // Convert the angle to radians for CSS rotation
  const radians = (angle * Math.PI) / 180;
  return (
    <div className="container">
      <div
        className="sun"
        style={{
          transform: `translate(${55}%, ${120}%)`,
        }}
      ></div>
    </div>
  );
};

export default SunPositionDisplay;

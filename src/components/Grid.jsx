import React, { useEffect, useState ,Image} from "react";
import axios from "axios";
import "../styles/Grid.css";
import weatherImage from "../assets/images/weather_icons/02d.png";
import Future from "../api/Future";
import Test from "../test/test";
import SunComponent from "../test/SunComponent";
import Details from "./details";
import WeatherComponent from "./currentInformation";
import { IoPowerSharp } from 'react-icons/io5';
import { GiPaperWindmill } from "react-icons/gi";
import PollutionComponent from "./PollutionComponent";
const Grid = () => {
  const [todayValue, setTodayValue] = useState(0);

  const [todaySeries, setTodaySeries] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const current = new Date();
        const indianDate = new Date(current.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
        const currentDate = indianDate.toLocaleDateString();

        console.log(currentDate);


        const data = {
          collection: "prediction",
          database: "solar",
          dataSource: "solarCluster0",
          projection: {
            _id: 1,
            period_end: 1,
            "Predicted Solar Power": 1,
          },
          sort: {
            period_end: -1,
          },
        };

        const response = await axios.post(
          "/api/app/data-tkeqt/endpoint/data/v1/action/find",
          JSON.stringify(data)
        );
        const apiData = response.data.documents.map((doc) => ({
          id: doc._id,
          power: doc["Predicted Solar Power"],
          value: new Date(doc.period_end).toLocaleDateString(),
          time: new Date(doc.period_end).toLocaleTimeString('en-US', {
            timeZone: 'Asia/Kolkata',
            hour12: false,
          }).slice(0, 5),
        }));

        console.log(apiData);

        const currentDateValues = apiData.filter((item) =>
          currentDate.includes(item.value)
        );
        currentDateValues.sort((a, b) => {
          const timeA = a.time;
          const timeB = b.time;

          // Compare based on time
          const timeComparison = timeA.localeCompare(timeB);

          // If the times are different, use the time comparison result
          if (timeComparison !== 0) {
            return timeComparison;
          } else {
            // If times are the same, compare based on value
            const valueA = a.value;
            const valueB = b.value;
            return valueA.localeCompare(valueB);
          }
        });

        console.log(currentDateValues);


        const filteredValues = currentDateValues;


        const newSum = filteredValues.reduce(
          (accumulator, currentValue) => accumulator + currentValue.power,
          0
        );

        setTodaySeries(filteredValues);
        setTodayValue(newSum);



        console.log("From Grid Sum of values greater than 0.1:", newSum);
        console.log("**********************************************");
        console.log(currentDateValues);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className='grid-container'>
      <div className='grid item1' style={{ borderRadius: 10,textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center',
       marginBottom:85
       }}>
      <img
    src={weatherImage}
    alt="Solar"
    style={{ width: "100px", height: "100px", marginBottom: "10px", marginRight: "10px", 
    mixBlendMode:'screen'
  }}
  />
  <div style={{ display: "flex", flexDirection: "column", alignItems: 'center', justifyContent: 'center' }}>
    <p style={{ color: "white", margin: 0, fontSize: "1.5em" }}>TODAY's Power</p>
    <p style={{ color: "white", margin: 0, fontSize: "1.2em" }}>Output</p>
  </div>
  <p style={{ color: "white", marginTop: 15, fontSize: "2.5em" }}>{todayValue.toFixed(2)}Kw</p>
</div>
      <div className='grid item2' style={{ borderRadius: 10 }}>
        <div className="subGridContainer">
          <div className="subgrid item11" style={{ borderRadius: 10 }}><WeatherComponent/></div>
          <div className="subgrid item22" style={{ borderRadius: 10 }}>
            <div style={{display:'flex',flexDirection:'row'}}>
            <GiPaperWindmill size={50} color="white" style={{marginLeft:20}}/>  <Test/>
            <h1 style={{color:'white',position:'absolute',fontSize:12,marginTop:125,marginLeft:100}}>06:00</h1>
            <h1 style={{color:'white',position:'absolute',fontSize:12,marginTop:125,marginLeft:280}}>18:00</h1>
            </div>
            <h1 style={{marginBottom:-10,marginTop:-40,color:'white'}}>20kw</h1>
            </div>
          <div className="subgrid item33" style={{ borderRadius: 10 }}>

            <PollutionComponent />
          </div>
          <div className="subgrid item44" style={{ borderRadius: 10,fontFamily:'Poppins' }}>4</div>
        </div>
        </div>
      <div className='grid item3' style={{ borderRadius: 10 ,marginTop:-130}}>

        <Future />
      </div>
      <div className='grid item4' style={{ borderRadius: 10 }}>
        <div className="hour">
          {todaySeries.map((item) => (
            <div key={item.id} className="horizontal-card">
              <img
    src={require('../assets/power.png')}
    alt="power"
    style={{ width: "45px", height: "45px", marginBottom: "10px", marginRight: "10px",
    filter: "brightness(0) invert(1)",
  }}
  />
              <p style={{ color: "white" }}>Power: {item.power.toFixed(2)}</p>
              <p style={{ color: "white" }}>{item.time}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Grid
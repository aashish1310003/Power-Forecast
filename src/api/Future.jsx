import { React, useEffect, useState } from "react";
import axios from "axios";
import "../styles/Future.css"
import "../styles/Future.css"
import Test from "../test/test";

var currentDate = new Date();
var next5Dates = Array.from({ length: 10 }, (_, index) => {
    var nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + index);
    return nextDate;
  }); 

// Format and store only the date portion of the array of next 5 dates in a new array
var formattedDates = next5Dates.map(function(date) {
  return date.toLocaleDateString();
});console.log(formattedDates);

const Future = () => {
  
  const [futureData,setfutureData] = useState(0);
  const [finalData,setFinalData] = useState(0);
    useEffect(() => {
        var data = JSON.stringify({
          "collection": "prediction",
          "database": "solar",
          "dataSource": "solarCluster0",
          "projection": {
            "_id":1,
            "period_end": 1,
            "Predicted Solar Power":1
          },
          "sort": {
            "period_end": -1
          }
        });

    axios.post('/api/app/data-tkeqt/endpoint/data/v1/action/find', data)
      .then(function (response) {
        const apiDates = response.data.documents.map(doc => ({ id: doc._id,value:doc['Predicted Solar Power'], date: new Date(doc.period_end).toLocaleDateString() }));
        //console.log(apiDates)
        const otherList = formattedDates;//['9/3/2023', '8/22/2023', '8/23/2023', '8/24/2023', '8/25/2023'];

        const intersection = apiDates.filter(apiItem => {
          const commonValue = apiItem.date;
          return otherList.includes(commonValue);
        });
        setfutureData(intersection);
        // console.log("**********************************************")
        // console.log(intersection);

        // Calculate the sum of values for each date
        const sumByDate = intersection.reduce((acc, item) => {
            const { date, value } = item;
            acc[date] = (acc[date] || 0) + value;
            return acc;
        }, {});
        
        // Convert the result to an array of objects if needed
        const futureData = Object.keys(sumByDate).map(date => ({
            date,
            sum: sumByDate[date],
        }));
        futureData.sort((a, b) => new Date(a.date) - new Date(b.date));
        console.log(futureData);
        setFinalData(futureData)
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []); // Empty dependency array to trigger the request once on component mount

  return (
    <div className="day">{}
    <h1 style={{color:'white'}}>Weekly Forecast</h1>
      {Array.isArray(finalData) && finalData.map((item, index) => (
        <div key={index} className="horizontal-card1">
          <p key={item.id} style={{ color: "white" }}>{item.sum.toFixed(2)} Kw</p>
          <div key={item.id}>
            {
              // Assuming item.date is a string like "11/24/2023"
              (() => {
                const parsedDate = new Date(item.date);
                console.log(parsedDate)
                const formattedDate = `${parsedDate.getDate()} ${parsedDate.toLocaleString('default', { month: 'short' })}`;
                const days = parsedDate.toLocaleString('en-US', { weekday: 'short' });
                return <p style={{color:"white"}}>{formattedDate}      {days}</p>;
              })()
            }
          </div>
        </div>
      ))}
    </div>
  );
  
};

export default Future;
import "../styles/Header.css"
import React from 'react';
import { IoMdSearch } from "react-icons/io";
const Header = () => {
  return (
    <div className="Header">
      <div className="Left">
        <h3 style={{marginTop:10}}>Weather Dashboard</h3>
      </div>
      
      <div className="Right">
        <button style={{backgroundColor:'white',width:225,height:45,borderRadius:20,fontFamily:'Poppins'}}>Sathyamangalam</button>
      </div>
    </div>
  );
}

export default Header;

import "./App.css";
import React, { useState,useEffect } from "react";
import Sidebar from "./components/Sidebar";

function App() {

  const [name, setName] = useState("");
  const [cityName, setCityName] = useState("london");
  // const [err, setErr] = useState();
  const [data, setData] = useState();


  useEffect(() => {
    const fetchApi = async()=>{
          const APIKEY = '5d3e1ba6775c5a97031d5f4705beeaad';
          const url = 'https://api.openweathermap.org/data/2.5/weather?q='+cityName+'&units=metric&APPID='+APIKEY+'';
          const response = await fetch(url);
          const data = await response.json();
          setData(data);
    }
   fetchApi();
  },[cityName])


  useEffect(() => {
    function getLocation(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(success)
        }
      }
      function success(position){
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const fetchCurrentLocation = async()=>{
              const APIKEY = '5d3e1ba6775c5a97031d5f4705beeaad';
              const url = 'https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid='+APIKEY+'';
              const response = await fetch(url);
              const data = await response.json();
              // setData(data);
              setCityName(data.name);
        }
        fetchCurrentLocation();
      }
        getLocation();
  },[1])

  function getData(val) {
    setName(val.target.value);
  }

  function onSubmit() {
    setCityName(name);
  }


  return (
    <>
      <div className="App container" >
        <h1 className="logo"> Weather App </h1>
        <div>
          <input
            id="inputId"
            type="text"
            placeholder="Enter your city"
            onChange={getData}
          />
          <button onClick={onSubmit} id="searchbtn">
            
            search
          </button>
        </div>
        {
          !cityName?
          <p className='text-danger'>city not found</p>
        :<div id="main">
          <div id="left">
            
            {data && (
              <Sidebar className='col-12'
                name1={["Today : "]}
                props1={new Date().toJSON().slice(0,10).replace(/-/g,'/')}
                name2={["Humidity : "]}
                props2={data.main.humidity}
                name3={["Speed : "]}
                props3={data.wind.speed}
                name4={[" km/h"]}
                name5={["Sunrise : "]}
                props4={Date((data.sys.sunrise)*1000)}
              />
            )}
          </div>
          {data && (
            <div id="details" className="container mt-5">
              <h2 id="cityName"> {cityName} </h2>
              <h4> {data.sys.country} </h4>
              <p className="text-muted"> feels_like : {data.main.feels_like} </p>
              <h1 id="temp"> {Math.floor(data.main.temp)} &#176;C</h1>
              <img id="icon" src={'http://openweathermap.org/img/wn/'+data.weather[0].icon+'.png'} alt='weather icon' />
              <p> {data.weather[0].description} </p>
            </div>
          )}
          <div id="right">
            
            {data && (
              <Sidebar
                name1={["Pressure : "]}
                // props1={new Date().toLocaleTimeString()}
                props1={data.main.pressure/1000}
                name2={["Min : "]}
                name7={[" nPa"]}
                props2={Math.floor(data.main.temp_min)}
                unit={" \u00b0C"}
                name3={["Max : "]}
                props3={Math.floor(data.main.temp_max)}
                name6={["Sunset : "]}
                props5={Date((data.sys.sunset))}
              />
            )}
          </div>
        </div>
        }
      </div>
      <div className="footer container p-3 text-light">
        <p className="text-center">
          copyrights <span>&copy;</span>2021
          <span> created by <strong>Shashi Ranjan</strong></span>
        </p>
      </div>
    </>
  );
}

export default App;
import React from "react";
import axios from "axios";
import { useState } from "react";
import "./style.css";
import { PiWindThin } from "react-icons/pi";
import { WiHumidity } from "react-icons/wi";

function Home() {
  const [data, setData] = useState({
    celcius: 10,
    name: "kathmandu",
    humidity: 10,
    speed: 2,
    image: "/Images/clouds.png",
  });

  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleClick = () => {
    if (name !== "") {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=b0601eb379b3eecc925b3a443a69dd07&&units=metric`;
      axios
        .get(apiUrl)
        .then((res) => {
          setError("")
          let imagePath = "";
          if (res.data.weather[0].main === "Clouds") {
            imagePath = "/Images/clouds.png";
          } else if (res.data.weather[0].main === "Clear") {
            imagePath = "/Images/clear.png";
          } else if (res.data.weather[0].main === "Rain") {
            imagePath = "/Images/rain.png";
          } else if (res.data.weather[0].main === "Drizzle") {
            imagePath = "/Images/drizzle.png";
          } else if (res.data.weather[0].main === "Mist") {
            imagePath = "/Images/mist.png";
          } else {
            imagePath = "/Images/clouds.png";
          }
          console.log(res);
          setData({
            celcius: res.data.main.temp,
            name: res.data.name,
            humidity: res.data.main.humidity,
            speed: res.data.wind.speed,
            image: imagePath,
          });
          setName("");
        })
        .catch((err) => {
            setError("Invalid City Name");
         
        });
    }
  };

  return (
    <div className="container">
      <div className="Weather">
        <div className="search">
          <input
            type="text"
            autoComplete="off"
            placeholder="Enter City Name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button>
            <img src="/Images/search.png" onClick={handleClick} alt=" " />
          </button>
        </div>
        <div className="error">
          <p>{error}</p>
        </div>
        {!data && <div> NOT FOUND</div>}
        <div className="winfo">
          <img src={data.image} alt="" />
          <h1>{Math.round(data.celcius)}°C</h1>
          <h2>{data.name}</h2>
          <div className="details">
            <div className="col">
              <WiHumidity size={40} />
              <div className="humidity">
                <p>{Math.round(data.humidity)}%</p>
              </div>
            </div>
            <div className="col">
              <PiWindThin size={40} />
              <div className="wind">
                <p>{Math.round(data.speed)}km/h</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

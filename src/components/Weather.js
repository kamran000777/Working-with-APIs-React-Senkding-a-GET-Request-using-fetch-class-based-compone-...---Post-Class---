import React, { useEffect, useState } from "react";
const months = [
  "January",
  "February",
  " March",
  "April",
  "May",
  "June",
  "July",
  "August",
  " September",
  "October",
  "November",
  "December"
];

const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

const API__KEY = "1e2b62281f84e5fdfe9e33d076c7afa1";
const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

const Weather = () => {
  let lat = 22;
  let long = 88;
  const inputRef = React.createRef();
  const [report, setReport] = useState({});

  const date = new Date();
  const month = months[date.getMonth()];
  const day = weekDays[date.getDay()];
  const year = date.getFullYear();
  const dayOfMonth = date.getDate();

  function getLocation() {
    navigator.geolocation.getCurrentPosition(
      showLocation,
      (err) => console.log(err),
      options
    );
  }
  getLocation();

  function showLocation(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;
  }

  const submitHandler = (e) => {
    if (e.key === "Enter") {
      const location = e.target.value;
      e.target.value = "";
      search(location);
    }
  };

  function search(location) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API__KEY}`
    )
      .then((res) => res.json())
      .then((response) => {
        if (response.cod === 200) {
          setReport(response);
        }
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API__KEY}`
    )
      .then((res) => res.json())
      .then((response) => setReport(response))
      .catch((err) => console.log(err));
    inputRef.current.focus();
  }, [lat, long]);

  return (
    <div>
      <input type="text" ref={inputRef} onKeyPress={submitHandler} />

      {JSON.stringify(report) !== "{}" ? (
        <>
          <h2>Temperature:{Math.round(report.main.temp - 273.15)}°c</h2>
          <h4>Location : {report.name}</h4>
          <h4>Country : {report.sys.country}</h4>
          <p>Weather-type : {report.weather[0].main}</p>
          <p>
            Date : {dayOfMonth} {month} {year}
          </p>
          <p>Day : {day}</p>
        </>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};

export default Weather;

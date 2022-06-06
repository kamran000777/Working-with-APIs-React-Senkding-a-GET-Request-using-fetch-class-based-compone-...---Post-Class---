import React, {Component, useState} from "react";
import Weather from "./Weather";
import News from "./News";
import '../styles/App.css';

const App = () => {
  return (
    <>
    <Weather />
      <News />
    </>
  )
}


export default App;

import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Manager from "./components/Manager";
import Footer1 from "./components/Footer1";

function App() {
  return (
    <>
      <Navbar />
      <Manager/>
      <Footer1 />
    </>
  );
}

export default App;

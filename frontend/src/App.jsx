import { useState } from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import "./app.css";
function App() {
  return (
    <div className=" bg-gradient-to-r  from-[#e6d5dd] to-[#9eb2e9]">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;

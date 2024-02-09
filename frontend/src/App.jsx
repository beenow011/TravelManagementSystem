import { useState } from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import { useLocation } from "react-router-dom";
import "./app.css";
function App() {
  const location = useLocation();
  return (
    <div className=" bg-gradient-to-r from-slate-900 to-slate-700">
      <div
        className={` shadow-md shadow-white  ${
          location.pathname === "/" ? "h-48 mb-10" : "h-0"
        } bg-login bg-auto`}
      ></div>
      <Header />
      <hr className="w-[80vw] mx-auto mt-10" />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;

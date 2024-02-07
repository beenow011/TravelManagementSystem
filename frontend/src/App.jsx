import { useState } from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";

function App() {
  return (
    <div className=" bg-gradient-to-r  from-[#F083BA] to-[#D4B8E9]">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;

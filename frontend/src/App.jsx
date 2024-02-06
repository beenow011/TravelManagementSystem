import { useState } from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="h-screen bg-gradient-to-r from-[#737DBB] via-[#F083BA] to-[#D4B8E9]">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;

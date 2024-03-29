import React from "react";
import { useNavigate } from "react-router-dom";
import dinocar from "../assets/dinocar.png";
import hotel from "../assets/hotel.png";
function BigHero() {
  const navigate = useNavigate();
  return (
    <div className="md:flex-1  lg:h-96 lg:w-[57vw] m-3 text-white bg-neutral-600/40 shadow-lg shadow-black rounded-md  p-3">
      <h1 className="text-3xl font-bold mt-5 text-[#d47f8f]">
        Discover unbeatable deals on rentals and stays!
      </h1>
      <div className="flex flex-col lg:flex-row justify-center items-center mt-10 gap-10">
        <div
          className="  hover:bg-slate-600/50 h-42 w-42  rounded-md p-3 flex items-end justify-center bg-cover transition cursor-pointer"
          onClick={() => navigate("/cars")}
        >
          <img src={dinocar} width={200} />
          <h1 className="text-2xl font-bold text-center mb-10 font-banner">
            Car rentals
          </h1>
        </div>
        <div
          className=" h-42 w-42 bg-cover hover:bg-slate-600/50 rounded-md p-3 flex items-end justify-center transition cursor-pointer"
          onClick={() => navigate("/rooms")}
        >
          <img src={hotel} width={200} />
          <h1 className="text-2xl font-bold text-center mb-10 font-banner">
            Hotel rooms
          </h1>
        </div>
      </div>
    </div>
  );
}

export default BigHero;

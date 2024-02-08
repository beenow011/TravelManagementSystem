import React from "react";
import SmallHero from "../components/SmallHero";
import BigHero from "../components/BigHero";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const userStatus = useSelector((state) => state.status);
  return (
    <div className="p-10 flex flex-col justify-center">
      <div className="bg-banner h-96 bg-cover w-[80vw] p-10 rounded-md shadow-lg shadow-black mx-auto flex justify-center items-center  flex-wrap">
        <h1 className="text-3xl font-bold font-banner text-[#043263]">
          Revolutionizing Travel Management: Seamlessly Navigate Room Bookings
          and Car Rentals with Our Unified Solution!
        </h1>
      </div>
      {userStatus ? (
        <div className="flex md:w-[80vw] flex-col lg:flex-row mx-auto mt-10 ">
          <SmallHero />
          <BigHero />
        </div>
      ) : (
        <div className="flex w-[80vw] mx-auto mt-10">
          <h1 className="text-3xl font-bold text-blue-500 ">
            Kindly login to start Your travel journey.
          </h1>
          <button
            onClick={() => navigate("/login")}
            className="text-white bg-blue-500 p-3 rounded-md shadow-md hover:bg-blue-800 ml-4"
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaHotel } from "react-icons/fa";
import { AiFillCar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
function SmallHero() {
  const userData = useSelector((state) => state.userData) || 0;
  const navigate = useNavigate();
  // const [userData, setUserData] = useState();
  // useEffect(() => {
  //   axios
  //     .get("/api/user/getUser", userID)
  //     .then((res) => setUserData(res?.data?.data))
  //     .catch((err) => console.log(err.message));
  // }, []);
  // console.log("userData", userData);
  // console.log("userID", userID);
  return (
    <div className="md:flex-2  lg:h-96 lg:w-[17vw] m-3 bg-neutral-600/40 shadow-lg shadow-black rounded-md  p-4">
      <h1 className="text-3xl font-bold text-[#66b0c9] mt-5">
        Hi! {userData?.username}
      </h1>
      <h1 className="text-xl font-semibold text-white ">Your Bookings</h1>
      <div className="w-full flex flex-col h-3/4 gap-2 text-2xl text-white font-bold ">
        <div
          className="bg-slate-600/50 hover:shadow-lg hover:border 
        p-3 rounded-md shadow-black flex-1 transition text-[#f5e380] flex justify-center gap-2 items-center cursor-pointer"
          onClick={() => navigate("/user/room")}
        >
          <FaHotel className="text-white text-3xl" />
          Room Bookings
        </div>
        <div
          className="bg-slate-600/50 hover:shadow-lg hover:border 
        p-3 rounded-md shadow-black flex-1 transition text-[#f5e380] flex justify-center gap-2 items-center cursor-pointer"
          onClick={() => navigate("/user/car")}
        >
          <AiFillCar className="text-white text-3xl" />
          Rental Bookings
        </div>
      </div>
    </div>
  );
}

export default SmallHero;

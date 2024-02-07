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
    <div className="flex-2  h-96 w-[17vw] m-3 bg-neutral-600/40 shadow-lg shadow-black rounded-md  p-4">
      <h1 className="text-3xl font-bold text-[#2d677b] mt-5">
        Hi! {userData?.username}
      </h1>
      <h1 className="text-xl font-semibold ">Your Bookings</h1>
      <div className="w-full flex flex-col h-3/4 gap-2 text-2xl text-white font-bold ">
        <div
          className="bg-slate-600/50 hover:shadow-lg hover:border 
        p-3 rounded-md shadow-black flex-1 transition text-[#d9c242] flex justify-center gap-2 items-center"
          onClick={() => navigate("/user/room")}
        >
          <FaHotel className="text-black text-3xl" />
          Room Bookings
        </div>
        <div
          className="bg-slate-600/50 hover:shadow-lg hover:border 
        p-3 rounded-md shadow-black flex-1 transition text-[#d9c242] flex justify-center gap-2 items-center"
        >
          <AiFillCar className="text-black text-3xl" />
          Rental Bookings
        </div>
      </div>
    </div>
  );
}

export default SmallHero;

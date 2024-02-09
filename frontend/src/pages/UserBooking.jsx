import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaHotel } from "react-icons/fa";
import { AiFillCar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
function UserBooking() {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userData);
  const userID = userData?.userID;
  const [booking, setBooking] = useState();
  useEffect(() => {
    axios
      .post("/api/user/userBooking", {
        userID,
      })
      .then((res) => setBooking(res?.data?.data[0]))
      .catch((err) => console.log(err));
  }, [userID]);
  console.log(booking);
  return (
    <div className="w-[80vw] mx-auto p-4 text-white mb-10">
      <h1 className="text-3xl font-bold text-[#2d677b] my-5">Your Bookings</h1>
      <div>
        <div className=" flex  h-3/4 gap-2 text-2xl text-white font-bold ">
          <div
            className="bg-slate-600/50 h-32 hover:shadow-lg hover:border 
        p-3 rounded-md shadow-black flex-1 transition text-[#d9c242] flex justify-center gap-2 items-center cursor-pointer"
            onClick={() => navigate("/user/room")}
          >
            <FaHotel className="text-black text-3xl" />
            Room Bookings
          </div>
          <div
            className="bg-slate-600/50 h-32 hover:shadow-lg hover:border 
        p-3 rounded-md shadow-black flex-1 transition text-[#d9c242] flex justify-center gap-2 items-center cursor-pointer"
            onClick={() => navigate("/user/car")}
          >
            <AiFillCar className="text-black text-3xl" />
            Rental Bookings
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-[#2d677b] my-5">Overview</h1>
          <p className="font-semibold">
            Hey {booking?.username}, checkout the summary of your bookings.
          </p>
          <div className="flex flex-wrap gap-5 m-3">
            <div className="bg-slate-600/50 mb-10 p-3 rounded-md">
              <b>Total rooms booked:</b>
              <p>{booking?.numberOfRoomBookings}</p>
            </div>
            <div className="bg-slate-600/50 mb-10 p-3 rounded-md">
              <b>Total room price:</b>
              <p className="text-green-600">₹{booking?.totalRoomPrice}</p>
            </div>
            <div className="bg-slate-600/50 mb-10 p-3 rounded-md">
              <b>Total cars booked:</b>
              <p className="">{booking?.numberOfCarBookings}</p>
            </div>
            <div className="bg-slate-600/50 mb-10 p-3 rounded-md">
              <b>Total car price:</b>
              <p className="text-green-600">₹{booking?.totalCarPrice}</p>
            </div>
          </div>
          <div className="bg-slate-600/50 mb-10 p-5 rounded-md">
            <b>Overall price:</b>
            <p className="text-green-600">₹{booking?.totalBookingPrice}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserBooking;

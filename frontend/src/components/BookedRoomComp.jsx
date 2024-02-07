import React from "react";
import { MdDelete } from "react-icons/md";
function BookedRoomComp({
  roomID,
  hotelID,
  bookingDate,
  days,
  price,
  hotelName,
  roomNumber,
  roomType,
  location,
}) {
  return (
    <div
      className={`h-96 p-4 flex justify-between bg-cover ${
        roomType === "Suite"
          ? "bg-suite"
          : roomType === "Standard"
          ? "bg-standard"
          : "bg-deluxe"
      }`}
    >
      <div className="flex flex-col justify-between h-full">
        <div className="bg-[#366a83] w-fit pl-5 pr-5">
          <h1 className="text-3xl font-bold  mt-5 text-white w-fit pt-3">
            {hotelName}
          </h1>
          <p className="text-white font-semibold pb-3">{location}</p>
        </div>
        <div className="bg-[#b15b39c9] w-fit p-3 ">
          <h1 className="text-3xl font-bold">₹{price}</h1>{" "}
          <p className="text-lg mt-2">/{days} days</p>
        </div>
      </div>
      <div className="flex flex-col justify-end items-center h-full group">
        <p className=" font-semibold group-hover:bg-red-700">Cancel Booking</p>
        <MdDelete
          size={64}
          className="bg-red-600 rounded-s-md group-hover:bg-red-700"
        />
      </div>
    </div>
  );
}

export default BookedRoomComp;

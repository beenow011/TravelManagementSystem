import React from "react";
import { MdDelete } from "react-icons/md";
import axios from "axios";

function BookedRoomComp({
  roomID,
  hotelID,
  bookingID,
  bookingDate,
  days,
  price,
  hotelName,
  roomNumber,
  roomType,
  location,
  onBookingCanceled,
}) {
  const cancelBooking = async () => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        const res = await axios.post("/api/hotel/cancelBooking", { bookingID });
        console.log(res.data);
        onBookingCanceled(bookingID);
      } catch (error) {
        console.error("Error deleting booking:", error);
      }
    } else {
      console.log("Not deleted");
    }
  };
  return (
    <div
      className={`h-96 p-4 flex justify-between bg-left bg-contain bg-no-repeat ${
        roomType === "Suite"
          ? "bg-suite"
          : roomType === "Standard"
          ? "bg-standard"
          : "bg-deluxe"
      }`}
    >
      <div className="flex flex-col items-end w-full justify-between h-full">
        <div className="bg-[#366a83] w-fit pl-5 pr-5">
          <h1 className="text-3xl font-bold  mt-5 text-white w-fit pt-3">
            {hotelName}
          </h1>
          <p className="text-white font-semibold pb-3">{location}</p>
        </div>
        <div className="flex justify-between gap-5" onClick={cancelBooking}>
          <div className="flex flex-col justify-end items-center h-full group">
            <p className=" font-semibold cursor-default sm:opacity-100 opacity-0">
              Cancel Booking
            </p>
            <MdDelete
              size={64}
              className="bg-red-600 rounded-s-md group-hover:bg-red-700"
            />
          </div>
          <div className="bg-[#b15b39c9] w-fit p-3 ">
            <h1 className="text-3xl font-bold">₹{price}</h1>{" "}
            <p className="text-lg mt-2">/{days} days</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookedRoomComp;

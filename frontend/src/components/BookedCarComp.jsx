import React from "react";
import { MdDelete } from "react-icons/md";
import axios from "axios";
function BookedCarComp({
  bookingID,
  carID,
  bookingDate,
  days,
  price,
  agencyName,
  carModel,
  agencyLocation,
  onBookingCanceled,
}) {
  const carImage = [
    "bg-camry",
    "bg-civic",
    "bg-mustang",
    "bg-cruze",
    "bg-bmw",
    "bg-audi",
    "bg-benz",
    "bg-vw",
    "bg-tesla",
    "bg-nissan",
  ];
  console.log(bookingID);
  const classname = `bg-${carImage[carID - 1]}`;
  const cancelBooking = async () => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        const res = await axios.post("/api/cars/cancelBooking", { bookingID });
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
      className={`h-96 p-4 flex justify-between bg-left  bg-contain bg-no-repeat  ${
        carImage[carID - 1]
      }`}
    >
      <div className="flex flex-col items-end w-full justify-between h-full">
        <div className="bg-[#366a83] w-fit pl-5 pr-5">
          <h1 className="text-3xl font-bold  mt-5 text-white w-fit pt-3">
            {agencyName}
          </h1>
          <p className="text-white font-semibold pb-3">{agencyLocation}</p>
        </div>
        <div className="flex justify-between gap-5">
          <div
            className="flex flex-col justify-end items-center h-full group"
            onClick={cancelBooking}
          >
            <p className=" font-semibold text-white cursor-default">
              Cancel Booking
            </p>
            <MdDelete
              size={46}
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

export default BookedCarComp;

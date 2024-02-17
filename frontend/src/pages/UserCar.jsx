import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import BookedRoomComp from "../components/BookedRoomComp";
import BookedCarComp from "../components/BookedCarComp";

function UserCar() {
  const userData = useSelector((state) => state.userData);
  const [cars, setCars] = useState();
  const data = { userID: userData?.userID };
  console.log(userData);
  useEffect(() => {
    axios
      .get("/api/cars/bookedCars", {
        params: {
          userID: userData?.userID,
        },
      })
      .then((res) => setCars(res?.data?.data))
      .catch((err) => console.log(err));
  }, []);
  const handleBookingCanceled = (bookingID) => {
    setCars(cars.filter((car) => car.bookingID !== bookingID));
  };
  console.log(cars);
  return (
    <div className="w-[60vw] mx-auto min-h-screen m-5">
      <h1 className="text-3xl font-bold text-[#2d677b] mt-5">Booked Cars</h1>
      {cars && cars.length === 0 ? (
        <p className="text-white font-bold p-3 text-2xl">
          You have booked no cars{" "}
        </p>
      ) : (
        <ul className="flex flex-col gap-5 my-10">
          {cars &&
            cars.map((car) => (
              <li>
                <BookedCarComp
                  {...car}
                  onBookingCanceled={handleBookingCanceled}
                />
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}

export default UserCar;

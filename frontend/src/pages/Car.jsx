import axios from "axios";
import React, { useEffect, useState } from "react";
import HotelCard from "../components/HotelCard";
import RoomType from "../components/RoomType";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Car() {
  const navigate = useNavigate();
  const userdata = useSelector((state) => state.userData);
  const [location, setLocation] = useState("Bangalore");
  const [rental, setRental] = useState();
  const [agencyID, setAgencyID] = useState();
  const [cars, setCars] = useState();
  const [selectedCar, setSelectedCar] = useState();
  const [selectedRooms, setSelectedRooms] = useState();
  const [date, setDate] = useState();
  const [days, setDays] = useState();
  const [roomOfSelectedType, setRoomOfSelectedType] = useState();
  const roomType = ["Deluxe", "Standard", "Suite"];
  const [error, setError] = useState();
  const [error2, setError2] = useState();
  const fetchRentals = async () => {
    try {
      setError("");
      if (date && days && location) {
        const rentalList = await axios.get("/api/cars/fetchRental", {
          params: { location },
        });
        console.log(rentalList);
        if (rentalList) {
          setRental(rentalList.data?.data);
        }
      } else {
        setError("Required all fields");
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    setError("");

    if (agencyID) {
      axios
        .get("/api/cars/availableCars", {
          params: {
            agencyID,
            bookingDate: date,
          },
        })
        .then((res) => setCars(res?.data?.data))
        .catch((err) => console.log(err.message));
    }
  }, [agencyID]);
  console.log(cars);
  // Include selectedRoomType in the dependency array

  const bookCar = async () => {
    try {
      if (selectedCar) {
        const res = await axios.post("/api/cars/bookCars", selectedCar);
        console.log(res);
        navigate("/user/car");
      } else {
        setError2("Select the Car");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  console.log("car", selectedCar);
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="bg-elephant md:bg-contain bg-cover bg-no-repeat bg-blue-400 h-80 lg:h-96 flex j items-center text-4xl font-bold font-banner text-[#4f729a] w-[80vw] mt-10 shadow-lg shadow-black  justify-end">
        <h1 className="w-fit h-fit p-2 bg-white/70">
          Checkout Rental cars for reasonable price
        </h1>
      </div>
      <div className="bg-neutral-600/40 w-[80vw] mt-16  mb-10 p-4  shadow-md shadow-black  ">
        <div className="flex flex-col xl:flex-row gap-4 xl:gap-1">
          <label className="text-2xl font-bold my-auto  text-[#2d677b]">
            Location
          </label>
          <select
            placeholder="Location"
            className="lg:ml-5 rounded-md p-2"
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="Bangalore">Bangalore</option>
            <option value="Coorg">Coorg</option>
            <option value="Chikkamagalur">Chikkamagalur</option>
            <option value="Mangalore">Mangalore</option>
          </select>
          <label className="text-2xl lg:ml-5 font-bold my-auto  text-[#2d677b]">
            Date
          </label>
          <input
            type="date"
            className="lg:ml-5 rounded-md p-2"
            onChange={(e) => setDate(e.target.value)}
          />
          <label className="text-2xl lg:ml-5 font-bold my-auto  text-[#2d677b]">
            Days
          </label>
          <input
            type="number"
            className="lg:ml-5 rounded-md p-2"
            onChange={(e) => setDays(e.target.value)}
          />
          <button
            className="p-3 bg-violet-900 text-white hover:bg-black lg:ml-3 rounded-md"
            onClick={fetchRentals}
          >
            Search
          </button>
        </div>
        {error && <p className="text-red-600 text-lg">{error}</p>}
        {rental ? (
          <div>
            <h1 className="mt-4 text-2xl font-bold">Popular Rental Agency</h1>

            <ul className="flex flex-wrap gap-5 mt-10">
              {rental &&
                rental.map((ren) => (
                  <li
                    key={ren?.agencyID}
                    className={`${
                      agencyID === ren?.agencyID ? " border border-black" : null
                    }`}
                    onClick={() => setAgencyID(ren?.agencyID)}
                  >
                    <HotelCard Name={ren?.agencyName} />
                  </li>
                ))}
            </ul>
            <div className="mt-10">
              {agencyID ? (
                <div>
                  <p className="text-2xl font-semibold">Select the Car</p>
                  <ul className="flex gap-4 mt-3 flex-wrap">
                    {cars &&
                      cars.map((car, i) => (
                        <li
                          key={i}
                          className={`${
                            car.carID === selectedCar?.carID
                              ? " border border-black"
                              : null
                          }`}
                          onClick={() => {
                            setSelectedCar({
                              userID: userdata?.userID,
                              carID: car?.carID,
                              agencyID,
                              bookingDate: date,
                              days,
                              price: car?.rate * days,
                            });
                          }}
                        >
                          <div className="p-4 md:p-6 lg:p-10 bg-slate-500/50 hover:bg-slate-500/60 ">
                            <h1 className="text-xl font-semibold cursor-pointer">
                              {car?.carModel}
                            </h1>
                            <p className="cursor-pointer">Rate: ₹{car?.rate}</p>
                          </div>
                        </li>
                      ))}
                  </ul>
                  {selectedCar ? (
                    <div className="mt-10">
                      <p className="text-2xl font-semibold">Book the Car</p>
                      {error2 && (
                        <p className="text-red-600 text-lg">{error2}</p>
                      )}
                      <button
                        className="p-3 mt-3 bg-violet-900 text-white hover:bg-black  rounded-md"
                        onClick={bookCar}
                      >
                        Book
                      </button>
                    </div>
                  ) : (
                    <p>Select the Car</p>
                  )}
                </div>
              ) : (
                <p className="text-2xl font-semibold">Select the Rentals</p>
              )}
            </div>
          </div>
        ) : (
          <p className="text-2xl font-semibold">Select the location</p>
        )}
      </div>
    </div>
  );
}

export default Car;

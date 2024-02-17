import axios from "axios";
import React, { useEffect, useState } from "react";
import HotelCard from "../components/HotelCard";
import RoomType from "../components/RoomType";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function Room() {
  const navigate = useNavigate();
  const userdata = useSelector((state) => state.userData);
  const [location, setLocation] = useState("Bangalore");
  const [hotels, setHotels] = useState();
  const [hotelID, setHotelID] = useState();
  const [rooms, setRooms] = useState();
  const [selectedRoomType, setRoomType] = useState();
  const [selectedRooms, setSelectedRooms] = useState();
  const [date, setDate] = useState();
  const [days, setDays] = useState();
  const [roomOfSelectedType, setRoomOfSelectedType] = useState();
  const roomType = ["Deluxe", "Standard", "Suite"];
  const [error, setError] = useState();
  const [error2, setError2] = useState();
  const fetchHotels = async () => {
    try {
      setError("");
      if (date && days && location) {
        const hotelList = await axios.get("/api/hotel/fetchHotels", {
          params: { location },
        });
        console.log(hotelList);
        if (hotelList) {
          setHotels(hotelList.data?.data);
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

    if (hotelID && selectedRoomType) {
      axios
        .get("/api/hotel/availableRoom", {
          params: {
            hotelID,
            bookingDate: date,
          },
        })
        .then((res) => setRooms(res?.data?.data))
        .catch((err) => console.log(err.message));
    }
  }, [hotelID, selectedRoomType]);
  // Include selectedRoomType in the dependency array

  const bookRoom = async () => {
    try {
      if (selectedRooms) {
        const res = await axios.post("/api/hotel/bookRoom", selectedRooms);
        console.log(res);
        navigate("/user/room");
      } else {
        setError2("Select the room");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  console.log("roooms", selectedRooms);
  return (
    <div className="flex flex-col justify-center text-white items-center">
      <div className="bg-sketch bg-contain h-80 md:h-96 flex justify-center items-center text-4xl font-bold font-banner text-[#4f729a] w-[80vw] mt-10 shadow-lg shadow-black">
        <h1 className="w-fit h-fit p-2 bg-white/70">
          Checkout rooms for reasonable price
        </h1>
      </div>
      <div className="bg-neutral-600/40 w-[80vw] mt-16  mb-10 p-4   shadow-md shadow-black  ">
        <div className="flex flex-col xl:flex-row gap-4 xl:gap-1 text-black">
          <label className="text-2xl font-bold my-auto  text-[#6b9aaa]">
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
          <label className="text-2xl lg:ml-5 font-bold my-auto  text-[#6b9aaa]">
            Date
          </label>
          <input
            type="date"
            className="lg:ml-5 rounded-md p-2"
            onChange={(e) => setDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
          />
          <label className="text-2xl lg:ml-5 font-bold my-auto  text-[#6b9aaa]">
            Days
          </label>
          <input
            type="number"
            className="lg:ml-5 rounded-md p-2"
            onChange={(e) => setDays(e.target.value)}
          />
          <button
            className="p-3 bg-violet-900 text-white hover:bg-black lg:ml-3 rounded-md"
            onClick={fetchHotels}
          >
            Search
          </button>
        </div>
        {error && <p className="text-red-600 text-lg">{error}</p>}
        {hotels ? (
          <div>
            <h1 className="mt-4 text-2xl font-bold">Popular Hotels</h1>

            <ul className="flex flex-wrap gap-5 mt-10">
              {hotels &&
                hotels.map((hotel) => (
                  <li
                    key={hotel?.id}
                    className={`${
                      hotelID === hotel.hotelID ? " border border-black" : null
                    }`}
                    onClick={() => setHotelID(hotel?.hotelID)} // Adjusted onClick handler
                  >
                    <HotelCard Name={hotel?.hotelName} />
                  </li>
                ))}
            </ul>
            <div className="mt-10">
              {hotelID ? (
                <div>
                  <p className="text-2xl font-semibold">Select the Room type</p>
                  <ul className="flex gap-4 mt-3 flex-wrap">
                    {hotelID &&
                      roomType.map((type, i) => (
                        <li
                          key={i}
                          className={`${
                            type === selectedRoomType
                              ? " border border-black"
                              : null
                          }`}
                          onClick={() => {
                            setRoomType(type);
                          }}
                        >
                          <RoomType type={type} />
                        </li>
                      ))}
                  </ul>
                  {selectedRoomType ? (
                    <div className="mt-10">
                      <p className="text-2xl font-semibold mt-4">
                        Select the Room
                      </p>
                      <ul className="flex gap-4 mt-4 flex-wrap">
                        {rooms ? (
                          rooms.map(
                            (room, i) =>
                              room.roomType === selectedRoomType && (
                                <li
                                  key={i}
                                  className={`bg-slate-500/50 hover:bg-slate-500/60 p-4 ${
                                    selectedRooms?.RoomID === room.RoomID
                                      ? " border border-black"
                                      : null
                                  }`}
                                  onClick={() =>
                                    setSelectedRooms({
                                      userID: userdata?.userID,
                                      RoomID: room.RoomID,
                                      hotelID,
                                      bookingDate: date,
                                      days,
                                      price: days * room.price,
                                    })
                                  }
                                >
                                  <h1 className="cursor-pointer">
                                    Room no: {room.RoomID}{" "}
                                  </h1>{" "}
                                  <p className="cursor-pointer">
                                    Price: ₹{room.price}
                                  </p>
                                </li>
                              )
                          )
                        ) : (
                          <p>No rooms available.</p>
                        )}
                      </ul>
                      <div className="mt-10">
                        <p className="text-2xl font-semibold">Book the room</p>
                        {error2 && (
                          <p className="text-red-600 text-lg">{error2}</p>
                        )}
                        <button
                          className="p-3 bg-violet-900 text-white hover:bg-black  mt-4 rounded-md"
                          onClick={bookRoom}
                        >
                          Book
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p>select the room type</p>
                  )}
                </div>
              ) : (
                <p className="text-2xl font-semibold">Select the hotel</p>
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

export default Room;

import axios from "axios";
import React, { useEffect, useState } from "react";
import HotelCard from "../components/HotelCard";
import RoomType from "../components/RoomType";
import { useSelector } from "react-redux";
function Room() {
  const userdata = useSelector((state) => state.userData);
  const [location, setLocation] = useState("Bangalore");
  const [hotels, setHotels] = useState();
  const [hotelID, setHotelID] = useState();
  const [rooms, setRooms] = useState();
  const [selectedRoomType, setRoomType] = useState();
  const [selectedRooms, setSelectedRooms] = useState();
  const [date, setDate] = useState();
  const [days, setDays] = useState();
  const roomType = ["Deluxe", "Standard", "Suite"];
  const fetchHotels = async () => {
    try {
      const hotelList = await axios.get("/api/hotel/fetchHotels", {
        params: { location },
      });
      console.log(hotelList);
      if (hotelList) {
        setHotels(hotelList.data?.data);
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    if (hotelID && selectedRoomType) {
      axios
        .get("/api/hotel/availableRoom", {
          params: {
            hotelID,
          },
        })
        .then((res) => setRooms(res?.data?.data))
        .catch((err) => console.log(err.message));
    }
  }, [hotelID, selectedRoomType]);
  // Include selectedRoomType in the dependency array

  const bookRoom = async () => {
    try {
      const res = await axios.post("/api/hotel/bookRoom", selectedRooms);
      console.log(res);
    } catch (err) {
      console.log(err.message);
    }
  };

  console.log("roooms", selectedRooms);
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="bg-sketch bg-contain h-96 flex justify-center items-center text-4xl font-bold font-banner text-[#4f729a] w-[80vw] mt-10 shadow-lg shadow-black">
        <h1 className="w-fit h-fit p-2 bg-white/70">
          Checkout rooms for reasonable price
        </h1>
      </div>
      <div className="bg-neutral-600/40 w-[80vw] mt-16  mb-10 p-4  shadow-md shadow-black  ">
        <div className="flex">
          <label className="text-2xl font-bold my-auto  text-[#2d677b]">
            Location
          </label>
          <select
            placeholder="Location"
            className="ml-5 rounded-md p-2"
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="Bangalore">Bangalore</option>
            <option value="Coorg">Coorg</option>
            <option value="Chikkamagalur">Chikkamagalur</option>
            <option value="Mangalore">Mangalore</option>
          </select>
          <label className="text-2xl ml-5 font-bold my-auto  text-[#2d677b]">
            Date
          </label>
          <input
            type="date"
            className="ml-5 rounded-md p-2"
            onChange={(e) => setDate(e.target.value)}
          />
          <label className="text-2xl ml-5 font-bold my-auto  text-[#2d677b]">
            Days
          </label>
          <input
            type="number"
            className="ml-5 rounded-md p-2"
            onChange={(e) => setDays(e.target.value)}
          />
          <button
            className="p-3 bg-violet-900 text-white hover:bg-black ml-3 rounded-md"
            onClick={fetchHotels}
          >
            Search
          </button>
        </div>
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
                    <HotelCard {...hotel} />
                  </li>
                ))}
            </ul>
            <div className="mt-10">
              {hotelID ? (
                <div>
                  <p className="text-2xl font-semibold">Select the Room type</p>
                  <ul className="flex gap-4 mt-3">
                    {hotelID &&
                      roomType.map((type, i) => (
                        <li
                          key={i}
                          className={`${
                            type === selectedRoomType
                              ? " border border-black"
                              : null
                          }`}
                          onClick={() => setRoomType(type)}
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
                      <ul className="flex gap-4 mt-4">
                        {rooms &&
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
                                    })
                                  }
                                >
                                  <h1 className="cursor-pointer">
                                    Room no: {room.RoomID}{" "}
                                  </h1>{" "}
                                  <p className="cursor-pointer">
                                    Price: ${room.price}
                                  </p>
                                </li>
                              )
                          )}
                      </ul>
                      <div className="mt-10">
                        <p className="text-2xl font-semibold">Book the room</p>
                        <button
                          className="p-3 bg-violet-900 text-white hover:bg-black ml-3 rounded-md"
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

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import BookedRoomComp from "../components/BookedRoomComp";

function UserRoom() {
  const userData = useSelector((state) => state.userData);
  const [rooms, setRooms] = useState();
  const data = { userID: userData?.userID };
  console.log(userData);
  useEffect(() => {
    axios
      .get("/api/hotel/bookedRoom", {
        params: {
          userID: userData?.userID,
        },
      })
      .then((res) => setRooms(res?.data?.data))
      .catch((err) => console.log(err));
  }, []);
  console.log(rooms);
  return (
    <div className="w-[60vw] mx-auto m-5">
      <h1 className="text-3xl font-bold text-[#2d677b] mt-5">Booked Rooms</h1>
      <ul className="flex flex-col gap-5">
        {rooms &&
          rooms.map((room) => (
            <li>
              <BookedRoomComp {...room} />
            </li>
          ))}
      </ul>
    </div>
  );
}

export default UserRoom;
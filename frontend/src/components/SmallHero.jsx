import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
function SmallHero() {
  const userData = useSelector((state) => state.userData) || 0;
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
    <div className="flex-2  h-96 w-[17vw] m-3 bg-neutral-600/40 shadow-lg shadow-black rounded-md hover:bg-slate-600/50 p-4">
      <h1 className="text-3xl font-bold text-[#2d677b] mt-5">
        Hi! {userData?.username}
      </h1>
      <h1 className="text-xl font-semibold ">Your Bookings</h1>
    </div>
  );
}

export default SmallHero;

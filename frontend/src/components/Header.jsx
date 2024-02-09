import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";
import { FaHotel } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { AiFillCar } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
function Header() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.status);
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <div
      className={` p-4 flex flex-col md:flex-row justify-center items-center gap-5 md:justify-between mx-auto w-[80vw]  shadow-black px-10`}
    >
      <div
        onClick={() => {
          navigate("/");
        }}
      >
        <h1 className=" font-bold font-sans text-2xl text-[#FF7FAA] bg-black/80 rounded-md p-3 cursor-pointer">
          Travel Now
        </h1>
      </div>
      <div className="">
        {auth ? (
          <ul className="flex gap-7  cursor-pointer ">
            <li
              className="hover:text-[##d8cdd8] flex justify-center flex-col items-center bg-[#BD81BF] rounded-md p-2"
              onClick={() => {
                navigate("/user/bookings");
              }}
            >
              <CgProfile />
              <h1>Profile</h1>
            </li>
            <li
              className="hover:text-[#d8cdd8] flex justify-center flex-col items-center bg-[#BD81BF] rounded-md p-2"
              onClick={() => {
                navigate("/rooms");
              }}
            >
              <FaHotel />
              <h1>Hotels</h1>
            </li>
            <li
              className="hover:text-[#d8cdd8] flex justify-center flex-col items-center bg-[#BD81BF] rounded-md p-2"
              onClick={() => {
                navigate("/cars");
              }}
            >
              <AiFillCar />
              <h1>Car</h1>
            </li>
            <li
              onClick={handleLogout}
              className="hover:text-[#d8cdd8] flex justify-center flex-col items-center bg-[#BD81BF] rounded-md p-2"
            >
              <FiLogOut />
              <h1>Logout</h1>
            </li>{" "}
          </ul>
        ) : (
          <ul className="flex gap-7  cursor-pointer ">
            <li
              onClick={() => navigate("/signup")}
              className="bg-[#BD81BF] rounded-md p-2"
            >
              <h1>Sign up</h1>
            </li>
            <li
              onClick={() => navigate("/login")}
              className="bg-[#BD81BF] p-2 rounded-md"
            >
              <h1>Log in</h1>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default Header;

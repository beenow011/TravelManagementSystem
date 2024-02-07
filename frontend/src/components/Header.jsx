import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";
import { FaHotel } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { AiFillCar } from "react-icons/ai";
function Header() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.status);
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <div className="bg-gradient-to-r from-[#2d677b] to-[#737DBB] p-4 flex justify-between shadow-lg shadow-black px-10">
      <div
        onClick={() => {
          navigate("/");
        }}
      >
        <h1 className=" font-bold font-sans text-2xl text-[#F083BA] cursor-pointer">
          Travel Now
        </h1>
      </div>
      <div className="">
        {auth ? (
          <ul className="flex gap-7  cursor-pointer ">
            <li className="hover:text-[#BD81BF] flex justify-center flex-col items-center">
              <FaHotel />
              <h1>Hotels</h1>
            </li>
            <li className="hover:text-[#BD81BF] flex justify-center flex-col items-center">
              <AiFillCar />
              <h1>Car Rentals</h1>
            </li>
            <li
              onClick={handleLogout}
              className="hover:text-[#BD81BF] flex justify-center flex-col items-center"
            >
              <FiLogOut />
              <h1>Logout</h1>
            </li>{" "}
          </ul>
        ) : (
          <ul className="flex gap-7  cursor-pointer">
            <li onClick={() => navigate("/signup")}>
              <h1>Sign up</h1>
            </li>
            <li onClick={() => navigate("/login")}>
              <h1>Log in</h1>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default Header;

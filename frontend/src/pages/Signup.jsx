import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillEye } from "react-icons/ai";
import { AiTwotoneEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import axios from "axios";
function Signup() {
  const [visibility, setVisibility] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();
  const [userData, setUserData] = useState();
  const create = async (data) => {
    setError("");
    try {
      const userData = await axios.post("/api/user/createUser", data);
      console.log(userData);
      if (userData) {
        const res = await axios.get("/api/user/getUser", {
          params: {
            userID: userData?.data?.data, // Assuming userID is the correct parameter name
          },
        });

        dispatch(login(res?.data?.data[0]));
        console.log("res", res?.data);
        navigate("/");
      }
      console.log(data);
    } catch (error) {
      // console.log(error.message);
      setError("Email and username should be unique");
    }
  };
  console.log("error", error);
  return (
    <div className="w-96 my-32 text-white border rounded-md m-auto  bg-home bg-cover ">
      <h1 className="text-white font-mono text-4xl text-center pt-8  bg-[#F083BA]/80">
        Sign up
      </h1>
      <form
        action="submit"
        className=" flex flex-col justify-center p-4 text-black text-xl"
      >
        <label
          htmlFor=""
          className="mt-2 bg-neutral-400/80 hover:text-blue-800 w-fit p-1 shadow-lg  shadow-black hover:bg-black"
        >
          Username
        </label>
        <input
          placeholder="username"
          type="text"
          className="p-2 text-black bg-[#D4B8E9]"
          {...register("username", {
            required: true,
          })}
        />

        <label
          htmlFor=""
          className="mt-2 bg-neutral-400/80 hover:text-blue-800 w-fit p-1 shadow-lg  shadow-black hover:bg-black"
        >
          Email
        </label>
        <input
          placeholder="Email"
          type="email"
          className="p-2 text-black bg-[#D4B8E9]"
          {...register("email", {
            required: true,
            validate: {
              matchPattern: (value) =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                "Email address must be a valid address",
            },
          })}
        />

        <label
          htmlFor=""
          className="mt-2 bg-neutral-400/80 hover:text-blue-800 w-fit p-1 shadow-lg  shadow-black hover:bg-black"
        >
          Password
        </label>
        <input
          placeholder="Password"
          type={visibility ? "password" : "text"}
          className="p-2 text-black bg-[#D4B8E9]"
          {...register("password", {
            required: true,
          })}
        />
        <div
          className="mt-2 bg-[#F083BA] w-fit p-1 rounded-full"
          onClick={() => setVisibility((state) => !state)}
        >
          {!visibility ? <AiFillEye /> : <AiTwotoneEyeInvisible />}
        </div>

        {error && (
          <p className="text-red-500 bg-white m-1 rounded-md text-center">
            {error}
          </p>
        )}
        <button
          className="p-3 bg-blue-800 mt-3 hover:bg-black"
          onClick={handleSubmit(create)}
        >
          Sign up
        </button>
      </form>
    </div>
  );
}

export default Signup;

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillEye } from "react-icons/ai";
import { AiTwotoneEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import axios from "axios";
function Login() {
  const [visibility, setVisibility] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();
  const loginUser = async (data) => {
    setError("");
    try {
      const userData = await axios.post("/api/user/loginUser", data);
      if (userData?.data?.data) {
        console.log(userData);
        dispatch(login(userData?.data?.data));
        navigate("/");
      } else {
        setError("Invalid credential");
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };
  return (
    <div className="flex  my-24 h-screen">
      <div className="w-96  text-white h-86    m-auto mt-4 bg-doodle bg-cover ">
        <h1 className=" font-mono text-4xl shadow-lg shadow-black text-center py-8 bg-[#F083BA] ">
          Log in
        </h1>
        <form
          action="submit"
          className=" flex flex-col justify-center p-4 bg-black/30 text-white text-xl"
        >
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
            className="p-3 bg-[#18305C] text-white font-bold mt-9 hover:bg-black"
            onClick={handleSubmit(loginUser)}
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

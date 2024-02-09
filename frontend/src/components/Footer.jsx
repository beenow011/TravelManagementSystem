import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="bg-white/30  text-black">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center">
              <h1 className=" font-bold font-sans text-2xl text-[#F083BA]">
                Travel Now
              </h1>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6">
            <div>
              <ul className=" font-medium">
                <li className="mb-4">
                  <Link to="/" className="hover:underline">
                    Home
                  </Link>
                </li>
                <li className="mb-4">
                  <Link to="/cars" className="hover:underline">
                    Cars
                  </Link>
                </li>
                <li>
                  <Link to="/rooms" className="hover:underline">
                    Rooms
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <ul className=" font-medium">
                <li className="mb-4">
                  <a
                    href="https://github.com/beenow011"
                    className="hover:underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Github
                  </a>
                </li>
                <li>
                  <Link
                    to="https://www.instagram.com/abhinav_nb/"
                    className="hover:underline"
                  >
                    Instagram
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm  sm:text-center">
            © 2023
            <a href="">DBMS Project</a>.
          </span>
          <div className="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
            <Link to="/" className="flex items-center">
              <h1 className=" font-bold font-sans text-2xl text-[#F083BA]">
                Travel Now
              </h1>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;

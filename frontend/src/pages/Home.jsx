import React from "react";
import SmallHero from "../components/SmallHero";
import BigHero from "../components/BigHero";

function Home() {
  return (
    <div className="p-10 flex flex-col justify-center">
      <div className="bg-banner h-96 bg-cover w-[80vw] p-10 rounded-md shadow-lg shadow-black mx-auto flex justify-center items-center  flex-wrap">
        <h1 className="text-3xl font-bold font-banner text-[#043263]">
          Revolutionizing Travel Management: Seamlessly Navigate Room Bookings
          and Car Rentals with Our Unified Solution!
        </h1>
      </div>
      <div className="flex w-[80vw] mx-auto mt-10 ">
        <SmallHero />
        <BigHero />
      </div>
    </div>
  );
}

export default Home;

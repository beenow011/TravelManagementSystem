import React from "react";

function HotelCard({ hotelName, hotelID }) {
  return (
    <div className="p-10 bg-slate-500/50 hover:bg-slate-500/60">
      <h1 className="text-xl font-semibold cursor-pointer">{hotelName}</h1>
    </div>
  );
}

export default HotelCard;
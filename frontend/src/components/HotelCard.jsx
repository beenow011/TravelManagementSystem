import React from "react";

function HotelCard({ Name }) {
  return (
    <div className="p-4 md:p-6 lg:p-10 bg-slate-500/50 hover:bg-slate-500/60">
      <h1 className="md:text-xl font-semibold cursor-pointer">{Name}</h1>
    </div>
  );
}

export default HotelCard;

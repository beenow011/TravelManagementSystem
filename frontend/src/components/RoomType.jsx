import React from "react";

function RoomType({ type }) {
  console.log(type);
  return (
    <div className="p-4 md:p-6 lg:p-10 bg-slate-500/50 hover:bg-slate-500/60">
      <h1 className="text-xl font-semibold cursor-pointer">{type}</h1>
    </div>
  );
}

export default RoomType;

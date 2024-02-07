import React from "react";

function RoomType({ type }) {
  return (
    <div className="p-10 bg-slate-500/50 hover:bg-slate-500/60">
      <h1 className="text-xl font-semibold cursor-pointer">{type}</h1>
    </div>
  );
}

export default RoomType;

import React from "react";

function RoomType({ type }) {
  console.log(type);
  return (
    <div
      className={`p-4 md:p-6 bg-cover w-64 lg:p-10 bg-slate-500/50 hover:bg-slate-500/60 ${
        type === "Suite"
          ? "bg-suite"
          : type === "Standard"
          ? "bg-standard"
          : "bg-deluxe"
      }`}
    >
      <h1 className="text-xl font-semibold cursor-pointer text-white bg-black/70 w-fit p-2 rounded-md">
        {type}
      </h1>
    </div>
  );
}

export default RoomType;

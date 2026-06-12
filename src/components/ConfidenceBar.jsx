import React from "react";

const ConfidenceBar = ({ value, isFake }) => {
  return (
    <div className="w-full bg-gray-800 rounded-full h-3 mt-2">
      <div
        className={`h-3 rounded-full transition-all duration-700 ${isFake ? "bg-red-500" : "bg-green-500"}`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
};

export default ConfidenceBar;

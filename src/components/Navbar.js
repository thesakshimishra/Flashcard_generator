import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-full pt-1">
      <h1 className="text-4xl text-black font-semibold mb-5">
        Create FlashCard
      </h1>
      <div className="flex items-center space-x-5 mb-3">
        <button className="text-lg font-semibold text-black">
          <NavLink
            to={"/"}
            style={({ isActive }) => ({
              borderBottom: isActive ? "4px solid blue" : undefined,
              paddingBottom: "12px",
              borderRadius: "3px",
            })}
          >
            Create New
          </NavLink>
        </button>
        <button className="text-lg font-semibold text-black-600">
      
          <NavLink
            to={"/myflashcard"}
            style={({ isActive }) => ({
              borderBottom: isActive ? "4px solid blue" : undefined,
              paddingBottom: "12px",
              borderRadius: "3px",
            })}
          >
            My FlashCard
          </NavLink>
        </button>
      </div>
      <hr className=" border-gray-300 mb-8" />
    </div>
  );
};

export default Navbar;

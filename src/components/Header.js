import React from "react";
import logo from "../assets/logo.png";

const Header = () => {
  return (
    <div className=" shadow-lg bg-white">
      <img className=" pt-3  ml-3 sm:w-auto " src={logo} alt="logo" />
    </div>
  );
};

export default Header;

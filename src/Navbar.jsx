import React from "react";
import logo1 from "./assets/logo-1.svg";
import logo2 from "./assets/logo-2.svg";
import navBg from "./assets/navbar shadow.png";
const Navbar = () => {
  return (
    <nav
      className="flex md:justify-between  items-center lg:px-28 md:px-14 px-10 py-5 md:py-7 shadow-lg bg-opacity-10 bg-repeat"
      style={{ backgroundImage: `url(${navBg})` }}
    >
      <div >
        <img src={logo1} alt="logo" className="md:w-48 w-36" />
      </div>
      <div className="md:block hidden">
        <img src={logo2} alt="logo" className="w-28" />
      </div>
    </nav>
  );
};

export default Navbar;

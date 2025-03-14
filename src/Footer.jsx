import React from "react";
import footerBg from "./assets/footer.jpg";
import logo from "./assets/worldofss-logo.svg";
import ssl from "./assets/ssl_secure.png";
import {
  FaFacebookF,
  FaInstagram,
  FaSkype,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="">
      <div
        className="grid lg:grid-cols-3 md:gap-y-8 gap-y-5 items-center lg:px-28 md:px-14 px-10 relative bg-opacity-10 py-10 object-cover text-white"
        style={{ backgroundImage: `url(${footerBg})` }}
      >
        {/* Overlay with #4183d7 color */}
        <div className="absolute inset-0 bg-[#4183d7] opacity-80"></div>

        {/* Content */}
        <div className="relative z-10 text-xs">
          <h2>تطوير وتشغيل</h2>
          <img src={logo} alt="logo" className="w-48 mt-2" />
        </div>
        <div className="lg:text-center relative z-10">
          <h2 className="text-xs">للإستفسار والدعم الفني</h2>
          <h2 className="py-1">00966112641362</h2>
          <button className="bg-white px-6 py-2.5 rounded-3xl"></button>
        </div>
        <div className="flex flex-col lg:items-end relative z-10">
          <div className="flex items-end gap-3 mb-2">
            <div className="p-1.5 bg-[#0000001a] rounded-full text-lg hover:bg-[#3175af]">
              <FaFacebookF />
            </div>
            <div className="p-1.5 bg-[#0000001a] rounded-full text-lg hover:bg-[#3175af]">
              <FaTwitter />
            </div>
            <div className="p-1.5 bg-[#0000001a] rounded-full text-lg hover:bg-[#3175af]">
              <FaYoutube />
            </div>
            <div className="p-1.5 bg-[#0000001a] rounded-full text-lg hover:bg-[#3175af]">
              <FaInstagram />
            </div>
            <div className="p-1.5 bg-[#0000001a] rounded-full text-lg hover:bg-[#3175af]">
              <FaSkype />
            </div>
            <img src={ssl} alt="ssl" className="w-8" />
          </div>
          <h2 className="text-xs">يفضل استخدام متصفح جوجل كروم</h2>
        </div>
      </div>

      <div className="text-center py-4 text-xs">
        <h4>جميع الحقوق محفوظة غرفة جازان © 2025</h4>
      </div>
    </footer>
  );
};

export default Footer;

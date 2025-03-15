import React, { useState } from "react";
import { PiChatTeardropTextFill } from "react-icons/pi";
import TextField from "@mui/material/TextField";

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Toggle Chat Box
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit Form Data to Backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    alert("تم الإرسال بنجاح!");

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
    });

    // Close chat box
    setIsOpen(false);
  };

  return (
    <div>
      {/* Chat Icon */}
      {!isOpen && (
        <div
          className="fixed bottom-5 right-5 p-3 rounded-tl-full rounded-bl-full rounded-br-full text-3xl text-white bg-[#1e82ab] cursor-pointer z-50"
          onClick={toggleChat}
        >
          <PiChatTeardropTextFill />
        </div>
      )}

      {/* Support Chat Box */}
      {isOpen && (
        <div className="fixed bottom-5 right-5 bg-white shadow-lg rounded-lg w-72 border border-gray-300 z-50">
          {/* Header */}
          <div className="flex items-center bg-[#1f78bc] text-white px-3 py-2 gap-3">
            <button
              onClick={toggleChat}
              className="text-base font-bold border-2 bg-[#fff3] px-1"
            >
              ✖
            </button>
            <span className="text-sm font-semibold">الدعم الفني</span>
          </div>

          {/* Message */}
          <div className="px-5 pb-5">
            <p className="text-sm text-gray-700 mt-2 mb-8">
              من فضلك قم بإدخال البيانات المطلوبة وسـيتم التواصل معكم في الحال.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-3 space-y-8">
              {/* Name Field */}
              <div className="relative">
                <label className="absolute right-2 -top-2 bg-white px-1 text-gray-600 text-sm">
                  الاسم<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Email Field */}
              <div className="relative">
                <label className="absolute right-2 -top-2 bg-white px-1 text-gray-600 text-sm">
                  البريد الإلكتروني<span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Phone Field */}
              <div className="relative">
                <label className="absolute right-2 -top-2 bg-white px-1 text-gray-600 text-sm">
                  رقم الجوال<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-[#1f78bc] text-white py-2 rounded-sm text-sm"
              >
                ابدأ التواصل
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;

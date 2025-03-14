import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminPanel from "./Admin/AdminPanel";
import Home from "./User/Home";
import Footer from "./Footer";
import loadingImg from "./assets/ajax-loader.gif";
import Chat from "./User/Chat";
import DocumentVerify from "./User/DocumentVerify";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading for 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust the delay as needed

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  return (
    <div className="bg-[#f5f7f7]" dir="rtl">
      {isLoading ? (
        // Loading screen
        <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-75 z-50">
          <img
            src={loadingImg}
            alt="Loading..."
            className="md:w-28 md:h-28 h-20 w-20"
          />
        </div>
      ) : (
        // Main content
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<AdminPanel />} />
            <Route path="/document-verify/:id" element={<Home />} />
            <Route path="/document-verify" element={<DocumentVerify />} />
          </Routes>
          <Footer />
          <Chat />
        </BrowserRouter>
      )}
    </div>
  );
};

export default App;

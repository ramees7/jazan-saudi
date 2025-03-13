import React from "react";
import Navbar from "./Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminPanel from "./Admin/AdminPanel";
import Home from "./User/Home";
import Footer from "./Footer";

const App = () => {
  return (
    <div className="bg-[#f5f7f7]" dir='rtl'>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<AdminPanel />} />
          <Route path="/document-verify/:id" element={<Home />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;

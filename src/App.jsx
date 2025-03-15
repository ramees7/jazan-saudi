// import React, { useState, useEffect } from "react";
// import Navbar from "./Navbar";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import AdminPanel from "./Admin/AdminPanel";
// import Home from "./User/Home";
// import Footer from "./Footer";
// import loadingImg from "./assets/ajax-loader.gif";
// import Chat from "./User/Chat";
// import DocumentVerify from "./User/DocumentVerify";
// import AdminLogin from "./Admin/AdminLogin";
// import ManageDocument from "./Admin/ManageDocument";

// const App = () => {
//   const [isLoading, setIsLoading] = useState(true);

//   // Simulate loading for 2 seconds
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 2000); // Adjust the delay as needed

//     return () => clearTimeout(timer); // Cleanup timer
//   }, []);

//   return (
//     <div className="bg-[#f5f7f7]" dir="rtl">
//       {isLoading ? (
//         // Loading screen
//         <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-75 z-50">
//           <img
//             src={loadingImg}
//             alt="Loading..."
//             className="md:w-28 md:h-28 h-20 w-20"
//           />
//         </div>
//       ) : (
//         // Main content
//         <BrowserRouter>
//           <Navbar />
//           <Routes>
//             <Route path="/" element={<AdminLogin />} />
//             <Route path="/admin-panel" element={<AdminPanel />} />
//             <Route path="/manage-document" element={<ManageDocument />} />
//             <Route path="/document-verify/:id" element={<Home />} />
//             <Route path="/document-verify" element={<DocumentVerify />} />
//           </Routes>
//           <Footer />
//           <Chat />
//         </BrowserRouter>
//       )}
//     </div>
//   );
// };

// export default App;

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Chat from "./User/Chat";
import DocumentVerify from "./User/DocumentVerify";
import AdminLogin from "./Admin/AdminLogin";
import AdminPanel from "./Admin/AdminPanel";
import ManageDocument from "./Admin/ManageDocument";
import Home from "./User/Home";
import loadingImg from "./assets/ajax-loader.gif";
import { AuthProvider } from "./AuthContext";
import PrivateRoute from "./PrivateRoute";
import EditJob from "./Admin/EditJob ";

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
    <AuthProvider>
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
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<AdminLogin />} />
              <Route
                path="/admin-panel"
                element={
                  <PrivateRoute>
                    <AdminPanel />
                  </PrivateRoute>
                }
              />
              <Route
                path="/manage-document"
                element={
                  <PrivateRoute>
                    <ManageDocument />
                  </PrivateRoute>
                }
              />
              <Route
                path="/edit-document/:jobId"
                element={
                  <PrivateRoute>
                    <EditJob />
                  </PrivateRoute>
                }
              />
              <Route path="/document-verify/:id" element={<Home />} />
              <Route path="/document-verify" element={<DocumentVerify />} />
            </Routes>
            <Footer />
            <Chat />
          </Router>
        )}
      </div>
    </AuthProvider>
  );
};

export default App;

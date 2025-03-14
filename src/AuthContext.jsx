import { createContext, useContext, useEffect, useState } from "react";
import CryptoJS from "crypto-js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    if (token) {
      try {
        const decryptedToken = CryptoJS.AES.decrypt(
          token,
          import.meta.env.VITE_TOKEN_KEY
        ).toString(CryptoJS.enc.Utf8);
        setAuthToken(decryptedToken);
      } catch {
        setAuthToken(null);
      }
    }
  }, []);

  const login = (token) => {
    const encryptedToken = CryptoJS.AES.encrypt(
      token,
      import.meta.env.VITE_TOKEN_KEY
    ).toString();
    sessionStorage.setItem("authToken", encryptedToken);
    setAuthToken(token); // Update state
  };

  const logout = () => {
    sessionStorage.removeItem("authToken");
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
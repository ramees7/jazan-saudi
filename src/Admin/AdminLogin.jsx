import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // Use the login function from AuthContext
  const BASE_URL_API = import.meta.env.VITE_BASEURL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("يرجى ملء اسم المستخدم وكلمة المرور.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL_API}/api/auth/login`, {
        username,
        password,
      });

      // Save the token using the login function from AuthContext
      login(response.data.token);

      alert("تم تسجيل الدخول بنجاح");
      console.log(response);

      // Redirect to the admin dashboard
      navigate("/admin-panel");
    } catch (err) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
        alert(err.response.data.error);
      } else {
        setError("فشل تسجيل الدخول. يرجى المحاولة مرة أخرى.");
        alert("فشل تسجيل الدخول. يرجى المحاولة مرة أخرى.");
      }
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-[75vh]">
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white rounded shadow-md w-80 text-right"
      >
        <h2 className="text-lg font-bold mb-4 text-center">
          تسجيل دخول المشرف
        </h2>
        {error && <div className="mb-4 text-red-500 text-center text-xs">{error}</div>}
        <div className="mb-4">
          <label htmlFor="username" className="block mb-1 font-semibold text-xs">
            اسم المستخدم
          </label>
          <input
            type="text"
            id="username"
            className="w-full p-2 border rounded text-left"
            dir="ltr"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-1 font-semibold text-xs">
            كلمة المرور
          </label>
          <input
            type="password"
            id="password"
            className="w-full p-2 border rounded text-left"
            dir="ltr"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
        >
          {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
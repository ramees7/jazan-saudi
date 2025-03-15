import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CryptoJS from "crypto-js";

const ManageDocument = () => {
  const [jobs, setJobs] = useState([]);
  const BASE_URL_API = import.meta.env.VITE_BASEURL;
  const VITE_TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY;
  const [authToken, setAuthToken] = useState("");
  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    if (token) {
      const decryptedToken = CryptoJS.AES.decrypt(
        token,
        VITE_TOKEN_KEY
      ).toString(CryptoJS.enc.Utf8);
      setAuthToken(decryptedToken);
    }
  }, [VITE_TOKEN_KEY]);
  // Fetch all jobs on component mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${BASE_URL_API}/api/jobs/all-jobs`);
        if (response.data.success) {
          setJobs(response.data.jobs);
        } else {
          console.error("Failed to fetch jobs");
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, [BASE_URL_API]);

  // Handle job deletion
  const handleDelete = async (jobId) => {
    try {
      const response = await axios.delete(
        `${BASE_URL_API}/api/jobs/delete-job/${jobId}`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      if (response.data.message === "Job deleted successfully") {
        // Remove the deleted job from the state
        setJobs((prevJobs) => prevJobs.filter((job) => job.jobId !== jobId));
        alert("تم حذف الطلب بنجاح!");
      } else {
        alert("فشل في حذف الطلب.");
      }
    } catch (error) {
      console.error("Error deleting job:", error);
      alert("حدث خطأ أثناء حذف الطلب.");
    }
  };

  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold ">إدارة المستندات</h1>
        <button>
          {" "}
          <Link
            to={"/admin-panel"}
            className="text-xs py-1.5 px-3 bg-[#4183d7] text-white"
          >
            Admin Panel | لوحة التحكم
          </Link>
        </button>
      </div>
      <table className="w-full bg-white shadow-sm rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-right">
              رقم المنشأة <br /> (Facility Number)
            </th>
            <th className="p-3 text-right">
              رقم الطلب <br /> (Order Number)
            </th>
            <th className="p-3 text-right">
              اسم المنشأة <br /> (Facility Name)
            </th>
            <th className="p-3 text-right">
              عرض PDF <br /> (View PDF)
            </th>
            <th className="p-3 text-right">
              تعديل <br /> (Edit)
            </th>
            <th className="p-3 text-right">
              حذف <br /> (Delete)
            </th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.jobId} className="border-b">
              <td className="p-3 text-right">{job.facilityNumber}</td>
              <td className="p-3 text-right">{job.orderNumber}</td>
              <td className="p-3 text-right">{job.facilityName}</td>
              <td className="p-3 text-right">
                {job.pdfUrl ? (
                  <a
                    href={job.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    عرض PDF
                  </a>
                ) : (
                  "N/A"
                )}
              </td>
              <td className="p-3 text-right">
                <Link
                  to={`/edit-document/${job.jobId}`}
                  className="text-green-500 hover:underline"
                >
                  تعديل
                </Link>
              </td>
              <td className="p-3 text-right">
                <button
                  onClick={() => handleDelete(job.jobId)}
                  className="text-red-500 hover:underline"
                >
                  حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageDocument;

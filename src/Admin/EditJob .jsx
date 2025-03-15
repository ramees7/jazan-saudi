import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import CryptoJS from "crypto-js";

const EditJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const BASE_URL_API = import.meta.env.VITE_BASEURL;
  const VITE_TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY;
  const [authToken, setAuthToken] = useState("");
  const [formData, setFormData] = useState({
    roomName: "",
    facilityName: "",
    facilityNumber: "",
    orderNumber: "",
    requestType: "",
    applicantName: "",
    creationDate: "",
    expiryDate: "",
    orderAmount: "",
    commercialRegNumber: "",
    pdfUrl: "",
  });
  const [pdfFile, setPdfFile] = useState(null); // State for the new PDF file

  // Helper function to format dates for datetime-local input
  const formatDateForInput = (dateString) => {
    if (!dateString) return ""; // Handle empty dates
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16); // Convert to "YYYY-MM-DDTHH:MM"
  };

  // Decrypt token from sessionStorage on mount
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

  // Fetch job details on component mount
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL_API}/api/jobs/job/${jobId}`,
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );
        if (response.data.job) {
          const jobData = response.data.job;

          // Format dates for datetime-local input
          jobData.creationDate = formatDateForInput(jobData.creationDate);
          jobData.expiryDate = formatDateForInput(jobData.expiryDate);
          setFormData(jobData); // Populate form fields with existing data
        }
      } catch (error) {
        console.error("Error fetching job:", error);
      }
    };

    fetchJob();
  }, [jobId, BASE_URL_API, authToken]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    // Append all form fields to FormData
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    // Append the new PDF file if selected
    if (pdfFile) {
      formDataToSend.append("pdf", pdfFile);
    }

    try {
      const response = await axios.patch(
        `${BASE_URL_API}/api/jobs/edit-job/${jobId}`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.message === "Job updated successfully") {
        alert("تم تحديث الطلب بنجاح!");
        navigate("/manage-document");
      } else {
        alert("فشل في تحديث الطلب.");
      }
    } catch (error) {
      console.error("Error updating job:", error);
      alert("حدث خطأ أثناء تحديث الطلب.");
    }
  };

  // Handle input change for text fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Automatically set expiry date (adding 2 months) when creation date changes
    if (name === "creationDate") {
      const creationDate = new Date(value);
      const expiryDate = new Date(creationDate);
      expiryDate.setMonth(expiryDate.getMonth() + 2);

      // Format the expiry date to include time (ISO format)
      const formattedExpiryDate = expiryDate.toISOString().slice(0, 16); // YYYY-MM-DDTHH:MM
      setFormData((prev) => ({
        ...prev,
        expiryDate: formattedExpiryDate,
      }));
    }
  };

  // Handle PDF file change
  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPdfFile(file); // Set the new PDF file
    }
  };

  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold ">تعديل الطلب | Edit Request</h1>
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
      <form onSubmit={handleSubmit} className="bg-white shadow-sm p-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-semibold">Room Name | إسم الغرفة</label>
            <input
              type="text"
              name="roomName"
              value={formData.roomName || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="font-semibold">Facility Name | إسم المنشأة</label>
            <input
              type="text"
              name="facilityName"
              value={formData.facilityName || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="font-semibold">
              Facility Number | رقم المنشأة
            </label>
            <input
              type="text"
              name="facilityNumber"
              value={formData.facilityNumber || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="font-semibold">Order Number | رقم الطلب</label>
            <input
              type="text"
              name="orderNumber"
              value={formData.orderNumber || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="font-semibold">Request Type | نوع الطلب</label>
            <input
              type="text"
              name="requestType"
              value={formData.requestType || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="font-semibold">
              Applicant Name | إسم مقدم الطلب
            </label>
            <input
              type="text"
              name="applicantName"
              value={formData.applicantName || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="font-semibold">
              Creation Date | تاريخ الإنشاء
            </label>
            <input
              type="datetime-local"
              name="creationDate"
              value={formData.creationDate || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="font-semibold">
              Expiry Date | تاريخ الصلاحية
            </label>
            <input
              type="datetime-local"
              name="expiryDate"
              value={formData.expiryDate || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="font-semibold">Order Amount | مبلغ الطلب</label>
            <input
              type="text"
              name="orderAmount"
              value={formData.orderAmount || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="font-semibold">
              Commercial Reg Number | رقم السجل التجاري
            </label>
            <input
              type="text"
              name="commercialRegNumber"
              value={formData.commercialRegNumber || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="font-semibold">
              Upload New PDF | رفع ملف PDF جديد
            </label>
            <input
              type="file"
              accept=".pdf"
              onChange={handlePdfChange}
              className="w-full border p-2 rounded"
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-5 bg-blue-500 text-white px-4 py-2 rounded"
        >
          حفظ التعديلات
        </button>
      </form>
    </div>
  );
};

export default EditJob;

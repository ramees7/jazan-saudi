import React, { useEffect, useState } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";
import { Link } from "react-router-dom";
import { message } from "antd";

const AdminPanel = () => {
  const [formData, setFormData] = useState({
    roomName: "",
    facilityName: "",
    facilityNumber: "",
    orderNumber: "",
    orderType: "",
    applicantName: "",
    creationDate: "",
    expiryDate: "",
    orderAmount: "",
    commercialRegNumber: "",
  });
  const [step, setStep] = useState(1);
  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const [pdf, setPdf] = useState(null); // Selected PDF file
  const [pdfUrl, setPdfUrl] = useState(null); // Uploaded PDF URL
  const [authToken, setAuthToken] = useState("");
  const BASE_URL_API = import.meta.env.VITE_BASEURL;
  const VITE_TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY;
  const BASE_URL = window.location.origin; // Gets current domain (http://localhost:5173 or live domain)
  const [jobIdPdf, setJobIdPdf] = useState("");

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

  // Handle input change
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
      setFormData((prev) => ({
        ...prev,
        expiryDate: expiryDate.toISOString().split("T")[0],
      }));
    }
  };

  const generateUniqueId = (length = 200) => {
    const randomArray = new Uint8Array(length);
    crypto.getRandomValues(randomArray);
    return Array.from(randomArray, (byte) => byte.toString(16).padStart(2, "0"))
      .join("")
      .slice(0, length); // Trim to required length
  };

  // Handle form submission for step 1
  const handleDetailsAddSubmit = async (e) => {
    e.preventDefault();
    const jobId = generateUniqueId(200);
    setJobIdPdf(jobId);
    const jobDetailsUrl = `${BASE_URL}/document-verify/${jobId}`;
    console.log("QR Code URL:", jobDetailsUrl); // Debugging
    try {
      const response = await axios.post(
        `${BASE_URL_API}/api/jobs/create-job`,
        {
          documentNumber: formData.orderNumber,
          establishmentName: formData.facilityName,
          subscriptionNumber: formData.facilityNumber,
          commercialRegistrationNumber: formData.commercialRegNumber,
          applicantName: formData.applicantName,
          creationDate: formData.creationDate,
          jobId: jobId, // Use order number as job ID
          jobDetailsUrl, // Use the constructed URL
        },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      setQrCodeUrl(response.data.qrCodeUrl); // Set QR code URL
      setStep(2); // Move to step 2
      alert("تم حفظ التفاصيل بنجاح!");
    } catch (error) {
      console.error("Error saving details:", error);
      alert("فشل في حفظ التفاصيل.");
    }
  };

  // Handle PDF upload for step 2
  const handlePdfUpload = async () => {
    const formData = new FormData();
    formData.append("pdf", pdf); // 'pdf' is the file selected by the user
    try {
      const response = await axios.post(
        `${BASE_URL_API}/api/jobs/upload-pdf/${jobIdPdf}`, // Use order number as job ID
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      setPdfUrl(response.data.pdfUrl); // Set PDF URL
      setStep(3); // Move to step 3
      message.success("تم رفع ملف الـPDF بنجاح");
    } catch (error) {
      console.error("Error uploading PDF:", error);
      message.error("حدث خطأ أثناء رفع ملف الـPDF");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 px-10 pb-10">
      <div className="flex justify-between items-center  w-full my-4">
        <h2 className="text-xl font-bold  ">لوحة الإدارة</h2>
        <Link
          to={"/manage-document"}
          className="text-xs py-1.5 px-3 bg-[#4183d7] text-white"
        >
          Manage Document | إدارة المستندات
        </Link>{" "}
      </div>
      {step === 1 && (
        <form
          onSubmit={handleDetailsAddSubmit}
          className="bg-white shadow-sm p-5 w-full text-sm"
        >
          <div className="grid md:grid-cols-2 lg:gap-x-10 gap-5">
            <div>
              <label className="font-semibold">Room Name | إسم الغرفة</label>
              <input
                type="text"
                name="roomName"
                value={formData.roomName}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="font-semibold">
                Facility Name | إسم المنشأة{" "}
              </label>
              <input
                type="text"
                name="facilityName"
                value={formData.facilityName}
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
                value={formData.facilityNumber}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="font-semibold">Order Number | رقم الطلب </label>
              <input
                type="text"
                name="orderNumber"
                value={formData.orderNumber}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="font-semibold"> Order Type | نوع الطلب</label>
              <input
                type="text"
                name="orderType"
                value={formData.orderType}
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
                value={formData.applicantName}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="font-semibold">
                Order Creation Date & Time | تاريخ ووقت إنشاء الطلب
              </label>
              <input
                type="date"
                name="creationDate"
                value={formData.creationDate}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="font-semibold">
                Order Expiry Date | تاريخ صلاحية الطلب{" "}
              </label>
              <input
                type="date"
                name="expiryDate"
                value={formData.expiryDate}
                readOnly
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="font-semibold">
                Order Amount | مبلغ الطلب{" "}
              </label>
              <input
                type="text"
                name="orderAmount"
                value={formData.orderAmount}
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
                value={formData.commercialRegNumber}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            <div className="col-span-full mx-auto">
              <button
                type="submit"
                className="w-fit px-5 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                حفظ التفاصيل
              </button>
            </div>
          </div>
        </form>
      )}

      {step === 2 && qrCodeUrl && (
        <div className="bg-white p-5">
          <h2 className="text-sm text-red-500 mb-10 text-right">
            لا تقم بتحديث الصفحة | Do not refresh the page
          </h2>
          <div className="mb-4 text-right text-sm">
            <p>رمز الاستجابة السريعة:</p>
            <img src={qrCodeUrl} alt="QR Code" className="w-32" />
            <a href={qrCodeUrl} download className="text-blue-600">
              تحميل رمز الاستجابة السريعة | Download QR Code
            </a>
          </div>
          <div className="mb-4 space-x-3 text-right text-sm">
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setPdf(e.target.files[0])}
              className="border p-2"
            />
            <button
              onClick={handlePdfUpload}
              className="bg-green-500 text-white px-4 py-2 rounded mt-2"
            >
              رفع ملف PDF
            </button>
          </div>
        </div>
      )}

      {step === 3 && pdfUrl && (
        <div className="text-right w-full">
          <iframe src={pdfUrl} width="100%" height="600px"></iframe>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const { id } = useParams(); // Extract the `id` parameter from the URL
  const [jobDetails, setJobDetails] = useState(null);
  const BASE_URL_API = import.meta.env.VITE_BASEURL;

  useEffect(() => {
    axios
      .get(`${BASE_URL_API}/api/jobs/job/${id}`) // Ensure the correct endpoint
      .then((res) => {
        console.log("Job details:", res.data);
        setJobDetails(res.data); // Set the job details
      })
      .catch((err) => console.error("Error fetching job details:", err));
  }, [BASE_URL_API, id]);

  const handleDownload = async (url, filename) => {
    try {
      // Fetch the PDF file
      const response = await fetch(url);
      const blob = await response.blob();

      // Create a temporary link element
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename; // Set the download filename
      document.body.appendChild(link); // Append the link to the DOM
      link.click(); // Trigger the download
      document.body.removeChild(link); // Remove the link from the DOM
    } catch (error) {
      console.error("Error downloading the file:", error);
      alert("حدث خطأ أثناء تحميل الملف. الرجاء المحاولة مرة أخرى.");
    }
  };

  const convertToWesternNumerals = (str) => {
    const easternToWesternMap = {
      "٠": "0",
      "١": "1",
      "٢": "2",
      "٣": "3",
      "٤": "4",
      "٥": "5",
      "٦": "6",
      "٧": "7",
      "٨": "8",
      "٩": "9",
    };

    return str
      .split("")
      .map((char) => easternToWesternMap[char] || char)
      .join("");
  };
  
  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return "N/A"; // Handle null or undefined

    const date = new Date(dateTimeString);

    // Format the date and time using Gregorian calendar
    const formattedDate = date.toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      calendar: "gregory", // Use Gregorian calendar
    });

    const formattedTime = date.toLocaleTimeString("ar-SA", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    // Convert Eastern Arabic numerals to Western Arabic numerals
    const formattedDateTime = `${formattedDate} - ${formattedTime}`;
    return convertToWesternNumerals(formattedDateTime);
  };
  if (!jobDetails) {
    return <p>Loading job details...</p>;
  }

  const job = jobDetails?.job; // Access the job object
  console.log(job);

  return (
    <div className="w-full flex justify-center items-center p-10 pb-20">
      <div className="bg-white shadow-sm rounded-sm w-full max-w-[820px]">
        <div className="flex justify-between items-center gap-5 text-xs py-3 pe-4 border-b">
          <h1 className="font-bold border-r-[6px] ps-3 border-[#4183d7]">
            التحقق من الوثائق
          </h1>
          <a href="https://eservices.jazancci.org.sa/#/">
            <button className="bg-[#4183d7] text-white px-2 py-1.5 rounded-md">
              العودة
            </button>
          </a>
        </div>
        <div className="text-xs px-4 pt-5 pb-10 border-b">
          <p>
            خدمة تابع التحقق من الوثائق التي تم تصميمها إلكترونيا عبر بوابة
            خدمات المشتريات والتحقق من شهادة الشتراك للرباء لمدخل الرقم المرجعي
            الخاص بالإرشاد.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mb-6 text-sm px-6 py-4">
          <div className="flex items-center gap-3">
            <h2 className="font-semibold">إسم الغرفة</h2>
            <p>{job.roomName || "N/A"}</p>
          </div>
          <div className="flex items-center gap-3">
            <h2 className="font-semibold">إسم المنشأة</h2>
            <p>{job.facilityName || "N/A"}</p>
          </div>
          <div className="flex items-center gap-3">
            <h2 className="font-semibold">رقم المنشأة</h2>
            <p>(700) {job.facilityNumber || "N/A"}</p>
          </div>
          <div className="gap-3 lg:block hidden">
            <h2 className="font-semibold"></h2>
            <p></p>
          </div>
          <div className="flex items-center gap-3">
            <h2 className="font-semibold">رقم الطلب</h2>
            <p>{job.orderNumber || "N/A"}</p>
          </div>
          <div className="flex items-center gap-3">
            <h2 className="font-semibold">نوع الطلب</h2>
            <p>{job.requestType || "N/A"}</p>
          </div>
          <div className="flex items-center gap-3">
            <h2 className="font-semibold">إسم مقدم الطلب</h2>
            <p>{job.applicantName || "N/A"}</p>
          </div>
          <div className="flex items-center gap-3">
            <h2 className="font-semibold">تاريخ ووقت إنشاء الطلب</h2>
            <p>{formatDateTime(job.creationDate) || "N/A"}</p>
          </div>
          <div className="flex items-center gap-3">
            <h2 className="font-semibold">مبلغ الطلب</h2>
            <p>{job.orderAmount || "N/A"}</p>
          </div>
          <div className="flex items-center gap-3">
            <h2 className="font-semibold">تاريخ صلاحية الطلب</h2>
            <p>{formatDateTime(job.expiryDate) || "N/A"}</p>
          </div>
          <div className="flex items-center gap-3">
            <h2 className="font-semibold">رقم السجل التجاري</h2>
            <p>{job.commercialRegNumber || "N/A"}</p>
          </div>
          <div className="flex items-center gap-3">
            <h2 className="font-semibold">حالة الطلب</h2>
            <p className="text-[#20b2aa]">
              {new Date(job.expiryDate) > new Date()
                ? "تم قبول الطلب وساري"
                : "انتهت صلاحية الطلب"}
            </p>
          </div>
        </div>

        <div className="flex justify-center items-center gap-3 text-xs">
          <a
            onClick={(e) => {
              e.preventDefault(); // Prevent default link behavior
              handleDownload(job.pdfUrl, "document.pdf"); // Trigger the download
            }}
            className="relative bg-[#4183d7] px-3 py-2 text-white border-2 border-[#4183d7] overflow-hidden group hover:text-[#4183d7] inline-block cursor-pointer"
          >
            <span className="relative z-10">تحميل</span>
            <div className="absolute inset-0 bg-white transform origin-center scale-0 group-hover:scale-100 transition-transform duration-300"></div>
          </a>

          <Link to={"/document-verify"}>
            <button className="relative bg-[#4183d7] px-3 py-2 text-white border-2 border-[#4183d7] overflow-hidden group hover:text-[#4183d7]">
              <span className="relative z-10">التحقق مرة أخري</span>
              <div className="absolute inset-0 bg-white transform origin-center scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

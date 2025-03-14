import React, { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const DocumentVerify = () => {
  const [referenceNumber, setReferenceNumber] = useState("");
  const [captchaValue, setCaptchaValue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState("membership");
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const captchaRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (step === 1) {
      // Step 1: Verify CAPTCHA and reference number
      if (!referenceNumber || !captchaValue) {
        alert("الرجاء إدخال الرقم المرجعي وإكمال CAPTCHA.");
        return;
      }

      setIsLoading(true);

      try {
        const response = await axios.post(
          "https://your-backend-api.com/verify-step1",
          {
            referenceNumber,
            captchaValue,
          }
        );

        if (response.data.success) {
          message.success("تم التحقق بنجاح!");
          setStep(2); // Move to step 2
        }
      } catch (error) {
        console.log(error);
        message.error("حدث خطأ أثناء التحقق. الرجاء المحاولة مرة أخرى.");
      } finally {
        setIsLoading(false);
        captchaRef.current.reset(); // Reset CAPTCHA
      }
    } else if (step === 2) {
      // Step 2: Verify membership or establishment number
      if (selectedOption === "establishment" && !inputValue) {
        setError("الرجاء إدخال رقم المنشأة.");
        return;
      }

      setIsLoading(true);

      try {
        const response = await axios.post(
          "https://your-backend-api.com/verify-step2",
          {
            option: selectedOption,
            inputValue,
          }
        );

        if (response.data.success) {
          message.success("تم التحقق بنجاح!");
          navigate("/document-verify/12112121");
        }
      } catch (error) {
        console.log(error);
        message.error("حدث خطأ أثناء التحقق. الرجاء المحاولة مرة أخرى.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setInputValue(""); // Clear input when switching options
    setError(""); // Clear error message
  };

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

        <form onSubmit={handleSubmit} className="px-4 py-5">
          <p className="text-xs mb-4">
            خدمة تتيح التحقق من الوثائق التي تم تصديقها إلكترونيا عبر بوابة
            خدمات المشتركين. وللتحقق من شهادة الاشتراك الرجاء ادخال الرقم
            المرجعى الخاص بالوثيقة.
          </p>

          {step === 1 && (
            <>
              <div className="mb-4">
                <input
                  type="text"
                  id="referenceNumber"
                  value={referenceNumber}
                  onChange={(e) => setReferenceNumber(e.target.value)}
                  className="w-full p-2 border-2 border-gray-300 rounded-md text-xs h-[50px]"
                  placeholder="أدخل الرقم المرجعي"
                  required
                />
              </div>

              <div className="mb-4">
                <ReCAPTCHA
                  ref={captchaRef}
                  sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                  onChange={(value) => setCaptchaValue(value)}
                  hl="ar"
                />
              </div>

              <button
                type="submit"
                className="bg-[#4183d7] text-white px-4 py-2 rounded-md text-xs"
                disabled={isLoading}
              >
                {isLoading ? "جاري التحقق..." : "التالي"}
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <h1 className="text-xs font-bold border-r-[6px] ps-3 border-[#4183d7] my-5">
                {" "}
                أختــر طريقة التحقق{" "}
              </h1>

              {/* Checkbox Options */}
              <div className="flex gap-3 mb-4 text-xs border-t">
                {/* Membership Option */}
                <label className="flex items-center gap-2 cursor-pointer border p-3 rounded-md peer-checked:border-green-700">
                  <input
                    type="radio"
                    name="verification"
                    checked={selectedOption === "membership"}
                    onChange={() => handleOptionChange("membership")}
                    className="w-4 h-4 text-green-500 peer hidden"
                  />
                  <span
                    className={`w-4 h-4 border-2 rounded-full flex items-center justify-center ${
                      selectedOption === "membership"
                        ? "border-green-700"
                        : "border-gray-400"
                    }`}
                  ></span>
                  رقم العضوية
                </label>

                {/* Establishment Option */}
                <label className="flex items-center gap-2 cursor-pointer border p-3 rounded-md peer-checked:border-green-700">
                  <input
                    type="radio"
                    name="verification"
                    checked={selectedOption === "establishment"}
                    onChange={() => handleOptionChange("establishment")}
                    className="w-4 h-4 text-green-500 peer hidden"
                  />
                  <span
                    className={`w-4 h-4 border-2 rounded-full flex items-center justify-center ${
                      selectedOption === "establishment"
                        ? "border-green-700"
                        : "border-gray-400"
                    }`}
                  ></span>
                  رقم المنشأة (700)
                </label>
              </div>

              <h2 className="my-6 font-extralight text-sm">
                {referenceNumber}10101101
              </h2>

              {/* Conditional Input Field */}
              {selectedOption === "establishment" && (
                <div className="mb-4">
                  <input
                    type="text"
                    className="w-full  px-2 h-[50px]  border border-gray-300 rounded-md text-xs"
                    placeholder="رقم المنشأة (700)"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  {error && (
                    <p className="text-red-500 text-xs mt-2">{error}</p>
                  )}
                </div>
              )}
              {selectedOption === "membership" && (
                <div className="mb-4">
                  <input
                    type="text"
                    className="w-full px-2 h-[50px] border border-gray-300 rounded-md text-xs"
                    placeholder=" رقم العضوية"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  {error && (
                    <p className="text-red-500 text-xs mt-2">{error}</p>
                  )}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-[#4183d7] text-white px-3 py-2 rounded-md text-xs"
                disabled={isLoading}
              >
                {isLoading ? "جاري التحقق..." : "استعلام"}
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default DocumentVerify;

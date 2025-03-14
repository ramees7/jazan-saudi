import React, { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";

const DocumentVerify = () => {
  const [referenceNumber, setReferenceNumber] = useState("");
  const [captchaValue, setCaptchaValue] = useState(null);
  const [verificationResult, setVerificationResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(2);
  const captchaRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!referenceNumber || !captchaValue) {
      alert("الرجاء إدخال الرقم المرجعي وإكمال CAPTCHA.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post("https://your-backend-api.com/verify", {
        referenceNumber,
        captchaValue,
      });

      if (response.data.success) {
        setVerificationResult("تم التحقق بنجاح!");
        setStep(2);
      } else {
        setVerificationResult("فشل التحقق. الرجاء التحقق من الرقم المرجعي.");
      }
    } catch (error) {
      console.log(error);
      setVerificationResult("حدث خطأ أثناء التحقق. الرجاء المحاولة مرة أخرى.");
    } finally {
      setIsLoading(false);
      captchaRef.current.reset(); // Reset CAPTCHA
    }
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

          {step === 1 && (
            <>
              <div className="mb-4">
                <ReCAPTCHA
                  ref={captchaRef}
                  sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY} // Replace with your reCAPTCHA site key
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
              <h1 className="font-bold border-r-[6px] ps-3 border-[#4183d7]">
                أختــر طريقة التحقق{" "}
              </h1>
              {/* Checkbox Options */}
              <div className="flex gap-3 mb-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="verification"
                    checked={selectedOption === "membership"}
                    onChange={() => handleOptionChange("membership")}
                    className="w-4 h-4"
                  />
                  رقم العضوية
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="verification"
                    checked={selectedOption === "establishment"}
                    onChange={() => handleOptionChange("establishment")}
                    className="w-4 h-4"
                  />
                  رقم المنشأة (700)
                </label>
              </div>

              {/* Conditional Input Field */}
              {selectedOption === "establishment" && (
                <div className="mb-4">
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="رقم المنشأة (700)"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  {error && (
                    <p className="text-red-500 text-sm mt-1">{error}</p>
                  )}
                </div>
              )}

              {/* Submit Button */}
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md w-full"
                onClick={handleSubmit}
              >
                استعلام
              </button>
            </>
          )}

          {verificationResult && (
            <div className="mt-4 text-xs">
              <p>{verificationResult}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default DocumentVerify;

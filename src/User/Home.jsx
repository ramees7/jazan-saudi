import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
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
            <p>غرفة جازان</p>
          </div>
          <div className="flex items-center gap-3">
            <h2 className="font-semibold">إسم المنشأة</h2>
            <p> مطعم جرعة جبن لتقديم الوجبات</p>
          </div>
          <div className="flex items-center gap-3">
            <h2 className="font-semibold">رقم المنشأة </h2>
            <p>(700) 7004930405</p>
          </div>
          <div className=" gap-3 lg:block hidden">
            <h2 className="font-semibold"> </h2>
            <p></p>
          </div>
          <div className="flex items-center gap-3">
            <h2 className="font-semibold">رقم الطلب </h2>
            <p>10168050</p>
          </div>
          <div className="flex items-center gap-3">
            <h2 className="font-semibold"> نوع الطلب</h2>
            <p>طلب مفتوح</p>
          </div>
          <div className="flex items-center gap-3">
            <h2 className="font-semibold">إسم مقدم الطلب </h2>
            <p>العماد يحي عبده الصعدي</p>
          </div>
          <div className="flex items-center gap-3">
            <h2 className="font-semibold">تاريخ ووقت إنشاء الطلب </h2>
            <p>02/03/2025 - 12:33م</p>
          </div>
          <div className="flex items-center gap-3">
            <h2 className="font-semibold">مبلغ الطلب </h2>
            <p>35 ريال</p>
          </div>
          <div className="flex items-center gap-3">
            <h2 className="font-semibold"> تاريخ صلاحية الطلب</h2>
            <p>05/04/2025 - 12:35م</p>
          </div>
          <div className="flex items-center gap-3">
            <h2 className="font-semibold"> رقم السجل التجاري</h2>
            <p>5900114592</p>
          </div>
          <div className="flex items-center gap-3">
            <h2 className="font-semibold">حالة الطلب </h2>
            <p className="text-[#20b2aa]">تم قبول الطلب وساري</p>
          </div>
        </div>

        <div className="flex justify-center items-center gap-3 text-xs">
          <button className="relative bg-[#4183d7] px-3 py-2 text-white border-2 border-[#4183d7] overflow-hidden group hover:text-[#4183d7]">
            <span className="relative z-10">تحميل</span>
            <div className="absolute inset-0 bg-white transform origin-center scale-0 group-hover:scale-100 transition-transform duration-300"></div>
          </button>

          <Link to={'/document-verify'}>
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

import React, { useEffect, useState } from "react";

const Prayer = () => {
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const res = await fetch(
          "https://api.aladhan.com/v1/timingsByCity?city=Ramallah&country=Palestine"
        );
        const data = await res.json();
        setPrayerTimes(data.data.timings);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching prayer times:", error);
        setLoading(false);
      }
    };

    fetchPrayerTimes();
  }, []);

  return (
    <div className="w-full sm:w-[40vh] h-[50vh] shadow-2xl backdrop-blur-md bg-white/400  
    border rounded-3xl p-4 flex justify-center items-center flex-col text-white text-center overflow-y-auto">
      {loading ? (
        <p>جاري تحميل أوقات الصلاة...</p>
      ) : prayerTimes ? (
        <div className="space-y-2 flex flex-col text-white">
          <h2 className="text-xl font-bold mb-4">أوقات الصلاة</h2>
          <p className="flex h-[5vh] justify-between items-center text-center border rounded w-full sm:w-[35vh] p-[2vh]">الفجر: {prayerTimes.Fajr}</p>
          <p className="flex h-[5vh] justify-between items-center text-center border rounded w-full sm:w-[35vh] p-[2vh]">الشروق: {prayerTimes.Sunrise}</p>
          <p className="flex h-[5vh] justify-between items-center text-center border rounded w-full sm:w-[35vh] p-[2vh]">الظهر: {prayerTimes.Dhuhr}</p>
          <p className="flex h-[5vh] justify-between items-center text-center border rounded w-full sm:w-[35vh] p-[2vh]">العصر: {prayerTimes.Asr}</p>
          <p className="flex h-[5vh] justify-between items-center text-center border rounded w-full sm:w-[35vh] p-[2vh]">المغرب: {prayerTimes.Maghrib}</p>
          <p className="flex h-[5vh] justify-between items-center text-center border rounded w-full sm:w-[35vh] p-[2vh]">العشاء: {prayerTimes.Isha}</p>
        </div>
      ) : (
        <p>لا يوجد بيانات</p>
      )}
    </div>
  );
};

export default Prayer;

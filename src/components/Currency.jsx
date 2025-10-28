import React, { useEffect, useState } from "react";

const Currency = () => {
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await fetch(
          `https://data.fixer.io/api/latest?access_key=136abecc94cc326425684f6ceae88eca&symbols=USD,ILS,EUR,JOD`
        );
        const data = await res.json();
        console.log("API Response:", data);

        if (data.success) {
          const eurToIls = data.rates.ILS;
          const eurToUsd = data.rates.USD;
          const eurToJod = data.rates.JOD;

          const usdToIls = eurToIls / eurToUsd;
          const jodToIls = eurToIls / eurToJod;
          const eurToIlsRate = eurToIls;

          setRates({
            USD: usdToIls,
            EUR: eurToIlsRate,
            JOD: jodToIls,
          });
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching currency data:", error);
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  return (
    <div className="w-full sm:w-[40vh] h-[50vh] shadow-2xl backdrop-blur-md bg-white/400  
    border rounded-3xl p-4 flex justify-center items-center flex-col text-white text-center overflow-y-auto">
      <h2 className="text-xl font-bold mb-3">أسعار العملات مقابل الشيكل</h2>
      {loading ? (
        <p>جاري التحميل...</p>
      ) : rates ? (
        <ul className="space-y-2">
          {Object.entries(rates).map(([currency, value]) => (
            <li
              key={currency}
              className="flex justify-between border rounded w-full sm:w-[35vh] p-[2vh]"
            >
              <span>{currency}</span>
              <span>{value.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>ما في بيانات متاحة</p>
      )}
    </div>
  );
};

export default Currency;

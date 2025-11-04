import React, { useEffect, useState } from "react";

const CACHE_KEY = "currency_rates_cache_v1";
const CACHE_DURATION = 8 * 60 * 60 * 1000; // 8 hours in milliseconds

const Currency = () => {
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        // Ensure code runs only in the browser (important for Next.js)
        if (typeof window !== "undefined") {
          const cached = localStorage.getItem(CACHE_KEY);

          if (cached) {
            const parsed = JSON.parse(cached);
            const { timestamp, data } = parsed;
            const now = Date.now();

            // Use cached data if less than 8 hours old
            if (now - timestamp < CACHE_DURATION) {
              setRates(data);
              setLoading(false);
              return;
            }
          }
        }

        // No valid cache → make a new API request
        const res = await fetch(
          `https://data.fixer.io/api/latest?access_key=136abecc94cc326425684f6ceae88eca&symbols=USD,ILS,EUR,JOD`
        );
        const data = await res.json();
        console.log("API Response:", data);

        if (data.success) {
          const eurToIls = data.rates.ILS;
          const eurToUsd = data.rates.USD;
          const eurToJod = data.rates.JOD;

          // Convert EUR-based rates to ILS equivalents
          const usdToIls = eurToIls / eurToUsd;
          const jodToIls = eurToIls / eurToJod;
          const eurToIlsRate = eurToIls;

          const calculatedRates = {
            USD: usdToIls,
            EUR: eurToIlsRate,
            JOD: jodToIls,
          };

          setRates(calculatedRates);

          // Save new data to cache with current timestamp
          if (typeof window !== "undefined") {
            localStorage.setItem(
              CACHE_KEY,
              JSON.stringify({
                timestamp: Date.now(),
                data: calculatedRates,
              })
            );
          }
        } else {
          console.error("Fixer API error:", data);
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
    <div
      className="w-full sm:w-[40vh] h-[50vh] shadow-2xl backdrop-blur-md bg-white/400  
      border rounded-3xl p-4 flex justify-center items-center flex-col text-white text-center overflow-y-auto"
    >
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

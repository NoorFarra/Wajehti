import React, { useState, useEffect } from "react";

const cities = ["Ramallah", "Gaza", "Hebron", "Nablus", "Jericho", "Bethlehem", "Tulkarm", "Jenin", "Qalqīlyah"];

const Weather = () => {
  const [city, setCity] = useState("Ramallah");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_KEY = "269b13e8d427b4372398bc955f51cde9";

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city},Palestine&appid=${API_KEY}&units=metric&lang=ar`
        );
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setWeather(data);
      } catch (error) {
        console.error("Error fetching weather:", error);
        setWeather(null);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, [city]);

  const getWeatherIcon = (iconCode) =>
    `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  return (
    <div className="w-full sm:w-[40vh] h-[50vh] shadow-2xl backdrop-blur-md bg-white/400  
    border rounded-3xl p-4 flex justify-center items-center flex-col text-white text-center overflow-y-auto">
      <h2 className="text-md font-bold mb-[1vh]">الطقس في فلسطين</h2>

      <select
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className=" border border-white text-center rounded-md w-3/4 text-white"
      >
        {cities.map((c) => (
          <option className="text-black" key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      {loading ? (
        <p>جاري تحميل الطقس...</p>
      ) : weather && weather.main ? (
        <div className="space-y-4 flex flex-col items-center">
            <div className="w-full h-[6vh] gap-[2vh] flex flex-row-reverse
             items-center justify-center p-[2vh]">
            <p className="text-xl font-semibold">{weather.name}</p>
          <img
            src={getWeatherIcon(weather.weather[0].icon)}
            alt={weather.weather[0].description}
            className="w-[7vh] h-[7vh]"
          />
            </div>
          
          <p className="text-lg font-medium">درجة الحرارة: {weather.main.temp}°C</p>
          <p>الطقس: {weather.weather[0].description}</p>
          <p>الرطوبة: {weather.main.humidity}%</p>
          <p>سرعة الرياح: {weather.wind.speed} m/s</p>
        </div>
      ) : (
        <p>لا توجد بيانات للطقس</p>
      )}
    </div>
  );
};

export default Weather;

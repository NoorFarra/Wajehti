import React, { useState, useEffect } from "react";
import google from "../assets/gooogle.png";
import yt from "../assets/ytt.png";
import jazeraa from "../assets/jazeraaa.png";
import inv from "../assets/invv.png";
import Searchbox from "./Searchbox";

const Shortcuts = () => {
  const defaultShortcuts = [
    { img: google, url: "https://www.google.com" },
    { img: yt, url: "https://www.youtube.com" },
    { img: jazeraa, url: "https://www.aljazeera.net" },
    { img: inv, url: "https://www.investing.com" },
  ];

  const [userShortcuts, setUserShortcuts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newUrl, setNewUrl] = useState("");
  const [newImg, setNewImg] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("userShortcuts");
    if (stored) {
      setUserShortcuts(JSON.parse(stored));
    }
  }, []);

  const addShortcut = () => {
    if (newUrl && newImg) {
      const newShortcut = { img: newImg, url: newUrl };
      const updated = [...userShortcuts, newShortcut];
      setUserShortcuts(updated);
      localStorage.setItem("userShortcuts", JSON.stringify(updated));
      setNewUrl("");
      setNewImg("");
      setShowModal(false);
    }
  };

  const deleteShortcut = (indexToDelete) => {
    const confirmDelete = window.confirm("هل تريد فعلاً حذف هذا الاختصار؟");
    if (confirmDelete) {
      const updated = userShortcuts.filter((_, index) => index !== indexToDelete);
      setUserShortcuts(updated);
      localStorage.setItem("userShortcuts", JSON.stringify(updated));
    }
  };

  return (
    <div className="w-full  sm:h-[25vh] h-[30vh]  flex flex-col gap-[3vh]  items-center justify-center">
      <div className="w-full flex items-center justify-center">
        <div className="flex flex-wrap gap-4 items-center justify-center">
          {defaultShortcuts.map((item, index) => (
            <a
              key={`default-${index}`}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center cursor-pointer"
            >
              <img
                src={item.img}
                alt="shortcut"
                className="w-16 h-16 bg-white rounded-full shadow-md hover:scale-110 transition"
              />
            </a>
          ))}

          {userShortcuts.map((item, index) => (
            <div key={`user-${index}`} className="flex flex-col items-center relative">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center cursor-pointer"
              >
                <img
                  src={item.img}
                  alt="shortcut"
                  className="w-16 h-16 bg-white rounded-full shadow-md hover:scale-110 transition"
                />
              </a>

              <button
                onClick={() => deleteShortcut(index)}
                className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center hover:bg-red-700"
              >
                ×
              </button>
            </div>
          ))}

          <button
            onClick={() => setShowModal(true)}
            className="bg-gray-500 text-white rounded-[40vh] shadow-md hover:bg-gray-700 w-[9vh] h-[9vh] transition"
          >
            +
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed z-50 inset-0 flex items-center justify-center  bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-[90%] shadow-lg">
            <h2 className="text-xl font-bold mb-4">إضافة اختصار جديد</h2>

            <label className="block mb-2">رابط الموقع:</label>
            <input
              type="text"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 mb-4"
              placeholder="https://example.com"
            />

            <label className="block mb-2">رابط اللوجو:</label>
            <input
              type="text"
              value={newImg}
              onChange={(e) => setNewImg(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 mb-4"
              placeholder="https://example.com/logo.png"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
              >
                إلغاء
              </button>
              <button
                onClick={addShortcut}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                حفظ
              </button>
            </div>
          </div>
        </div>
      )}
      <Searchbox />
    </div>
  );
};

export default Shortcuts;

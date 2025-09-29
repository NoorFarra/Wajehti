import React, { useState } from "react";
import { Menu, X } from "lucide-react"; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const links = [
    { name: "اسعار العملات", href: "https://bankofpalestine.com/personal/exchange" },
    { name: "اسعار الوقود", href: "https://www.thefuelprice.com/Fps/ar" },
    { name: "مواعيد الصلاة", href: "https://prayertimes.me/Palestine" },
    { name: "احوال الطقس", href: "https://www.pmd.ps/" },
  ];

  return (
    <div className="w-full  h-[12vh] flex justify-between  px-2 sm:justify-center items-center fixed top-0 backdrop-blur-md z-50">
      <div className='w-1/2 hidden rounded-[5vh]  h-[9vh] fixed sm:flex flex-row justify-between items-center px-4'> 
      <a target="_blank" href="https://bankofpalestine.com/personal/exchange" className="text-white hover:text-red-700 rounded-2xl transition duration-300" > اسعار العملات </a> 
      <a  href="https://www.thefuelprice.com/Fps/ar" target="_blank" className="text-white hover:text-red-700 rounded-2xl transition duration-300" > اسعار الوقود </a> 
      <a  href="#" className="text-red-500 hover:text-red-700 text-xl font-bold rounded-2xl transition duration-300 " >واجهتي</a> 
      <a target="_blank" href="https://prayertimes.me/Palestine" className="text-white hover:text-red-700 rounded-2xl transition duration-300" > مواعيد الصلاة </a>
       <a target="_blank" href="https://www.pmd.ps/" className="text-white hover:text-red-700 rounded-2xl transition duration-300" > احوال الطقس </a> </div>
      <h1 className="sm:hidden text-2xl font-bold text-red-700 ">واجهتي</h1>
      <div className="w-1/2 rounded-[5vh] h-[9vh] flex justify-between items-center sm:px-4">
        {/* Desktop Navbar */}
        
        <div className="sm:hidden hidden  flex-row justify-between items-center w-full">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : "_self"}
              className="text-white hover:text-red-700 rounded-2xl transition duration-300"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex w-full justify-end">
          <button onClick={toggleMenu} className="text-white">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div className="md:hidden absolute top-[12vh] left-0 w-full bg-black bg-opacity-90 flex flex-col items-center space-y-6 py-6">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : "_self"}
              className="text-white hover:text-red-700 rounded-2xl transition duration-300 text-lg"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;

import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  return (
    <>
    <div className="flex flex-col justify-center items-center min-h-screen sm:h-[100vh] w-full 
                    bg-[url('assets/bg.jpg')] bg-cover bg-center">
      {/* Navbar ثابت فوق */}
      <Navbar />

      {/* المحتوى الأساسي */}
      <main className="flex-grow sm:flex justify-center items-center  w-full px-4 sm:px-6 lg:px-12 pt-[12vh]">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
        </BrowserRouter>
      </main>

    
    </div>
    <Footer />
    </>
  )
}

export default App;

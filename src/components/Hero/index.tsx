import React from "react";

function Hero() {
  return (
    <div className="bg-white text-white h-[93vh] flex justify-center items-center">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2  items-center">
        {/* Grid bagian kiri */}
        <div className="text-left">
          <h1 className="text-7xl font-bold text-[#6F3EFC]">Nimbrunk</h1>
          <p className="mt-4 text-lg text-gray-500">
            Temukan komunitas yang menyambutmu. Nimbrunk, tempat untuk berbagi
            cerita dan pengalaman bersama.
          </p>
          <div className="flex gap-[10px]">
            <button className="mt-4 bg-[#6F3EFC] text-white font-semibold px-6 py-3 rounded rounded-full hover:bg-[#8055fa] hover:shadow-lg hover:shadow-[#9879f2] transition-all duration-700">
              Mulai Bergabung
            </button>
            <button className="mt-4 bg-white border-[2px] border-[#6F3EFC] text-[#6F3EFC] hover:text-white font-semibold px-6 py-3 rounded rounded-full hover:bg-[#8055fa] hover:shadow-lg hover:shadow-[#9879f2] transition-all duration-700">
              Selengkapnya
            </button>
          </div>
        </div>
        {/* Grid bagian kanan */}
        <div className="flex justify-center">
          <img src="/hero_3d.png" alt="Your Image" className="h-64 md:h-auto" />
        </div>
      </div>
    </div>
  );
}

export default Hero;

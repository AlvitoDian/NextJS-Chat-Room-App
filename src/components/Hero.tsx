import React from "react";
import Link from "next/link";
import Image from "next/image";
import Avatar from "./Avatar";
import DummyChatFloating from "./DummyChatFloating";

function Hero() {
  return (
    <div className="bg-white text-white h-[93vh] flex justify-center items-center">
      <div className="md:px-10 grid grid-cols-1 xxl:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 items-center">
        {/* Grid bagian kiri */}
        <div className="text-left px-10">
          <h1 className="xl:text-7xl text-4xl font-bold text-[#6F3EFC]">
            Nimbrunk
          </h1>
          <p className="mt-4 xl:text-lg text-sm text-gray-500">
            Temukan komunitas yang menyambutmu. Nimbrunk, tempat untuk berbagi
            cerita dan pengalaman bersama.
          </p>
          <div className="flex flex-wrap gap-[10px] sm:text-[12px] md:text-[12px] xl:text-lg mt-4">
            <Link
              href="/auth/register"
              className="flex items-center bg-[#6F3EFC] text-white font-semibold lg:px-6 lg:py-3 sm:px-3 sm:py-2 rounded rounded-full hover:bg-[#8055fa] hover:shadow-lg hover:shadow-[#9879f2] transition-all duration-700"
            >
              Mulai Bergabung
            </Link>
            <button className=" bg-white border-[2px] border-[#6F3EFC] text-[#6F3EFC] hover:text-white font-semibold lg:px-6 lg:py-3 sm:px-3 sm:py-2 rounded rounded-full hover:bg-[#8055fa] hover:shadow-lg hover:shadow-[#9879f2] transition-all duration-700">
              Selengkapnya
            </button>
          </div>
        </div>
        {/* Grid bagian kanan */}
        <div className="flex justify-center relative">
          <Image
            src="/hero_3d.png"
            alt="Your Image"
            className="h-64 md:h-auto"
            width={1000}
            height={1000}
          />

          <div className="absolute left-[100px] top-20">
            <DummyChatFloating
              imgProfile={
                "https://res.cloudinary.com/dgfcvu9ns/image/upload/v1715691836/userProfile/imj6kw3iia9mom8ahtry.png"
              }
              name={"Heru Bengkel"}
              chat={"Hari ini kesini ga bro ?"}
              isLeft={false}
            />
          </div>
          <div className="absolute left-[200px] top-40">
            <DummyChatFloating
              imgProfile={
                "https://res.cloudinary.com/dgfcvu9ns/image/upload/v1714317635/userProfile/u7b3zwdzqhqjeczjsxx8.png"
              }
              name={"Anda"}
              chat={"Abisni gw kesana"}
              isLeft={true}
            />
          </div>
          <div className="absolute left-[100px] top-60">
            <DummyChatFloating
              imgProfile={
                "https://res.cloudinary.com/dgfcvu9ns/image/upload/v1715691836/userProfile/imj6kw3iia9mom8ahtry.png"
              }
              name={"Heru Bengkel"}
              chat={"Shapss"}
              isLeft={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;

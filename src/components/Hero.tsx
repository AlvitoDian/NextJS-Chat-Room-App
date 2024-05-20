import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import DummyChatFloating from "./DummyChatFloating";
import DummyChatTypingFloating from "./DummyChatTypingFloating";
import axios from "axios";

function Hero() {
  const [users, setUsers] = useState([]) as any;
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`/api/users/getAllUser`);
        const data = response.data;

        if (data.success) {
          setUsers(data.users);
        } else {
          console.error("Error fetching messages:", data.error);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const totalUsers = users.length;
  const displayedImages = users.slice(0, 5);
  const remainingCount = totalUsers - 3;

  const imagePlaceHold: any = `https://placehold.co/250x250.png?text=${encodeURIComponent(
    remainingCount + "+"
  )}`;

  return (
    <div className="bg-white text-white h-[93vh] flex justify-center items-center relative overflow-hidden">
      <div className="md:px-10 grid grid-cols-1 xxl:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 items-center">
        {/* Blur Shape */}
        <div
          className="-[700px] h-[700px] md:w-[1000px] md:h-[1000px] bg-gray-700 absolute top-[-200px] left-[-600px] opacity-[30%]"
          style={{
            background:
              "radial-gradient(circle, rgba(111,62,252,1) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,1) 100%)",
          }}
        ></div>
        <div
          className="w-[700px] h-[700px] md:w-[600px] md:h-[600px] bg-gray-700 absolute -top-[50px] right-[-350px] opacity-[20%]"
          style={{
            background:
              "radial-gradient(circle, rgba(111,62,252,1) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,1) 100%)",
          }}
        ></div>
        {/* Blur Shape End*/}
        {/* Grid bagian kiri */}
        <div className="text-left px-10 z-10">
          <h1 className="xl:text-7xl text-4xl font-bold text-[#6F3EFC]">
            Nimbrunk
          </h1>
          <p className="mt-4 xl:text-lg text-sm text-gray-500">
            Temukan komunitas yang menyambutmu. Nimbrunk, tempat untuk berbagi
            cerita dan pengalaman bersama.
          </p>
          <div className="flex flex-wrap gap-[10px] sm:text-[12px] md:text-[12px] xl:text-lg mt-10">
            <Link
              href="/auth/register"
              className="flex items-center bg-[#6F3EFC] text-white font-semibold lg:px-6 lg:py-3 sm:px-3 sm:py-2 rounded rounded-full hover:bg-[#8055fa] hover:shadow-lg hover:shadow-[#9879f2] transition-all duration-700"
            >
              Mulai Bergabung
            </Link>
            <Link
              href="#faq"
              className=" bg-transparent border-[2px] border-[#6F3EFC] text-[#6F3EFC] hover:text-white font-semibold lg:px-6 lg:py-3 sm:px-3 sm:py-2 rounded rounded-full hover:bg-[#8055fa] hover:shadow-lg hover:shadow-[#9879f2] transition-all duration-700"
            >
              Selengkapnya
            </Link>
          </div>

          {/* Total Users */}
          <div className="flex sm:flex-col md:flex-row ml-3 mt-12">
            <div className="flex">
              {displayedImages.map((user, index) => (
                <div className="-ml-3" key={index}>
                  <Image
                    className="w-8 h-8 md:w-12 md:h-12 rounded-full border-transparent md:border-white border-[4px]"
                    src={user.profileImage}
                    alt="Rounded avatar"
                    width={100}
                    height={100}
                  />
                </div>
              ))}
              {remainingCount > 0 && (
                <Image
                  className="w-8 h-8 md:w-12 md:h-12 rounded-full -ml-3 border-transparent md:border-white border-[4px]"
                  src={imagePlaceHold}
                  alt={`Avatar ${totalUsers}`}
                  width={250}
                  height={250}
                />
              )}
            </div>
            <div className="flex flex-col -ml-2 md:ml-3 mr-3">
              <div className="flex">
                <span className="text-md text-gray-700 font-semibold">
                  {totalUsers} Orang
                </span>
              </div>
              <div className="flex">
                <span className="font-medium text-sm text-gray-400">
                  Sudah Bergabung kedalam obrolan
                </span>
              </div>
            </div>

            <div className="hidden md:flex h-[40px] border-l border-[1px] border-gray-300"></div>

            <div className="flex flex-col -ml-2 md:ml-3">
              <div className="flex">
                <span className="text-md text-gray-700 font-semibold">
                  4,7/5
                </span>
              </div>
              <div className="flex">
                <div className="-ml-[6px] flex items-center mb-5">
                  <svg
                    className="w-4 h-4 ms-1 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    className="w-4 h-4 ms-1 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    className="w-4 h-4 ms-1 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    className="w-4 h-4 ms-1 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    className="w-4 h-4 ms-1 text-gray-300 dark:text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                </div>
                <span className="font-medium text-sm text-gray-400 ml-2">
                  Ulasan
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Grid bagian kanan */}
        <div className="flex justify-center relative">
          <Image
            src="/hero_3d3.png"
            alt="Your Image"
            className="h-64 md:h-auto"
            width={1000}
            height={1000}
          />
          <div>
            <div className="absolute left-0 top-0 md:left-[100px] md:top-20 transform scale-[0.7] lg:scale-[1]">
              <DummyChatFloating
                imgProfile={
                  "https://res.cloudinary.com/dgfcvu9ns/image/upload/v1715691836/userProfile/imj6kw3iia9mom8ahtry.png"
                }
                name={"Heru Bengkel"}
                chat={"Hari ini kesini ga bro ?"}
                isLeft={false}
              />
            </div>
            <div className="absolute left-[60px] top-[60px] md:left-[200px] md:top-40 transform scale-[0.7] lg:scale-[1]">
              <DummyChatFloating
                imgProfile={
                  "https://res.cloudinary.com/dgfcvu9ns/image/upload/v1714317635/userProfile/u7b3zwdzqhqjeczjsxx8.png"
                }
                name={"Anda"}
                chat={"Abisni gw kesana"}
                isLeft={true}
              />
            </div>
            <div className="absolute left-0 top-[120px] md:left-[100px] md:top-60 transform scale-[0.7] lg:scale-[1]">
              <DummyChatFloating
                imgProfile={
                  "https://res.cloudinary.com/dgfcvu9ns/image/upload/v1715691836/userProfile/imj6kw3iia9mom8ahtry.png"
                }
                name={"Heru Bengkel"}
                chat={"Shapss"}
                isLeft={false}
              />
            </div>
            <div className="absolute left-0 top-[180px] md:left-[100px] md:top-[350px] transform scale-[0.7] lg:scale-[1]">
              <DummyChatTypingFloating />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;

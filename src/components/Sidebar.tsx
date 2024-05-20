import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Sidebar({
  isOpen,
  toggleSidebar,
  session,
  handleLogout,
}) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed top-0 bottom-0 left-0 right-0 z-10"
          onClick={toggleSidebar}
        ></div>
      )}
      <div
        className={`fixed top-0 bottom-0 duration-500 ${
          isOpen ? "left-0" : "-left-[300px]"
        }  overflow-y-auto bg-[#F7F8FA] w-[273px] h-screen z-20 flex flex-col bg-cover bg-center`}
        style={{
          filter: "drop-shadow(5px 5px 43px rgba(0, 0, 0, 0.1))",
          background:
            "linear-gradient(90deg, rgba(244,240,255,1) 0%, rgba(255,255,255,1) 90%, rgba(255,255,255,1) 100%)",
        }}
      >
        {session ? (
          <div
            className="h-[86px] flex items-center bg-cover bg-center"
            style={{
              backgroundImage: `url(${session.user.bannerImage})`,
            }}
          >
            <Image
              src={session.user.profileImage}
              className="w-[50px] h-[50px] rounded-full mt-[90px] mr-4 bg-[#F7F8FA] ml-5 border-[#F7F8FA] border-[3px]"
              alt="User Profile"
              width={100}
              height={100}
            />
            <div className="mt-[140px] flex flex-col">
              <span className="text-gray-700 text-md font-medium">
                {session.user.username}
              </span>
              <span className="text-gray-400 -mt-[5px] text-sm font-normal">
                {session.user.email}
              </span>
            </div>
          </div>
        ) : (
          <Link
            href={"/auth/register"}
            onClick={toggleSidebar}
            className="h-[86px] flex items-center justify-center bg-cover bg-center"
            style={{
              backgroundImage: "url('default-banner.jpg')",
            }}
          >
            <Image
              src="https://www.w3schools.com/howto/img_avatar.png"
              className="w-[40px] rounded-full mr-4 -ml-14"
              alt=""
              width={100}
              height={100}
            />
            <span className="text-gray-200 text-sm font-medium">
              Masuk/Daftar
            </span>
          </Link>
        )}
        {session ? (
          <>
            <div className="pl-6 pt-[60px] hover:text-green-hover lg:hidden">
              <div className="border-b border-gray-300"></div>
            </div>
            <Link
              href={`/user/edit/${session.user.id}`}
              className="pl-6 pt-6 hover:text-green-hover text-gray-700 lg:hidden"
              onClick={toggleSidebar}
            >
              Edit Profil
            </Link>
            <Link
              href="/direct-message"
              className="pl-6 pt-6 hover:text-green-hover text-gray-700 lg:hidden"
              onClick={toggleSidebar}
            >
              Pesan Pribadi
            </Link>
            <div className="pl-6 pt-6 hover:text-green-hover lg:hidden">
              <div className="border-b border-gray-300"></div>
            </div>
            <div
              onClick={handleLogout}
              className="pl-6 pt-6 hover:text-green-hover text-gray-700 lg:hidden"
            >
              Keluar
            </div>
          </>
        ) : (
          <div className="flex justify-center pt-[100px]">
            <span className="text-gray-400 text-sm font-normal">
              Masuk dulu ya...
            </span>
          </div>
        )}
      </div>
    </>
  );
}

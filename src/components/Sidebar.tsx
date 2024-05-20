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
        }  overflow-y-auto bg-[#F7F8FA] shadow w-[273px] h-screen z-20 flex flex-col bg-cover bg-center`}
      >
        {session ? (
          <div
            className="h-[86px] flex items-center justify-center bg-cover bg-center"
            style={{
              backgroundImage: `url(${session.user.bannerImage})`,
            }}
          >
            <Image
              src={session.user.profileImage}
              className="w-[50px] h-[50px] rounded-full mt-[90px] mr-4 bg-white -ml-[130px] border-white border-[3px]"
              alt="User Profile"
              width={100}
              height={100}
            />
            <span className="text-gray-700 text-md font-medium mt-[120px]">
              {session.user.username}
            </span>
          </div>
        ) : (
          <div
            className="h-[86px] flex items-center justify-center bg-cover bg-center"
            style={{
              backgroundImage: "url('images/bgprofile.png')",
            }}
          >
            <Image
              src="https://www.w3schools.com/howto/img_avatar.png"
              className="w-[40px] rounded-full mr-4 -ml-14"
              alt=""
              width={100}
              height={100}
            />
            <span className="text-gray-700 text-sm font-medium">
              Login/Signup
            </span>
          </div>
        )}

        <Link
          href={`/user/edit/${session.user.id}`}
          className="pl-6 pt-14 hover:text-green-hover text-gray-700 lg:hidden"
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
          <div className="border-b border-gray-200"></div>
        </div>
        <div
          onClick={handleLogout}
          className="pl-6 pt-6 hover:text-green-hover text-gray-700 lg:hidden"
        >
          Keluar
        </div>
      </div>
    </>
  );
}

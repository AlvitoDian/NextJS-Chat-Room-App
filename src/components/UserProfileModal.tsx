import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMessage,
  faUserPlus,
  faFlag,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { useReceiver } from "@/contexts/ReceiverContext";
import Image from "next/image";

export default function UserProfileModal({
  openModalUser,
  username,
  email,
  profileImage,
  userId,
  userSince,
  bannerImage,
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { receiverUser, fetchReceiverUser } = useReceiver();

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        openModalUser(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openModalUser]);

  const handleDirectMessageClick = async () => {
    try {
      await fetchReceiverUser(userId);
      router.push("/direct-message");
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  function getYearFromStringTimestamp(timestampString) {
    const date = new Date(timestampString);
    return date.getFullYear();
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div
        ref={modalRef}
        className="bg-white rounded-lg w-96 relative shadow-xl"
      >
        {/* BG User Profile */}
        <div className="absolute top-0 left-0 w-full h-[100px] rounded-t-lg overflow-hidden">
          <Image
            src={bannerImage ? bannerImage : "/default-banner.jpg"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
            alt="Background"
            priority
          />
        </div>

        {/* Content User Profile */}
        <div className="p-4">
          <button
            className="absolute top-3 right-3"
            onClick={() => openModalUser(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white hover:text-gray-300 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="flex items-center mt-[50px]">
            <Image
              src={profileImage}
              alt={username}
              className="w-16 h-16 rounded-full z-[100] border border-white border-[5px]"
              width={100}
              height={100}
            />
            <div className="ml-4 z-[100] mt-[40px]">
              <h2 className="text-lg font-semibold ">{username}</h2>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-md font-semibold">User Details</h3>
            <p className="mt-1 text-sm text-gray-500">ID : 09c365</p>
            <p className="mt-2 text-sm text-gray-500">Email : {email}</p>
            <p className="mt-2 text-sm text-gray-500">Username : {username}</p>
            <p className="mt-2 text-sm text-gray-500">
              Since : {getYearFromStringTimestamp(userSince)}
            </p>
          </div>
          <div className="flex p-5 gap-10 justify-center items-center">
            <div
              onClick={handleDirectMessageClick}
              className="pt-2 text-[#6F3EFC] hover:text-[#8860fc] flex flex-col justify-center items-center cursor-pointer"
            >
              <FontAwesomeIcon className="text-[20px]" icon={faMessage} />
              <span className="text-[11px] pt-2 font-medium text-gray-500">
                Direct Message
              </span>
            </div>
            <Link
              href={"#"}
              className="pt-2 text-[#6F3EFC] hover:text-[#8860fc] flex flex-col justify-center items-center"
            >
              <FontAwesomeIcon className="text-[20px]" icon={faUserPlus} />
              <span className="text-[11px] pt-2 font-medium text-gray-500">
                Add Friend
              </span>
            </Link>
            <Link
              href={"#"}
              className="pt-2 text-[#ff2626] hover:text-[#ed4040] flex flex-col justify-center items-center"
            >
              <FontAwesomeIcon className="text-[20px]" icon={faFlag} />
              <span className="text-[11px] pt-2 font-medium text-gray-500">
                Report
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

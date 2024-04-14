import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { useReceiver } from "@/contexts/ReceiverContext";

export default function UserProfileModal({
  openModalUser,
  username,
  email,
  profileImage,
  userId,
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

  const user = {
    name: "John Doe",
    email: "john@example.com",
    username: "johndoe",
    phone: "123-456-7890",
    website: "example.com",
    avatar: "https://via.placeholder.com/150",
  };

  const handleDirectMessageClick = async () => {
    try {
      await fetchReceiverUser(userId);
      router.push("/direct-message");
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div ref={modalRef} className="bg-white p-4 rounded-lg w-96 relative">
        <button
          className="absolute top-3 right-3"
          onClick={() => openModalUser(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-500 hover:text-gray-700 cursor-pointer"
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
        <div className="flex items-center justify-center">
          <img
            src={profileImage}
            alt={username}
            className="w-16 h-16 rounded-full"
          />
          <div className="ml-4">
            <h2 className="text-lg font-semibold">{username}</h2>
            <p className="text-sm text-gray-500">{email}</p>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-md font-semibold">User Details</h3>
          <p className="mt-2 text-sm text-gray-500">Username: {username}</p>
          <p className="mt-1 text-sm text-gray-500">Phone: {user.phone}</p>
          {receiverUser && receiverUser.user && receiverUser.user._id && (
            <p className="mt-1 text-sm text-gray-500">
              Website: {receiverUser.user._id}
            </p>
          )}
          {/* <p className="mt-1 text-sm text-gray-500">Website: {user.website}</p> */}
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
        </div>
      </div>
    </div>
  );
}
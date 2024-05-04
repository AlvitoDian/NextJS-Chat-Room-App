import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

export default function UserOnlineList({ participants }) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="border border-[#d7cafc] border-[1px] bg-[#906BFA] rounded-lg flex flex-col sm:mt-10 md:mt-0 md:mx-10">
      <div
        className="flex justify-between items-center px-4 py-2 cursor-pointer"
        onClick={toggleAccordion}
      >
        <h2 className="text-md font-semibold text-white">Users</h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-6 h-6 transition-all duration-200 text-white ${
            isOpen ? "transform rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      <div
        className={`wrapper bg-[#f4f4fa] ${
          isOpen ? "is-open border-t border-[#d7cafc] rounded-b-md" : ""
        }`}
      >
        <div className="inner">
          {participants.map((participant, index) => (
            <div
              className="flex justify-between border-[#e6defc] border-b-[1px]"
              key={index}
            >
              <div className="flex items-center">
                <div className="pl-3">
                  <Image
                    className="w-6 h-6 rounded-full"
                    src={participant.profileImage}
                    alt="Rounded avatar"
                    width={100}
                    height={100}
                  />
                </div>
                <p key={index} className="px-2 py-2 text-sm text-gray-500">
                  {participant.username}
                </p>
              </div>
              <div className="flex gap-[13px] items-center px-3">
                <FontAwesomeIcon
                  className="text-[16px] cursor-pointer text-[#906BFA] hover:text-[#6d4acf]"
                  icon={faMessage}
                />
                <FontAwesomeIcon
                  className="text-[16px] cursor-pointer text-[#906BFA] hover:text-[#6d4acf]"
                  icon={faUserPlus}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

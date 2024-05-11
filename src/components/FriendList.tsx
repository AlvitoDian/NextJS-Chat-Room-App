import { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faGear } from "@fortawesome/free-solid-svg-icons";

export default function FriendList() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const friends = [
    { name: "Ani" },
    { name: "Budi" },
    { name: "Citra" },
    { name: "Dewi" },
    { name: "Eko" },
    { name: "Fani" },
    { name: "Gita" },
    { name: "Hadi" },
    { name: "Indra" },
    { name: "Joko" },
    { name: "Kartika" },
    { name: "Lina" },
    { name: "Mira" },
    { name: "Nana" },
    { name: "Oscar" },
    { name: "Putri" },
    { name: "Qori" },
    { name: "Rina" },
    { name: "Sari" },
    { name: "Tono" },
    { name: "Umar" },
    { name: "Vina" },
    { name: "Wati" },
    { name: "Yuni" },
    { name: "Zara" },
    { name: "Adi" },
    { name: "Bambang" },
    { name: "Cindy" },
    { name: "Dedi" },
    { name: "Eva" },
    { name: "Fajar" },
    { name: "Gina" },
    { name: "Hanif" },
    { name: "Ira" },
    { name: "Jaka" },
    { name: "Kiki" },
    { name: "Laras" },
    { name: "Maman" },
    { name: "Nadia" },
    { name: "Olive" },
    { name: "Prita" },
    { name: "Qonita" },
    { name: "Robby" },
    { name: "Santi" },
    { name: "Tita" },
    { name: "Uci" },
    { name: "Vino" },
    { name: "Wira" },
    { name: "Yani" },
    { name: "Zacky" },
  ];

  return (
    <div className="bg-[#906BFA] rounded-t-md flex flex-col fixed bottom-0 right-10 w-[270px] z-10 shadow">
      <div
        className={`wrapper bg-[#f4f4fa] ${
          isOpen
            ? "is-open border-b border-[#d7cafc] rounded-t-md border border-[#d7cafc] border-[1px]"
            : ""
        }`}
      >
        <div className="inner">
          <div
            className="max-h-[500px] overflow-auto custom-scrollbar"
            id="style-3"
          >
            {/* Loop Here */}
            {friends.map((friend, index) => (
              <div key={index} className="border-[#e6defc] border-b-[1px]">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <div className="pl-3">
                      <Image
                        className="w-6 h-6 rounded-full"
                        src="https://www.w3schools.com/howto/img_avatar.png"
                        alt="Rounded avatar"
                        width={100}
                        height={100}
                      />
                    </div>
                    <p className="px-4 py-2 text-sm text-gray-500">
                      {friend.name}
                    </p>
                  </div>
                  <div className="flex gap-[13px] items-center px-3">
                    <FontAwesomeIcon
                      className="text-[16px] cursor-pointer text-[#906BFA] hover:text-[#6d4acf]"
                      icon={faMessage}
                      /*  onClick={() => handleDirectMessageClick(participant._id)} */
                    />
                    <FontAwesomeIcon
                      className="text-[16px] cursor-pointer text-gray-500 hover:text-gray-900"
                      icon={faGear}
                      /* onClick={() => handleAddFriend(participant._id)} */
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="flex justify-between items-center px-4 py-2 cursor-pointer"
        onClick={toggleAccordion}
      >
        <h2 className="text-md font-semibold text-white ">Friends</h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-6 h-6 transition-all duration-200 text-white ml-5 ${
            isOpen ? "transform rotate-0" : "transform rotate-180"
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
    </div>
  );
}

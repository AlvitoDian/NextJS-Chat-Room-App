import React, { useState, useEffect } from "react";
/* import { useReceiver } from "@/contexts/ReceiverContext"; */
import ContactField from "@/components/ContactField";
import Avatar from "@/components/Avatar";
import BubbleChat from "@/components/BubbleChat";
import Head from "next/head";
import { useReceiver } from "@/contexts/ReceiverContext";

export default function DirectMessage() {
  const { receiverUser, fetchReceiverUser } = useReceiver();

  //? Contact Field
  const [sender, setSender] = useState("User Saat ini");
  const [receiver, setReceiver] = useState([
    { username: "Andi", message: "Hai, apa kabar?" },
    { username: "Budi", message: "Baik, terima kasih!" },
    { username: "Cici", message: "Ada yang bisa saya bantu?" },
    { username: "Dini", message: "Sedang santai, kamu bagaimana?" },
    { username: "Eka", message: "Sama-sama santai" },
    { username: "Fajar", message: "Ada rencana untuk akhir pekan?" },
    { username: "Gita", message: "Belum, mungkin nonton film" },
    { username: "Hadi", message: "Bagus juga" },
    { username: "Indah", message: "Kita harus ajak lebih banyak orang" },
    { username: "Joko", message: "Setuju!" },
  ]);

  //? Chat Field
  const [receiverProfile, setReceiverProfile] = useState(
    receiverUser.user.username
  );
  const [receiverMessage, setReceiverMessage] = useState("");
  const handleReceiverClick = (username) => {
    const selectedReceiver = receiver.find(
      (contact) => contact.username === username
    );

    if (selectedReceiver) {
      setReceiverProfile(username);

      setReceiverMessage(selectedReceiver.message);
    }
  };

  return (
    <>
      <Head>
        <title>Direct Message</title>
      </Head>
      <div className="px-10 py-10">
        <div className="flex justify-center">
          {/* Contact Field */}
          <div className="max-w-md w-full shadow-lg h-[735px] relative">
            <div className="flex items-center bg-[#906bfa] rounded-t-lg drop-shadow-lg z-[99] h-[64px]">
              {/* Search */}
              <form className="w-full px-5">
                <label
                  htmlFor="default-search"
                  className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="search"
                    id="default-search"
                    className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 "
                    placeholder="Search Contacts"
                    required
                  />
                </div>
              </form>
            </div>
            <div className="flex flex-col ">
              <div
                className="flex flex-col h-[670px] absolute bottom-0 overflow-auto w-full custom-scrollbar"
                id="style-3"
              >
                {receiver.map((contact, index) => (
                  <div
                    onClick={() => handleReceiverClick(contact.username)}
                    key={index}
                  >
                    <ContactField
                      username={contact.username}
                      message={contact.message}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Chat Field */}
          <div className="max-w-xl w-full rounded-lg shadow-lg h-[735px] relative">
            <div className="flex bg-[#906bfa] rounded-t-lg drop-shadow-lg z-[99]">
              {/* Grup Icon */}
              <div className="flex justify-center items-center px-4">
                <Avatar
                  image={"https://www.w3schools.com/howto/img_avatar.png"}
                />
              </div>
              {/* Grup Members */}
              <div className="py-2 flex flex-col text-white">
                <div className="font-bold text-lg">{receiverProfile}</div>
                <div className="font-sm text-sm">Online</div>
              </div>
            </div>
            <div className="flex flex-col px-5 ">
              <div
                className="flex flex-col -ml-5 px-5 w-70 h-[615px] absolute bottom-4 mb-10 overflow-auto w-full custom-scrollbar"
                id="style-3"
                style={{
                  backgroundImage: `url('/pattern.png')`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              >
                <BubbleChat
                  key={1}
                  id={1}
                  name={"You"}
                  message={receiverMessage}
                  time={19}
                  isSender={false}
                  profileImage={
                    "https://www.w3schools.com/howto/img_avatar.png"
                  }
                />
              </div>
              {/* Field Typing */}
              <div className="absolute bottom-0 w-full -ml-5">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    /* sendMessage(); */
                  }}
                >
                  <div className="flex items-center px-3 py-2 rounded-b-lg bg-[#906BFA]">
                    {/*  Button Image */}
                    <label
                      htmlFor="image-upload"
                      className="inline-flex justify-center px-2 text-gray-500 rounded-lg cursor-pointer mr-3"
                    >
                      <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 18"
                      >
                        <path
                          fill="white"
                          d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
                        />
                        <path
                          stroke="white"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                        />
                        <path
                          stroke="white"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
                        />
                      </svg>
                      <span className="sr-only">Upload image</span>
                    </label>
                    <input
                      type="file"
                      id="image-upload"
                      className="hidden"
                      accept="image/*"
                    />

                    {/*  Button Image End */}
                    <textarea
                      id="chat"
                      rows={1}
                      /* value={message}
                      onChange={(e) => setMessage(e.target.value)} */
                      className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg shadow"
                      placeholder="Ketik pesan..."
                    />
                    <button
                      type="submit"
                      className="inline-flex justify-center ml-2 p-2 text-blue-600 rounded-full cursor-pointer "
                    >
                      <svg
                        className="w-5 h-5 rotate-90 rtl:-rotate-90 text-[#906BFA]"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="white"
                        viewBox="0 0 18 20"
                      >
                        <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                      </svg>
                    </button>
                  </div>
                </form>
              </div>
              {/* Field Typing End */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

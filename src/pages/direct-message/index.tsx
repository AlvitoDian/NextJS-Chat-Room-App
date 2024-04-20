import React, { useState, useEffect } from "react";
import Image from "next/image";
import ContactField from "@/components/ContactField";
import Avatar from "@/components/Avatar";
import Head from "next/head";
import { useReceiver } from "@/contexts/ReceiverContext";
import axios from "axios";
import { useSession } from "next-auth/react";
import BubbleChatDirectMessage from "@/components/BubbleChatDirectMessage";
import io from "socket.io-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function DirectMessage() {
  let socket = io();

  const { receiverUser, conversation, fetchReceiverUser, fetchConversation } =
    useReceiver();

  //? Contact Field
  const [sender, setSender] = useState("");
  const [receiver, setReceiver] = useState<any>([]);

  //? Session Data
  const { data: session } = useSession() as any;

  //? Chat Field
  const [receiverProfile, setReceiverProfile] = useState(receiverUser.user);
  const [message, setMessage] = useState("");
  const [currentMessages, setCurrentMessages] = useState<any>();
  const [socketConnected, setSocketConnected] = useState(false);
  const [isNewMember, setIsNewMember] = useState(false);
  const [contactLoaded, setContactLoaded] = useState(false);

  //? Mobile View State
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChatMobile = () => {
    setIsChatOpen(!isChatOpen);
  };

  //? Update Conversation
  useEffect(() => {
    setCurrentMessages(conversation);
  }, [conversation]);

  //? Fetch Contact
  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await axios.get(
          `/api/directMessage/getAll/${session.user.id}`
        );
        const data = response.data;

        if (data.success) {
          setReceiver(data.messages);
          setContactLoaded(true);
        } else {
          console.error("Error fetching messages:", data.error);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchContact();
  }, [session.user.id, isNewMember]);

  //? Connect Socket io Effect
  useEffect(() => {
    if (!socketConnected && contactLoaded) {
      connectSocketio();
      setSocketConnected(true);
    }
  }, [socketConnected, contactLoaded]);

  //? Fetch if Message exist for link Direct Message
  useEffect(() => {
    const fetchData = async () => {
      if (receiverUser && receiver.length > 0) {
        await handleReceiverClick(receiverUser.user._id);
      } else {
        console.log("No message found.");
      }
    };

    fetchData();
  }, [receiver]);

  //? Click contact fetch messages
  const handleReceiverClick = async (id) => {
    fetchReceiverUser(id);
    fetchConversation(id, receiver, session.user.id);
  };

  //? Connect Socket io
  const connectSocketio = async () => {
    await fetch("/api/socket");

    const currentUserId = session.user.id;

    //? Single Connect socket
    socket.emit("joinDirectMessage", currentUserId);

    socket.on(`receive-message`, (data) => {
      //? Check data is available on receiver or not
      const isDataExist = receiver.some((contact) => contact._id === data._id);

      if (!isDataExist) {
        setReceiver((prevReceiver) => [...prevReceiver, data]);
      }

      updateReceiver(data);
    });
  };

  //? Update state when receive new message
  const updateReceiver = async (data) => {
    const updatedReceivers = receiver.map((contact) => {
      if (contact._id === data._id) {
        contact.messages.push(data.messages[data.messages.length - 1]);
      }
      return contact;
    });

    if (!updatedReceivers.some((contact) => contact._id === data._id)) {
      updatedReceivers.push(data);
    }

    await setReceiver(updatedReceivers);
  };

  //? Function Send Message
  const sendMessage = async () => {
    if (message.trim() === "") {
      return;
    }

    try {
      const senderId = session.user.id;
      const receiverId = receiverUser.user._id;
      const response = await axios.post(`/api/directMessage/addMessage`, {
        content: message,
        sender: senderId,
        receiver: receiverId,
      });

      const data = response.data;
      if (data.success) {
        let sendSocket = data.savedMessage;
        console.log("send socket", sendSocket);
        socket.emit("send-message", {
          sendSocket,
        });

        //? Check is New Contact
        const isContactNew = receiver.some(
          (contact) =>
            contact.sender._id === receiverUser.user._id ||
            contact.receiver._id === receiverUser.user._id
        );
        console.log(isContactNew, "isContactNew");
        if (!isContactNew) {
          setIsNewMember(true);
          setReceiver((prevReceiver) => [...prevReceiver, sendSocket]);
          console.log(receiverUser.user.username, "is new member");
        } else {
          console.log("Receiver sudah ada");
        }
      } else {
        console.error("Error sending message:", data.error);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setMessage("");
  };

  //? Function handle role message
  const getMessageRole = (currentMessages, sessionUserId) => {
    if (currentMessages.receiver._id === sessionUserId) {
      return "receiver";
    } else {
      return "sender";
    }
  };

  return (
    <>
      <Head>
        <title>Direct Message</title>
      </Head>
      <div className="px-10 py-10">
        {/* Desktop View */}
        <div className="sm:hidden lg:flex justify-center">
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
                {receiver.map((message, index) => {
                  // Menentukan apakah pengguna saat ini adalah sender atau receiver
                  const isCurrentUserSender =
                    message.sender._id.toString() === session.user.id;
                  const isCurrentUserReceiver =
                    message.receiver._id.toString() === session.user.id;

                  // Menentukan apakah data harus ditampilkan
                  const shouldDisplayData =
                    (isCurrentUserSender || isCurrentUserReceiver) &&
                    (isCurrentUserSender
                      ? message.receiver._id.toString() !== session.user.id
                      : message.sender._id.toString() !== session.user.id);

                  // Jika data harus ditampilkan, lakukan iterasi dan tampilkan
                  if (shouldDisplayData) {
                    return (
                      <div
                        onClick={() =>
                          handleReceiverClick(
                            isCurrentUserSender
                              ? message.receiver._id
                              : message.sender._id
                          )
                        }
                        key={index}
                      >
                        <ContactField
                          username={
                            isCurrentUserSender
                              ? message.receiver.username
                              : message.sender.username
                          }
                          message={
                            message.messages.length > 0
                              ? message.messages[message.messages.length - 1]
                                  .content
                              : "No message"
                          }
                          profileImage={
                            isCurrentUserSender
                              ? message.receiver.profileImage
                              : message.sender.profileImage
                          }
                        />
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </div>
          {/* Chat Field */}
          {currentMessages || receiverUser ? (
            <div className="max-w-xl w-full rounded-lg shadow-lg h-[735px] relative">
              <div className="flex bg-[#906bfa] rounded-t-lg drop-shadow-lg z-[99]">
                {/* Grup Icon */}
                {receiverUser &&
                  receiverUser.user &&
                  receiverUser.user.username && (
                    <>
                      <div className="flex justify-center items-center px-4">
                        <Avatar image={receiverUser.user.profileImage} />
                      </div>
                      <div className="py-2 flex flex-col text-white">
                        <div className="font-bold text-lg">
                          {receiverUser.user.username}
                        </div>
                        <div className="font-sm text-sm">Online</div>
                      </div>
                    </>
                  )}
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
                  {currentMessages &&
                    currentMessages.messages &&
                    currentMessages.messages.length > 0 &&
                    currentMessages.messages.map((message, index) => {
                      return (
                        <BubbleChatDirectMessage
                          key={index}
                          id={message._id}
                          message={message.content}
                          time={message.createdAt}
                          isSender={
                            getMessageRole(currentMessages, session.user.id) ===
                            message.role
                          }
                          name={
                            message.role === "sender"
                              ? currentMessages.sender.username
                              : currentMessages.receiver.username
                          }
                          profileImage={
                            message.role === "sender"
                              ? currentMessages.sender.profileImage
                              : currentMessages.receiver.profileImage
                          }
                        />
                      );
                    })}
                </div>
                {/* Field Typing */}
                <div className="absolute bottom-0 w-full -ml-5">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      sendMessage();
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
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
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
          ) : (
            <div className="max-w-xl w-full rounded-lg shadow-lg h-[735px] flex flex-col justify-center items-center">
              <span className="self-center text-2xl font-bold whitespace-nowrap text-[#6F3EFC]">
                Nimbrunk
              </span>
              <Image
                src="/logo.png"
                alt="Flowbite Logo"
                width={60}
                height={60}
              />
            </div>
          )}
        </div>

        {/* Mobile View */}
        <div className="sm:flex lg:hidden justify-center">
          {/* Contact Field */}
          <div
            className={
              isChatOpen
                ? "hidden"
                : "max-w-md w-full shadow-lg h-[735px] relative"
            }
          >
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
                {receiver.map((message, index) => {
                  // Menentukan apakah pengguna saat ini adalah sender atau receiver
                  const isCurrentUserSender =
                    message.sender._id.toString() === session.user.id;
                  const isCurrentUserReceiver =
                    message.receiver._id.toString() === session.user.id;

                  // Menentukan apakah data harus ditampilkan
                  const shouldDisplayData =
                    (isCurrentUserSender || isCurrentUserReceiver) &&
                    (isCurrentUserSender
                      ? message.receiver._id.toString() !== session.user.id
                      : message.sender._id.toString() !== session.user.id);

                  // Jika data harus ditampilkan, lakukan iterasi dan tampilkan
                  if (shouldDisplayData) {
                    return (
                      <div
                        onClick={() => {
                          handleReceiverClick(
                            isCurrentUserSender
                              ? message.receiver._id
                              : message.sender._id
                          );
                          toggleChatMobile();
                        }}
                        key={index}
                      >
                        <ContactField
                          username={
                            isCurrentUserSender
                              ? message.receiver.username
                              : message.sender.username
                          }
                          message={
                            message.messages.length > 0
                              ? message.messages[message.messages.length - 1]
                                  .content
                              : "No message"
                          }
                          profileImage={
                            isCurrentUserSender
                              ? message.receiver.profileImage
                              : message.sender.profileImage
                          }
                        />
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </div>
          {/* Chat Field */}
          {currentMessages || receiverUser ? (
            <div
              className={
                isChatOpen
                  ? "max-w-xl w-full rounded-lg shadow-lg h-[735px] relative"
                  : "hidden"
              }
            >
              <div className="flex bg-[#906bfa] rounded-t-lg drop-shadow-lg z-[99]">
                {/* Grup Icon */}
                {receiverUser &&
                  receiverUser.user &&
                  receiverUser.user.username && (
                    <>
                      <div
                        className="text-white flex items-center text-center pl-4"
                        onClick={() => toggleChatMobile()}
                      >
                        <FontAwesomeIcon icon={faArrowLeft} />
                      </div>
                      <div className="flex justify-center items-center px-4">
                        <Avatar image={receiverUser.user.profileImage} />
                      </div>
                      <div className="py-2 flex flex-col text-white">
                        <div className="font-bold text-lg">
                          {receiverUser.user.username}
                        </div>
                        <div className="font-sm text-sm">Online</div>
                      </div>
                    </>
                  )}
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
                  {currentMessages &&
                    currentMessages.messages &&
                    currentMessages.messages.length > 0 &&
                    currentMessages.messages.map((message, index) => {
                      return (
                        <BubbleChatDirectMessage
                          key={index}
                          id={message._id}
                          message={message.content}
                          time={message.createdAt}
                          isSender={
                            getMessageRole(currentMessages, session.user.id) ===
                            message.role
                          }
                          name={
                            message.role === "sender"
                              ? currentMessages.sender.username
                              : currentMessages.receiver.username
                          }
                          profileImage={
                            message.role === "sender"
                              ? currentMessages.sender.profileImage
                              : currentMessages.receiver.profileImage
                          }
                        />
                      );
                    })}
                </div>
                {/* Field Typing */}
                <div className="absolute bottom-0 w-full -ml-5">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      sendMessage();
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
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
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
          ) : (
            <div
              className={
                isChatOpen
                  ? "max-w-xl w-full rounded-lg shadow-lg h-[735px] flex flex-col justify-center items-center"
                  : "hidden"
              }
            >
              <span className="self-center text-2xl font-bold whitespace-nowrap text-[#6F3EFC]">
                Nimbrunk
              </span>
              <Image
                src="/logo.png"
                alt="Flowbite Logo"
                width={60}
                height={60}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

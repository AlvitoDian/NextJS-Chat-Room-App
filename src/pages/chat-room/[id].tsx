import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import BubbleChat from "@/components/BubbleChat";
import { useSession } from "next-auth/react";
import Head from "next/head";
import io from "socket.io-client";

export default function ChatRoom() {
  let socket = io();
  const router = useRouter();
  const { id } = router.query;
  const { data: session, status } = useSession() as any;
  const [room, setRoom] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socketConnected, setSocketConnected] = useState(false);

  //? Fetch room details on page load
  useEffect(() => {
    if (id === undefined) {
      router.push("/404");
      return;
    }

    setIsLoading(true);
    axios
      .get(`/api/chatRoom/${id}`)
      .then((response) => {
        const data = response.data;

        if (data.success) {
          setRoom(data.room);
        } else {
          console.error("Error fetching rooms:", data.error);
        }
      })
      .catch((error) => {
        console.error("Error fetching rooms:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id, router]);

  useEffect(() => {
    fetchMessages();
    if (!socketConnected) {
      connectSocketio();
      setSocketConnected(true);
    }
  }, [socketConnected]);

  //? Connect Socket io
  const connectSocketio = async () => {
    await fetch("/api/socket");

    socket.on("receive-message", (data) => {
      setMessages((pre) => [...pre, data]);
    });
  };

  //? Fetch Message Function
  const fetchMessages = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/api/message/getAllMessage/${id}`);
      const data = response.data;

      if (data.success) {
        setMessages(data.messages);
      } else {
        console.error("Error fetching messages:", data.error);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setIsLoading(false);
    }
  };

  //? Function Send Message
  const sendMessage = async () => {
    if (message.trim() === "") {
      return;
    }

    try {
      const userId = session.user.id;
      const response = await axios.post(`/api/message/addMessage`, {
        text: message,
        userId: userId,
        roomId: room?._id,
      });

      const data = response.data;
      if (data.success) {
        console.log("After Send", data.savedMessage);
        let sendSocket = data.savedMessage;
        socket.emit("send-message", {
          sendSocket,
        });
      } else {
        console.error("Error sending message:", data.error);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setMessage("");
    console.log("All Messages", messages);
  };

  //? Loading Screen
  if (isLoading) {
    return <p>Loading...</p>;
  }

  //? Room Not Found Screen
  if (!room) {
    return (
      <>
        <p>Room not found</p>
        Back to <Link href="/">Home</Link>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Chat Section</title>
      </Head>
      <div className="px-10 py-10">
        <div className="flex gap-[12px] justify-center">
          <div className="max-w-xl w-full rounded shadow-lg h-[80vh] relative">
            <div className="px-6 py-4 flex justify-center">
              <div className="font-bold text-xl mb-2">{room.name}</div>
            </div>
            <div className="flex flex-col px-5">
              <div className="flex flex-col -ml-5 px-5 w-70 h-[65vh] absolute bottom-0 mb-20 overflow-auto w-full">
                {messages.map((message, index) => (
                  <BubbleChat
                    key={index}
                    id={message._id}
                    name={message.user.username}
                    message={message.text}
                    time={message.createdAt}
                    isSender={message.user._id === session.user.id}
                    profileImage={message.user.profileImage}
                  />
                ))}
              </div>
              {/* Field Typing */}
              <div className="absolute bottom-0 w-full -ml-5 ">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage();
                  }}
                >
                  <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 ">
                    {/*  Button Image */}
                    <label
                      htmlFor="image-upload"
                      className="inline-flex justify-center px-2 text-gray-500 rounded-lg cursor-pointer"
                    >
                      <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 18"
                      >
                        <path
                          fill="currentColor"
                          d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
                        />
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                        />
                        <path
                          stroke="currentColor"
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
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-200 rounded-lg shadow"
                      placeholder="Ketik pesan..."
                    />
                    <button
                      type="submit"
                      className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer "
                    >
                      <svg
                        className="w-5 h-5 rotate-90 rtl:-rotate-90"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
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
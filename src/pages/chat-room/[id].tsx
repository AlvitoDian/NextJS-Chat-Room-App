import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import BubbleChat from "@/components/BubbleChat";
import { useSession } from "next-auth/react";
import Head from "next/head";

export default function ChatRoom() {
  const router = useRouter();
  const { id } = router.query;
  const { data: session, status } = useSession() as any;
  const [room, setRoom] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

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
        console.log("Data", data);
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
  }, []);
  console.log(room);

  const fetchMessages = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/api/message/getAllMessage/${id}`);
      const data = response.data;
      console.log("Message", data);
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
      console.log("Send Message Response", data);
      if (data.success) {
        console.log(data);
      } else {
        console.error("Error sending message:", data.error);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setMessage("");
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

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
                {messages.map((message) => (
                  <BubbleChat
                    key={message.key}
                    id={message.id}
                    name={message.user.username}
                    message={message.text}
                    time={message.createdAt}
                    isSender={message.user._id === session.user.id}
                  />
                ))}
              </div>
              <div className="py-5 absolute bottom-0 w-full -ml-5 px-5">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage();
                  }}
                >
                  <label htmlFor="chat" className="sr-only">
                    Your message
                  </label>
                  <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                    <textarea
                      id="chat"
                      rows={1}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Your message..."
                    />
                    <button
                      type="submit"
                      className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
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
                      <span className="sr-only">Send message</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

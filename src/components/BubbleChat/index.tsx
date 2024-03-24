import React, { useEffect, useRef } from "react";

export default function BubbleChat({ name, id, message, isSender, time }) {
  const bubbleRef = useRef(null);

  useEffect(() => {
    if (bubbleRef.current) {
      bubbleRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, []);

  function isoToTime(isoString) {
    const date = new Date(isoString);
    const currentDate = new Date();
    const timeDifference = Math.abs(currentDate.getTime() - date.getTime());
    const oneDay = 24 * 60 * 60 * 1000;

    if (timeDifference < oneDay) {
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    } else {
      const daysAgo = Math.floor(timeDifference / oneDay);
      return `${daysAgo} hari lalu`;
    }
  }

  return (
    <div
      ref={bubbleRef}
      className={`py-2 flex items-start gap-2.5 ${
        isSender ? "flex-row-reverse" : ""
      }`}
    >
      <img
        className="w-8 h-8 rounded-full"
        src="https://www.w3schools.com/howto/img_avatar.png"
        alt="Jese image"
      />
      <div className="flex flex-col gap-1 w-full max-w-[320px]">
        <div
          className={`flex items-center space-x-2 rtl:space-x-reverse ${
            isSender ? "flex-row-reverse" : ""
          }`}
        >
          <span className="text-sm font-semibold text-gray-900 ">
            {isSender ? "You" : name}
          </span>
          <span
            className={`text-sm font-normal text-gray-500 dark:text-gray-400 ${
              isSender ? "pr-2" : ""
            }`}
          >
            {isoToTime(time)}
          </span>
        </div>
        <div
          className={`flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 ${
            isSender
              ? "rounded-s-xl rounded-br-xl"
              : "rounded-e-xl rounded-es-xl"
          }  dark:bg-gray-700`}
        >
          <p className="text-sm font-normal text-gray-900 dark:text-white">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}

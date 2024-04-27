import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Modal from "react-modal";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Warna latar belakang overlay
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "8px",
    border: "none",
    padding: "15px",
  },
};

export default function BubbleChatDirectMessage({
  id,
  name,
  message,
  isSender,
  time,
  profileImage,
  fileChat,
}) {
  const bubbleRef = useRef(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  Modal.setAppElement("#__next");

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

  const handleImageClick = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  return (
    <div
      ref={bubbleRef}
      className={`py-2 flex items-start gap-2.5 ${
        isSender ? "flex-row-reverse" : ""
      }`}
    >
      <Image
        className="w-8 h-8 rounded-full"
        src={profileImage}
        alt="Jese image"
        width={100}
        height={100}
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
            className={`text-sm font-medium text-gray-500 dark:text-gray-500 ${
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
          }  bg-gradient-to-b from-[#906BFA] to-[#a182f5]`}
        >
          {fileChat && (
            <Image
              className="w-full mb-1 rounded-md shadow-lg cursor-pointer"
              src={fileChat}
              alt="file"
              width={250}
              height={250}
              onClick={handleImageClick}
            />
          )}

          <p className="text-sm font-normal text-gray-900 dark:text-white">
            {message}
          </p>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        onRequestClose={closeModal}
        contentLabel="Gambar Pop-up"
      >
        <div className="flex justify-center">
          {fileChat && (
            <Image
              src={fileChat}
              alt="file"
              width={400}
              height={400}
              className="rounded-md"
            />
          )}
        </div>
        <button
          onClick={closeModal}
          className="bg-[#6F3EFC] hover:bg-[#521ee8] px-[12px] py-[2px] text-white rounded-full text-md transition-all duration-500 my-2"
        >
          Tutup
        </button>
      </Modal>
    </div>
  );
}

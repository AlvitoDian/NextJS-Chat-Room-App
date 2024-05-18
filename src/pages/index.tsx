import Head from "next/head";
import CardRoom from "@/components/CardRoom";
import Hero from "@/components/Hero";
import Feature from "@/components/Feature";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Accordion from "@/components/Accordion";
import FaQ from "@/components/FaQ";

export default function Home() {
  const [rooms, setRooms] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const images = [
    "https://www.w3schools.com/howto/img_avatar.png",
    "https://www.w3schools.com/howto/img_avatar.png",
    "https://www.w3schools.com/howto/img_avatar.png",
    "https://www.w3schools.com/howto/img_avatar.png",
    "https://www.w3schools.com/howto/img_avatar.png",
    "https://www.w3schools.com/howto/img_avatar.png",
    "https://www.w3schools.com/howto/img_avatar.png",
    "https://www.w3schools.com/howto/img_avatar.png",
    "https://www.w3schools.com/howto/img_avatar.png",
  ];

  useEffect(() => {
    axios
      .get("/api/chatRoom/getAllRoom")
      .then((response) => {
        const data = response.data;

        if (data.success) {
          setRooms(data.rooms);
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
  }, []);

  return (
    <>
      <Head>
        <title>Home - Nimbrunk</title>
      </Head>
      <Hero />
      <div className="lg:px-[160px] sm:px-[40px] py-10">
        {/* Feature Section */}
        <h2 className="text-center py-10 mt-10 font-bold text-2xl text-gray-700">
          Apa aja sih Fitur Nimbrunk ?
        </h2>
        <Feature />
        {/* Grup Chat Section */}
        <h2 className="text-center py-10 mt-10 font-bold text-2xl text-gray-700">
          Silihkan pilih untuk bergabung ke grup
        </h2>
        {/*  <div className="flex gap-[12px] justify-center flex-wrap"> */}
        <div className="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-2 justify-center">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            rooms.map((room, index) => (
              <CardRoom
                key={index}
                name={room.name}
                id={room._id}
                imgProfile={images}
                imgBanner={
                  room.bannerImage ? room.bannerImage : "/bannerchat.png"
                }
                participants={room.participants}
              />
            ))
          )}
        </div>
        {/* Faq Section */}
        <FaQ />
      </div>
    </>
  );
}

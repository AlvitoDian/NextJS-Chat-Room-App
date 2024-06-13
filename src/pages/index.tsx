import Head from "next/head";
import CardRoom from "@/components/CardRoom";
import Hero from "@/components/Hero";
import Feature from "@/components/Feature";
import React, { useState, useEffect } from "react";
import axios from "axios";
import FaQ from "@/components/FaQ";
import Highlight from "@/components/Highlight";

export const getServerSideProps = async () => {
  try {
    const [usersResponse, roomsResponse] = await Promise.all([
      axios.get("http://localhost:3000/api/users/getAllUser"),
      axios.get("http://localhost:3000/api/chatRoom/getAllRoom"),
    ]);

    const users = usersResponse.data;
    const rooms = roomsResponse.data.rooms;

    return { props: { users, rooms } };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { props: { users: [], rooms: [] } };
  }
};

export default function Home({ users, rooms }) {
  console.log(users);

  return (
    <>
      <Head>
        <title>Home - Nimbrunk</title>
      </Head>
      <Hero users={users.users} />
      <Highlight />
      <div className="lg:px-[160px] sm:px-[40px] py-10">
        {/* Feature Section */}
        <div className="flex-col pb-10 mt-">
          <h2 className="text-center font-medium text-2xl text-gray-700">
            Apa aja sih Fitur Nimbrunk ?
          </h2>
          <h2 className="text-center font-regular text-md mt-[5px] text-gray-400">
            Beberapa Fitur Unggulan
          </h2>
        </div>

        <Feature />
        {/* Grup Chat Section */}
        <div className="flex-col py-10 mt-10">
          <h2 className="text-center font-medium text-2xl text-gray-700">
            Silihkan pilih untuk bergabung ke grup
          </h2>
          <h2 className="text-center font-regular text-md mt-[5px] text-gray-400">
            Pilih Grup yang Cocok dengan kamu
          </h2>
        </div>
        <div className="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-2 justify-center">
          {rooms.length === 0 ? (
            <div>No rooms available</div>
          ) : (
            rooms.map((room, index) => (
              <CardRoom
                key={index}
                name={room.name}
                id={room._id}
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

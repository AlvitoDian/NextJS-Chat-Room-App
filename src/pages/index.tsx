import Head from "next/head";
import CardRoom from "@/components/CardRoom";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
        <title>Home</title>
      </Head>
      <div className="px-10 py-10">
        <div className="flex gap-[12px] justify-center">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            rooms.map((room) => (
              <CardRoom key={room._id} name={room.name} id={room._id} />
            ))
          )}
        </div>
      </div>
    </>
  );
}

import Head from "next/head";
import ChatSection from "@/components/ChatSection";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

export default function ChatRoom() {
  const [room, setRoom] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id === undefined) {
      // Jika id tidak ditentukan, navigasikan ke halaman 404
      router.push("/404");
      return; // Hentikan eksekusi useEffect
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

  console.log(id);
  console.log("Room", room);

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
          <ChatSection name={(room as any).name} roomId={(room as any)._id} />
        </div>
      </div>
    </>
  );
}

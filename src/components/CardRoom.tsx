import React, { useState, useEffect } from "react";
import Link from "next/link";
import Avatar from "@/components/Avatar";
import Image from "next/image";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function CardRoom({ name, id, imgBanner, participants }) {
  const { data: session } = useSession() as any;

  const profileImage = participants.map(
    (participant) => participant.profileImage
  );

  const [isLoading, setIsLoading] = useState(false);
  const totalImages: number = profileImage.length;
  const displayedImages: string[] = profileImage.slice(0, 3);
  const remainingCount: number = totalImages - 3;

  const imagePlaceHold: any = `https://placehold.co/250x250.png?text=${encodeURIComponent(
    remainingCount + "+"
  )}`;

  const handleJoinRoom = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `/api/chatRoom/addParticipants/${session.user.id}`,
        { roomId: id }
      );
      if (response.status === 200) {
        console.log("User added as participant");
      } else {
        console.error("Failed to add user as participant");
      }
    } catch (error) {
      console.error("Error adding user as participant:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Link href={`/chat-room/${id}`} onClick={handleJoinRoom}>
      <div
        className="max-w-lg w-full rounded-lg overflow-hidden shadow-lg flex justify-center items-end image-card overlay-gradient"
        style={{ backgroundImage: `url(${imgBanner})` }}
      >
        <div className="px-6 py-4 text-white z-10 flex flex-col items-center">
          <div className="font-bold text-xl mb-2">{name}</div>
          <div className="flex">
            {displayedImages.map((image, index) => (
              <div className="-ml-3" key={index}>
                <Avatar image={image} />
              </div>
            ))}
            {remainingCount > 0 && (
              <Image
                className="w-8 h-8 rounded-full -ml-3 shadow-lg"
                src={imagePlaceHold}
                alt={`Avatar ${totalImages}`}
                width={250}
                height={250}
              />
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

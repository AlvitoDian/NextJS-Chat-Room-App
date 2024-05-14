import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMessage,
  faUserPlus,
  faFlag,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import UserProfileModal from "@/components/UserProfileModal";
import { useReceiver } from "@/contexts/ReceiverContext";
import { useRouter } from "next/router";
import axios from "axios";

export default function UserOnlineList({ participants, currentUser }) {
  const { fetchReceiverUser } = useReceiver();
  const [isOpen, setIsOpen] = useState(true);
  const [modalUserIsOpen, setModalUserIsOpen] = useState(false);
  const [profileUserModal, setProfileUserModal] = useState<any>("");
  const router = useRouter();

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const openModalUser = (isOpen) => {
    setModalUserIsOpen(isOpen);
  };

  const handleDirectMessageClick = async (userId) => {
    try {
      await fetchReceiverUser(userId);
      router.push("/direct-message");
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const handleOpenUserProfile = async (userId) => {
    try {
      const res = await axios.get(`/api/users/detailUser/${userId}`, {
        headers: {
          "Cache-Control": "no-store",
        },
      });
      openModalUser(true);
      setProfileUserModal(res.data);
    } catch (error) {
      console.error("Error fetching user detail:", error);
      throw new Error("Failed to fetch user detail");
    }
  };

  const handleAddFriend = async (userId) => {
    const userReq = currentUser.id;
    const userAdd = userId;
    console.log(userReq, "userReq");
    console.log(userAdd, "userAdd");

    const res = await axios.post(`/api/friendship/addFriend`, {
      userReq,
      userAdd,
    });
  };

  return (
    <div className="border border-[#d7cafc] border-[1px] bg-[#906BFA] rounded-lg flex flex-col sm:mt-10 md:mt-0 md:mx-10">
      {modalUserIsOpen && profileUserModal.user ? (
        <UserProfileModal
          openModalUser={openModalUser}
          username={profileUserModal.user.username}
          email={profileUserModal.user.email}
          profileImage={profileUserModal.user.profileImage}
          bannerImage={profileUserModal.user.bannerImage}
          userId={profileUserModal.user._id}
          userSince={profileUserModal.user.createdAt}
        />
      ) : null}
      <div
        className="flex justify-between items-center px-4 py-2 cursor-pointer"
        onClick={toggleAccordion}
      >
        <h2 className="text-md font-semibold text-white">Users</h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-6 h-6 transition-all duration-200 text-white ${
            isOpen ? "transform rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      <div
        className={`wrapper bg-[#f4f4fa] ${
          isOpen ? "is-open border-t border-[#d7cafc] rounded-b-md" : ""
        }`}
      >
        <div className="inner">
          {participants.map((participant, index) => (
            <div
              className="flex justify-between border-[#e6defc] border-b-[1px]"
              key={index}
            >
              <div
                className="flex items-center cursor-pointer"
                onClick={() => {
                  handleOpenUserProfile(participant._id);
                }}
              >
                <div className="pl-3">
                  <Image
                    className="w-6 h-6 rounded-full"
                    src={participant.profileImage}
                    alt="Rounded avatar"
                    width={100}
                    height={100}
                  />
                </div>
                <p key={index} className="px-2 py-2 text-sm text-gray-500">
                  {participant.username}
                </p>
              </div>
              <div className="flex gap-[13px] items-center px-3">
                <FontAwesomeIcon
                  className="text-[16px] cursor-pointer text-[#906BFA] hover:text-[#6d4acf]"
                  icon={faMessage}
                  onClick={() => handleDirectMessageClick(participant._id)}
                />
                <FontAwesomeIcon
                  className="text-[16px] cursor-pointer text-[#906BFA] hover:text-[#6d4acf]"
                  icon={faUserPlus}
                  onClick={() => handleAddFriend(participant._id)}
                />
                <FontAwesomeIcon
                  className="text-[16px] cursor-pointer text-[#ff2626] hover:text-[#ed4040]"
                  icon={faFlag}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

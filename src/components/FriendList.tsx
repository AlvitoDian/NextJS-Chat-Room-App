import { useState, useEffect } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faGear } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useReceiver } from "@/contexts/ReceiverContext";
import { useFriendLists } from "@/contexts/FriendListsContext";
import { useRouter } from "next/router";

export default function FriendList({ currentUser }) {
  const router = useRouter();
  const { allReceiver, receiverUser, fetchReceiverUser, fetchConversation } =
    useReceiver();
  const {
    friendLists,
    setFriendLists,
    filteredFriendLists,
    setFilteredFriendLists,
  } = useFriendLists();

  const [isOpen, setIsOpen] = useState(false);
  /*   const [friendLists, setFriendLists] = useState([]);
  const [filteredFriendLists, setFilteredFriendLists] = useState([]);

  useEffect(() => {
    fetchFriendLists(currentUser.id);
  }, [currentUser.id]);

  const fetchFriendLists = async (id: any) => {
    try {
      const response = await axios.get(`/api/friendship/getFriendLists/${id}`);
      if (response.status !== 200) {
        throw new Error("Failed to fetch user");
      }
      const friendData = response.data.friends;
      setFriendLists(friendData);

      const filteredFriends = friendData
        .map((friend) => {
          if (friend.user1._id !== currentUser.id) {
            return friend.user1;
          } else if (friend.user2._id !== currentUser.id) {
            return friend.user2;
          } else {
            return null;
          }
        })
        .filter((user) => user !== null);

      setFilteredFriendLists(filteredFriends);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }; */

  const handleDirectMessageClick = async (userId) => {
    try {
      await fetchReceiverUser(userId);
      await fetchConversation(userId, allReceiver, currentUser.id);
      router.push("/direct-message");
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-[#906BFA] rounded-t-md flex flex-col fixed bottom-0 right-10 w-[270px] z-10 shadow">
      <div
        className={`wrapper bg-[#f4f4fa] ${
          isOpen
            ? "is-open border-b border-[#d7cafc] rounded-t-md border border-[#d7cafc] border-[1px]"
            : ""
        }`}
      >
        <div className="inner">
          <div
            className="max-h-[500px] overflow-auto custom-scrollbar"
            id="style-3"
          >
            {/* Loop Here */}
            {friendLists.map((friend, index) => (
              <div key={index} className="border-[#e6defc] border-b-[1px]">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <div className="pl-3">
                      <Image
                        className="w-6 h-6 rounded-full"
                        src={
                          currentUser.id !== friend.user1._id
                            ? friend.user1.profileImage
                            : friend.user2.profileImage
                        }
                        alt="Rounded avatar"
                        width={100}
                        height={100}
                      />
                    </div>
                    <p className="px-4 py-2 text-sm text-gray-500">
                      {currentUser.id !== friend.user1._id
                        ? friend.user1.username
                        : friend.user2.username}
                    </p>
                  </div>
                  <div className="flex gap-[13px] items-center px-3">
                    <FontAwesomeIcon
                      className="text-[16px] cursor-pointer text-[#906BFA] hover:text-[#6d4acf]"
                      icon={faMessage}
                      onClick={() =>
                        handleDirectMessageClick(
                          currentUser.id !== friend.user1._id
                            ? friend.user1._id
                            : friend.user2._id
                        )
                      }
                    />
                    <FontAwesomeIcon
                      className="text-[16px] cursor-pointer text-gray-500 hover:text-gray-900"
                      icon={faGear}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="flex justify-between items-center px-4 py-2 cursor-pointer"
        onClick={toggleAccordion}
      >
        <h2 className="text-md font-semibold text-white ">Friends</h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-6 h-6 transition-all duration-200 text-white ml-5 ${
            isOpen ? "transform rotate-0" : "transform rotate-180"
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
    </div>
  );
}

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

interface FriendListsContextType {
  friendLists: any;
  filteredFriendLists: any;
  setFriendLists: any;
  setFilteredFriendLists: any;
}

const FriendListsContext = createContext<FriendListsContextType | undefined>(
  undefined
);

export const FriendListsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [friendLists, setFriendLists] = useState([]);
  const [filteredFriendLists, setFilteredFriendLists] = useState([]);

  const { data: session } = useSession() as any;

  useEffect(() => {
    const fetchFriendLists = async () => {
      try {
        const response = await axios.get(
          `/api/friendship/getFriendLists/${session.user.id}`
        );
        if (response.status !== 200) {
          throw new Error("Failed to fetch user");
        }
        const friendData = response.data.friends;
        setFriendLists(friendData);

        const filteredFriends = friendData
          .map((friend) => {
            if (friend.user1._id !== session.user.id) {
              return friend.user1;
            } else if (friend.user2._id !== session.user.id) {
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
    };
    fetchFriendLists();
  }, []);

  return (
    <FriendListsContext.Provider
      value={{
        friendLists,
        setFriendLists,
        filteredFriendLists,
        setFilteredFriendLists,
      }}
    >
      {children}
    </FriendListsContext.Provider>
  );
};

export const useFriendLists = (): FriendListsContextType => {
  const context = useContext(FriendListsContext);
  if (!context) {
    throw new Error("useFriendLists must be used within a HelloProvider");
  }
  return context;
};

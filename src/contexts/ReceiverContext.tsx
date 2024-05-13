import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

interface ReceiverContextType {
  receiverUser: any;
  conversation: any;
  allReceiver: any;
  fetchReceiverUser: (userId: any) => void;
  fetchConversation: (userId: any, receiver: any, sessionUserId: any) => void;
}

const ReceiverContext = createContext<ReceiverContextType | undefined>(
  undefined
);

export const ReceiverProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [receiverUser, setReceiverUser] = useState<any>("");
  const [conversation, setConversation] = useState<any>("");
  const [allReceiver, setAllReceiver] = useState<any>([]);

  const { data: session } = useSession() as any;

  useEffect(() => {
    if (session && session.user) {
      const fetchAllReceivers = async () => {
        try {
          const response = await axios.get(
            `/api/directMessage/getAll/${session.user.id}`
          );
          if (response.status !== 200) {
            throw new Error("Failed to fetch users");
          }
          const allReceiverData = response.data.messages;
          setAllReceiver(allReceiverData);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };
      fetchAllReceivers();
    }
  }, [session]);

  //? Fetch Contact
  const fetchReceiverUser = async (id: any) => {
    try {
      const response = await axios.get(`/api/users/detailUser/${id}`);
      if (response.status !== 200) {
        throw new Error("Failed to fetch user");
      }
      const userData = response.data;
      setReceiverUser(userData);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  //? Fetch Conversation
  const fetchConversation = async (
    id: any,
    receiver: any,
    sessionUserId: any
  ) => {
    try {
      const selectedReceiver = await receiver.find((contact) => {
        return (
          (contact.receiver._id === id || contact.sender._id === id) &&
          (contact.sender._id === sessionUserId ||
            contact.receiver._id === sessionUserId)
        );
      });

      setConversation(selectedReceiver);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  return (
    <ReceiverContext.Provider
      value={{
        receiverUser,
        conversation,
        fetchReceiverUser,
        fetchConversation,
        allReceiver,
      }}
    >
      {children}
    </ReceiverContext.Provider>
  );
};

export const useReceiver = () => {
  const context = useContext(ReceiverContext);
  if (!context) {
    throw new Error("useReceiver must be used within a ReceiverProvider");
  }
  return context;
};

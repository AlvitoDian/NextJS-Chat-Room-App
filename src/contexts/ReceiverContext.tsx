import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";

interface ReceiverContextType {
  receiverUser: any;
  conversation: any;
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

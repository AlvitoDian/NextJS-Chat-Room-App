import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";

interface ConversationContextType {
  conversation: any;
  fetchConversation: (userId: any) => void;
}

const ConversationContext = createContext<ConversationContextType | undefined>(
  undefined
);

export const ConversationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [conversation, setConversation] = useState<any>("");

  const fetchConversation = async (id: any) => {
    try {
      const response = await axios.get(`/api/users/detailUser/${id}`);
      if (response.status !== 200) {
        throw new Error("Failed to fetch user");
      }
      const userData = response.data;
      setConversation(userData);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  return (
    <ConversationContext.Provider value={{ conversation, fetchConversation }}>
      {children}
    </ConversationContext.Provider>
  );
};

export const useConversation = () => {
  const context = useContext(ConversationContext);
  if (!context) {
    throw new Error("useReceiver must be used within a ReceiverProvider");
  }
  return context;
};

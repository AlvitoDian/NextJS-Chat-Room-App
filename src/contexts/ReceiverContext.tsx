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
  fetchReceiverUser: (userId: any) => void;
}

const ReceiverContext = createContext<ReceiverContextType | undefined>(
  undefined
);

export const ReceiverProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [receiverUser, setReceiverUser] = useState<any>("Kwonsol");

  const fetchReceiverUser = async (id: any) => {
    try {
      const response = await axios.get(`/api/users/detailUser/${id}`);
      if (response.status !== 200) {
        throw new Error("Failed to fetch user");
      }
      const userData = response.data;
      console.log("from context", userData);
      setReceiverUser(userData);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  return (
    <ReceiverContext.Provider value={{ receiverUser, fetchReceiverUser }}>
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

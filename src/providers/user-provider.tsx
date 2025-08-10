import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type UserContextType = {
  userId: number | null;
  setUserId: (id: number) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);
const apiBaseUrl = process.env.EXPO_PUBLIC_API_BASE_URL;

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<number | null>(null);
  console.log(userId);

  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem("user_id");
      if (stored) {
        setUserId(Number(stored));
      } else {
        // ここでAPIを叩いてuser_idを取得
        fetch(`${apiBaseUrl}/user/new-user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then(async (data) => {
            if (data && typeof data.user_id === "number") {
              setUserId(data.user_id);
              await AsyncStorage.setItem("user_id", String(data.user_id));
            }
          });
      }
    })();
  }, []);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within a UserProvider");
  return ctx;
};

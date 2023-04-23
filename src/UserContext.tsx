import { createContext } from "react";

type UserContextType = {
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
  userid: string;
  setUserid: React.Dispatch<React.SetStateAction<string>>;
};

const UserContext = createContext<UserContextType>({
  user: "",
  setUser: () => {},
  userid: "",
  setUserid: () => {},
});

export default UserContext;
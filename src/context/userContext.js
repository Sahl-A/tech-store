import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  // Get the data stored in locaStorage and set it to this.state.
  const [user, setUser] = useLocalStorage("user", {});

  // When user Register or login
  const userLogin = (newUser) => {
    // Add the user's token,username to localStorage
    setUser(newUser);
  };
  // When user logs out
  const userLogout = () => {
    setUser({ username: null, token: null });
    localStorage.removeItem("user");
  };
  return (
    <UserContext.Provider value={{ user, userLogin, userLogout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };

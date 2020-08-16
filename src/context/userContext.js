import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  // Get the data stored in locaStorage and set it to this.state.
  const [user, setUser] = useLocalStorage("user", {});

  // The height of the scroll is added here out of laziness, we should add a new context and add the UI related variables inside import PropTypes from 'prop-types'
  // The height below will be passed to ScrollButton component
  const [height, setHeight] = React.useState(0);

  // get the height after each mount
  React.useEffect(() => {
    // Get the height of the scrollbar in the window and set it to height variable
    window.addEventListener("scroll", () => {
      setHeight(window.pageYOffset);
    });
    // Cleanup function
    // Technically, the cleanup fn is not important here as the context will never be unmouned,
    // however, it is a good practice to add it
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  });

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
    <UserContext.Provider value={{ user, userLogin, userLogout, height }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };

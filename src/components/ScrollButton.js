import React from "react";
import { UserContext } from "../context/userContext";
import { FaAngleDoubleUp } from "react-icons/fa";

const ScrollButton = () => {
  // Get the height from the UserContext
  const { height } = React.useContext(UserContext);

  // When clicking the scroll button
  const scrollButtonHandler = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  return (
    <button
      className={height > 100 ? "scroll-btn show-scroll-btn" : "scroll-btn"}
      onClick={scrollButtonHandler}
    >
      <FaAngleDoubleUp />
    </button>
  );
};

export default ScrollButton;

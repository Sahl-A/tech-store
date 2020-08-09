import React from "react";
import LoadingGif from "../assets/loading.gif";

export default function Loading() {
  return (
    <div className="loading">
      <h2>Loading...</h2>
      <img src={LoadingGif} alt="laoding gif" />
    </div>
  );
}

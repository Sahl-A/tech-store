import React from "react";
import { useParams } from "react-router-dom";

export default function ProductDetails() {
  const { id } = useParams();
  return <h1>hello from product details page. Product id: {id}</h1>;
}

import React from "react";
import { CartContext } from "../context/cartContext";
// import { UserContext } from "../context/userContext";
import EmptyCart from "../components/Cart/EmptyCart";
import CartItem from "../components/Cart/CartItem";

export default function Cart() {
  const { cart, total } = React.useContext(CartContext);
  if (!cart.length) return <EmptyCart />;
  return <h1>Hello from cart page</h1>
}

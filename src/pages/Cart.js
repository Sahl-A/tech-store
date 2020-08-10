import React from "react";
import { CartContext } from "../context/cartContext";
// import { UserContext } from "../context/userContext";
import EmptyCart from "../components/Cart/EmptyCart";
import CartItem from "../components/Cart/CartItem";
import { Link } from "react-router-dom";

export default function Cart() {
  // Will be removed later, to check wheather user is authenticated
  const auth = false;
  const { cart, total } = React.useContext(CartContext);
  if (!cart.length) return <EmptyCart />;
  return (
    <section className="cart-items section">
      <h2>Your cart</h2>
      {cart.map((item) => (
        <CartItem key={item.id} {...item} />
      ))}
      <h2>Total: ${total}</h2>
      {auth ? (
        <Link to="/checkout" className="btn-primary btn btn-block">
          checkout
        </Link>
      ) : (
        <Link to="/login" className="btn-primary btn btn-block">
          login
        </Link>
      )}
    </section>
  );
}

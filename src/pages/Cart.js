import React from "react";
import { CartContext } from "../context/cartContext";
import { UserContext } from "../context/userContext";
import EmptyCart from "../components/Cart/EmptyCart";
import CartItem from "../components/Cart/CartItem";
import { Link } from "react-router-dom";

export default function Cart() {
  // Check wheather user is authenticated
  const {user: auth} = React.useContext(UserContext);
  const { cart, totalPrice } = React.useContext(CartContext);
  if (!cart.length) return <EmptyCart />;
  return (
    <section className="cart-items section">
      <h2>Your cart</h2>
      {cart.map((item) => (
        <CartItem key={item.id} {...item} />
      ))}
      <h2>Total: ${totalPrice}</h2>
      {auth.token ? (
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

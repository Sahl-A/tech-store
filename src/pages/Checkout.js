import React from "react";
// components
import EmptyCart from "../components/Cart/EmptyCart";
// Router
import { Redirect, useHistory } from "react-router-dom";
// Context
import { UserContext } from "../context/userContext";
import { CartContext } from "../context/cartContext";
// react-stripe elements
import submitOrder from "../strapi/submitOrder";

export default function Checkout(props) {
  // Get values from context
  const { user } = React.useContext(UserContext);
  const { cart, totalPrice, clearCart } = React.useContext(CartContext);

  // Get the history
  const history = useHistory();

  // Set States
  const [name, setName] = React.useState("");
  const [error, setError] = React.useState("");
  const isEmpty = !name;

  // When submitting the form
  const handleSubmit = async (e) => {
    e.preventdefaultI();
  };

  // Return EmptyCart component if cart is empty
  if(!cart.length) return <EmptyCart />;

  return (
    <>
      {user.token ? null : <Redirect to="/" />}
      <section className="section form">
        <h2 className="section-ti">checkout</h2>
        <form className="checkout-form">
          <h3>
            order total: <span>${totalPrice}</span>
          </h3>
          {/* Singe input */}
          <div className="form-control">
            <label htmlFor="name">name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          {/*END of Singe input */}
          <div className="stripe-input">
            <label htmlFor="card-element">Credit or Debit Card</label>
            <p className="stripe-info">
              test using this credit card: <span>4242 4242 4242 4242</span>
              <br />
              enter any 5 digits for the zip code
              <br />
              enter any 3 digits for the CVC
            </p>
          </div>
          {error && <p className="form-empty">{error}</p>}
          {isEmpty ? (
            <p className="form-empty">please fill out name field</p>
          ) : (
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn btn-primary btn-block"
            >
              submit
            </button>
          )}
        </form>
      </section>
    </>
  );
}

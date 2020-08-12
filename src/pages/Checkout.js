import React from "react";
// components
import EmptyCart from "../components/Cart/EmptyCart";
// Router
import { Redirect, useHistory } from "react-router-dom";
// Context
import { UserContext } from "../context/userContext";
import { CartContext } from "../context/cartContext";
// react-stripe elements
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import submitOrder from "../strapi/submitOrder";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

export default function Checkout() {
  // Get values from context
  const { user } = React.useContext(UserContext);
  const { cart, totalPrice, clearCart } = React.useContext(CartContext);

  // Get Stripe values
  const stripe = useStripe();
  const elements = useElements();

  // Get the history
  const history = useHistory();

  // Set States
  const [name, setName] = React.useState("");
  const [error, setError] = React.useState("");
  const isEmpty = !name || !stripe || !elements;

  // When submitting the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create token to send it to the backend so the backend can make the payment with stripe
    const cardElement = elements.getElement(CardElement);
    const response = await stripe
      .createToken(cardElement)
      .catch((err) => alert(`ERROR in getting token`));

    // Check if the token is received
    if (response.token) {
      // Submit the order
      const order = await submitOrder({name, items: cart, totalPrice, stripeTokenId: response.token.id, userToken: user.token});
      if (order) {
        clearCart();
        history.push("/");
        return;
      }
    } else {
      setError(response.error.message);
    }
  };

  // Return EmptyCart component if cart is empty
  if (!cart.length) return <EmptyCart />;

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
          <CardElement
            className="card-element"
            options={CARD_ELEMENT_OPTIONS}
          />
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

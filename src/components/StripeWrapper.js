import React from "react";
import Checkout from '../pages/Checkout'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51HDtTGIggLzEpD4stxKHutkEq6kBftb7sNIpsy1XTNpnBfPJo2jlvK7vdTB19S1Lw1O2iK2GLd5YKVCvlkcgt01V00McAyiwys"
);

export default () => {
  return (
    <Elements stripe={stripePromise}>
      <Checkout />
    </Elements>
  );
};

import axios from "axios";
import URL from "../utils/URL";
// When Dealing with the Stripe order:

// Submit the order
export default async ({
  name, 
  totalPrice,
  items,
  stripeTokenId,
  userToken,
}) => {
  const response = await axios.post(
    `${URL}/orders`,
    { name, totalPrice, items, stripeTokenId },
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  ).catch(err=> alert(`error in submitting the order [submitOrder.js]`))
  return response;
};

import {
  increase,
  decrease,
  remove,
  addTooCart,
  clearAllCart,
} from "../actions/cartActions";

const increaseFn = (state, id) => {
  const newState = state.map((item) =>
    item.id === id ? { ...item, amount: item.amount + 1 } : { ...item }
  );
  return newState;
};

const removeFn = (state, id) => {
  return [...state.filter((item) => item.id !== id)];
};

const decreaseFn = (state, id) => {
  const newState = [
    ...state.map((item) =>
      item.id === id ? { ...item, amount: item.amount - 1 } : { ...item }
    ),
  ];
  // Remove any item that has 0 amount
  return newState.filter((item) => item.amount);
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case increase:
      return increaseFn(state, action.id);

    case addTooCart:
      // Destruct the properties of the received product
      const { title, price, id, image } = action.product;
      // If the item is in the cart, increment the amount by 1
      const item = state.find((item) => item.id === id);
      if (item) {
        return increaseFn(state, id);
      }
      // Add the Item to the cart
      return [...state, { title, price, id, amount: 1, image }];

    case remove:
      return removeFn(state, action.id);

    case decrease:
      return decreaseFn(state, action.id);

    case clearAllCart:
      return [];

    default:
      return state;
  }
};

export default cartReducer;

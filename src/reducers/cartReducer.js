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
        increaseFn(state, id);
        return;
      }
      // Add the Item to the cart
      return [...state, { title, price, id, amount: 1, image }];

    case remove:
      return [...state.filter((item) => item.id !== action.id)];

    case decrease:
      return [
        ...state.map((item) =>
          item.id === action.id ? { ...item, amount: item.amount - 1 } : { ...item }
        ),
      ];
    
    case clearAllCart:
        return [];

    default:
      return state;
  }
};

export default cartReducer;

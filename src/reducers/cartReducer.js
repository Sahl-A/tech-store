const increase = (state, id) => {
  const newState = state.map((item) =>
    item.id === id ? { ...item, amount: item.amount + 1 } : { ...item }
  );
  return newState;
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "INCREASE":
      return increase(state, action.id);

    case "Add_TO_CART":
      // Destruct the properties of the received product
      const { title, price, id, image } = action.product;
      // If the item is in the cart, increment the amount by 1
      const item = state.find((item) => item.id === id);
      if (item) {
        increase(state, id);
        return;
      }
      // Add the Item to the cart
      return [...state, { title, price, id, amount: 1, image }];

    case "REMOVE":
      return [...state.filter((item) => item.id !== action.id)];

    case "DECREASE":
      return [
        ...state.map((item) =>
          item.id === action.id ? { ...item, amount: item.amount - 1 } : { ...item }
        ),
      ];
    
    case 'CLEAR_CART':
        return [];
        
    default:
      return state;
  }
};

export default cartReducer;

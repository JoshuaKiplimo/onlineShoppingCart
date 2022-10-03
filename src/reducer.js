import CartItem from "./CartItem";

const reducer = (state, action) => {
  switch (action.type) {
    case "CLEAR_CART":
      return { ...state, cart: [] };
    case "REMOVE":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    case "CART_SIZE_CHANGE":
      if (action.payload.change == "increase") {
      }
      let tempCart = state.cart
        .map((item) => {
          if (
            item.id == action.payload.id &&
            action.payload.change === "increase"
          ) {
            console.log("increase");
            return { ...item, amount: item.amount + 1 };
          } else if (
            item.id == action.payload.id &&
            action.payload.change === "decrease"
          ) {
            console.log("decrease");
            return { ...item, amount: item.amount - 1 };
          }
          return item;
        })
        .filter((item) => item.amount >= 1);
      console.log(tempCart);
      return { ...state, cart: tempCart };
    case "GET_TOTAL":
      let { total, amount } = state.cart.reduce(
        (cartTotal, item) => {
          const { price, amount } = item;
          cartTotal.amount += amount;
          cartTotal.total += amount * price;

          return cartTotal;
        },
        { total: 0, amount: 0 }
      );
      total = parseFloat(total.toFixed(2));
      return {
        ...state,
        total,
        amount,
      };
    case "LOADING":
      return { ...state, loading: true };
    case "DISPLAY_DATA":
      return { ...state, cart: action.payload.cartData, loading: false };

    default:
      throw new Error("no matching action type");
  }
};

export default reducer;

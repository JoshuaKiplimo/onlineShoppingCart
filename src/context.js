import React, { useState, useContext, useReducer, useEffect } from "react";
import cartItems from "./data";
import reducer from "./reducer";
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "https://course-api.com/react-useReducer-cart-project";
const AppContext = React.createContext();

const initialState = {
  loading: false,
  cart: cartItems,
  total: 0,
  amount: 0,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [numberOfItems, setnumberOfItems] = useState({ number: 1, id: "" });
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };
  const remove = (id) => {
    dispatch({ type: "REMOVE", payload: id });
  };
  const cartSizeChange = (change, id) => {
    dispatch({ type: "CART_SIZE_CHANGE", payload: { id, change } });
  };

  const fetchData = async () => {
    dispatch({ type: "LOADING" });
    const response = await fetch(url);
    const cartData = await response.json();
    dispatch({ type: "DISPLAY_DATA", payload: { cartData } });
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    dispatch({ type: "GET_TOTAL" });

    return () => {};
  }, [state.cart]);
  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        remove,
        cartSizeChange,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };

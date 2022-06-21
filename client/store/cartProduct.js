import Axios from "axios";
import { addToLocal, removeFromLocal } from "./localStorage";

const GET_CART_PRODUCT = "GET_CART_PRODUCT";
const SUB_QUANTITY = "SUB_QUANTITY";
const ADD_QUANTITY = "ADD_QUANTITY";

const getCartProduct = (cartProduct) => {
  return {
    type: GET_CART_PRODUCT,
    cartProduct,
  };
};
export const subtractQuantity = (product) => {
  return {
    type: SUB_QUANTITY,
    product,
  };
};

//WHATS SENT BACK FROM BACKEND TO UPDATE STATE
export const addQuantity = (product) => {
  return {
    type: ADD_QUANTITY,
    product,
  };
};

export const getCartProductThunk = (userId, cartId) => async (dispatch) => {
  try {
    const { data } = await Axios.get(`/api/cart/${userId}/${cartId}`);
    dispatch(getCartProduct(data));
    // console.log(data)
  } catch (error) {
    console.log(error);
  }
};
export const addQuantityThunk = (userId, productId) => async (dispatch) => {
  try {
    const { data } = await Axios.put(
      `/api/cart/plusOne/${userId}/${productId}`
    );
    dispatch(addQuantity(data));
    // console.log("data", data);
  } catch (error) {
    console.log(error);
  }
};

export const subQuantityThunk = (userId, productId) => async (dispatch) => {
  try {
    const { data } = await Axios.put(
      `/api/cart/minusOne/${userId}/${productId}`
    );
    dispatch(subtractQuantity(data));
    // console.log("data", data);
  } catch (error) {
    console.log(error);
  }
};

export const fetchCartLocally = () => {
  return (dispatch) => {
    try {
      const products = JSON.parse(localStorage.getItem("guestCart"));
      if (products) {
        dispatch(getCart(products));
      } else {
        dispatch(getCart([]));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const addItemLocally = (product) => {
  return (dispatch) => {
    try {
      const guestCart = addToLocal(product);
      dispatch(addToCart(product));
    } catch (err) {
      console.log(err);
    }
  };
};

export const removeItemLocally = (productId) => {
  async (dispatch) => {
    try {
      const { data } = await Axios.get(`/api/products/${productId}`);
      const updatedCart = removeFromLocal(data);
      dispatch(deleteFromCart(data.id));
    } catch (err) {
      console.log(err);
    }
  };
};

export default function cartProductReducer(state = [], action) {
  switch (action.type) {
    case GET_CART_PRODUCT:
      return action.cartProduct;
    case ADD_QUANTITY:
      return state.map((product) => {
        if (product.productId === action.product.productId) {
          product.quantity = action.product.quantity;
        }
        return product;
      });
    case SUB_QUANTITY:
      return state.map((product) => {
        if (product.productId === action.product.productId) {
          product.quantity = action.product.quantity;
        }
        return product;
      });
    default:
      return state;
  }
}

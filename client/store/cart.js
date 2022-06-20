import Axios from "axios";
import { addToLocal, decreaseQtyLocal, increaseQtyLocal } from "./localStorage";

const GET_CART = "GET_CART";
const ADD_TO_CART = "ADD_TO_CART";
const DELETE_FROM_CART = "DELETE_FROM_CART";
const PLACE_ORDER = "PLACE_ORDER";
const SUB_QUANTITY = "SUB_QUANTITY";
const ADD_QUANTITY = "ADD_QUANTITY";

const getCart = (cart) => {
  return {
    type: GET_CART,
    cart,
  };
};

const addToCart = (product) => ({
  type: ADD_TO_CART,
  product,
});

const deleteFromCart = (productId) => ({
  type: DELETE_FROM_CART,
  productId,
});

export const subtractQuantity = (product) => {
  return {
    type: SUB_QUANTITY,
    product,
  };
};

export const addQuantity = (product) => {
  return {
    type: ADD_QUANTITY,
    product,
  };
};

export const getCartThunk = (userId) => async (dispatch) => {
  try {
    const { data } = await Axios.get(`/api/cart/${userId}`);
    const cart = data[0];
    // console.log('data[0]',cart)
    dispatch(getCart(cart));
  } catch (error) {
    console.log(error);
  }
};

export const addToCartThunk = (userId, productId) => async (dispatch) => {
  try {
    const { data } = await Axios.post(`/api/cart/${userId}/${productId}`);
    dispatch(addToCart(data));
    // console.log("cartproduct", data);
  } catch (error) {
    console.log(error);
  }
};

export const deleteFromCartThunk = (cartId, productId) => async (dispatch) => {
  try {
    await Axios.delete(`/api/cart/${cartId}/${productId}`);
    dispatch(deleteFromCart(productId));
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

export const addQuantityLocally = (productId) => {
  return (dispatch) => {
    try {
      increaseQtyLocal(productId);
      dispatch(addQuantity(productId));
    } catch (err) {
      console.log(err);
    }
  };
};

export const subtractQuantityLocally = (productId) => {
  return (dispatch) => {
    try {
      decreaseQtyLocal(productId);
      dispatch(subtractQuantity(productId));
    } catch (err) {
      console.log(err);
    }
  };
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

export default function cartReducer(state = { products: [] }, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart;
    case ADD_TO_CART:
      return { ...state, products: [...state.products, action.product] };
    case DELETE_FROM_CART:
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.productId
        ),
      };
    case ADD_QUANTITY:
      return { ...state, products: [...state.products, action.product] };
    case SUB_QUANTITY:
      return { ...state, products: [...state.products, action.product] };
    default:
      return state;
  }
}

import { cartConstants } from "../constants/cartConstants";
import axios from "axios";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
      type: cartConstants.CART_ADD_ITEM,
      payload: {
          product: data._id,
          name: data.name,
          image: data.image,
          countInStock: data.countInStock,
          price: data.price,
          qty
      }
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
};

export const removeFromCart = (id) => (dispatch, getstate)=>{
      dispatch({
        type: cartConstants.CART_REMOVE_ITEM,
        payload:id
      })

      localStorage.setItem('cartItems', JSON.stringify(getstate().cart.cartItems))
}

export const saveShippingAddress = (data) => (dispatch)=>{
  dispatch({
    type: cartConstants.CART_SAVE_SHIPPING_ADDRESS,
    payload:data
  })

  localStorage.setItem('shippingAddress', JSON.stringify(data))
}
export const savePaymentMethod = (data) => (dispatch)=>{
  dispatch({
    type: cartConstants.CART_SAVE_PAYMENT_METHOD,
    payload:data
  })

  localStorage.setItem('paymentMethod', JSON.stringify(data))
}

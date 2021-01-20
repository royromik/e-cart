import {orderConstants} from "../constants/orderConstants.js";

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case orderConstants.ORDER_CREATE_REQUEST:
      return {
        loading: true,
      };
    case orderConstants.ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };
    case orderConstants.ORDER_CREATE_FAIL:
      return {
          loading:false,
          error:action.payload
      }
    default:
      return state;
  }
};
export const orderDetailsReducer = (state = {order:{loading:true, user:{}, orderItems : [],shippingAddress:{}}}, action) => {
  switch (action.type) {
    case orderConstants.ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case orderConstants.ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };
    case orderConstants.ORDER_DETAILS_FAIL:
      return {
          loading:false,
          error:action.payload
      }
    default:
      return state;
  }

  
};
export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case orderConstants.ORDER_PAY_REQUEST:
      return {
        loading: true,
      };
    case orderConstants.ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case orderConstants.ORDER_PAY_FAIL:
      return {
          loading:false,
          error:action.payload
      }
    case orderConstants.ORDER_PAY_RESET:
      return {}
    default:
      return state;
  }

  
};
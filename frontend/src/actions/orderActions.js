import { orderConstants } from "../constants/orderConstants.js";
import axios from "axios";
import { logout } from './userActions';

export const createOrder = (order) => async (dispatch, getstate) => {
  try {
    dispatch({
      type: orderConstants.ORDER_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getstate();

    let config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/orders`, order, config);

    dispatch({
      type: orderConstants.ORDER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Please authenticate') {
      dispatch(logout())
    }
    dispatch({
      type: orderConstants.ORDER_CREATE_FAIL,
      payload: message,
    })
  }
};

export const getOrderDetails = (id) => async (dispatch, getstate) => {
  try {
    dispatch({
      type: orderConstants.ORDER_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getstate();

    let config = {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/${id}`, config);
    console.log(data)

    dispatch({
      type: orderConstants.ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
    error.response && error.response.data.message
      ? error.response.data.message
      : error.message
  if (message === 'Please authenticate') {
    dispatch(logout())
  }
  dispatch({
    type: orderConstants.ORDER_DETAILS_FAIL,
    payload: message,
  })
  }
};

export const payOrder = (orderId, paymentResult) => async (
  dispatch,
  getstate
) => {
  try {
    dispatch({
      type: orderConstants.ORDER_PAY_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getstate();

    let config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config);

    dispatch({
      type: orderConstants.ORDER_PAY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
    error.response && error.response.data.message
      ? error.response.data.message
      : error.message
  if (message === 'Please authenticate') {
    dispatch(logout())
  }
  dispatch({
    type: orderConstants.ORDER_PAY_FAIL,
    payload: message,
  })
  }
};


export const deliverOrder = (order) => async (
  dispatch,
  getstate
) => {
  try {
    dispatch({
      type: orderConstants.ORDER_DELIVER_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getstate();

    let config = {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/orders/${order._id}/deliver`,{}, config);

    dispatch({
      type: orderConstants.ORDER_DELIVER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
    error.response && error.response.data.message
      ? error.response.data.message
      : error.message
  if (message === 'Please authenticate') {
    dispatch(logout())
  }
  dispatch({
    type: orderConstants.ORDER_DELIVER_FAIL,
    payload: message,
  })
  }
};

export const getMyOrders = () => async (
  dispatch,
  getstate
) => {
  try {
    dispatch({
      type: orderConstants.ORDER_LIST_MYORDERS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getstate();

    let config = {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/myorders`, config);

    dispatch({
      type: orderConstants.ORDER_LIST_MYORDERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
    error.response && error.response.data.message
      ? error.response.data.message
      : error.message
  if (message === 'Please authenticate') {
    dispatch(logout())
  }
  dispatch({
    type: orderConstants.ORDER_LIST_MYORDERS_FAIL,
    payload: message,
  })
  }
};

export const listOrders = () => async (
  dispatch,
  getstate
) => {
  try {
    dispatch({
      type: orderConstants.ORDER_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getstate();

    let config = {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders`, config);

    dispatch({
      type: orderConstants.ORDER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
    error.response && error.response.data.message
      ? error.response.data.message
      : error.message
  if (message === 'Please authenticate') {
    dispatch(logout())
  }
  dispatch({
    type: orderConstants.ORDER_LIST_FAIL,
    payload: message,
  })
  }
};

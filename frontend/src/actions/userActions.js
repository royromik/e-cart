import userConstants from "../constants/userConstants.js";
import { orderConstants } from "../constants/orderConstants.js";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: userConstants.USER_LOGIN_REQUEST,
    });

    let config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );

    dispatch({
      type: userConstants.USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: userConstants.USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({
    type: userConstants.USER_LOGOUT,
  });
  dispatch({
    type: userConstants.USER_DETAILS_RESET,
  });
  dispatch({
    type: userConstants.USER_LISTS_RESET,
  });
  dispatch({
    type: orderConstants.ORDER_LIST_MYORDERS_RESET,
  });
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: userConstants.USER_REGISTER_REQUEST,
    });

    let config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      "/api/users",
      { name, email, password },
      config
    );

    dispatch({
      type: userConstants.USER_REGISTER_SUCCESS,
      payload: data,
    });

    dispatch({
      type: userConstants.USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: userConstants.USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const getUserProfile = (id) => async (dispatch, getstate) => {
  try {
    dispatch({
      type: userConstants.USER_DETAILS_REQUEST,
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

    const { data } = await axios.get(`/api/users/${id}`, config);

    dispatch({
      type: userConstants.USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: userConstants.USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const updateUserProfile = (user) => async (dispatch, getstate) => {
  try {
    dispatch({
      type: userConstants.USER_UPDATE_REQUEST,
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

    const { data } = await axios.put(`/api/users/profile`, user, config);

    dispatch({
      type: userConstants.USER_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: userConstants.USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const getUsers = () => async (dispatch, getstate) => {
  try {
    dispatch({
      type: userConstants.USER_LISTS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getstate();

    let config = {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users`, config);

    dispatch({
      type: userConstants.USER_LISTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: userConstants.USER_LISTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const deleteUser = (id) => async (dispatch, getstate) => {
  try {
    dispatch({
      type: userConstants.USER_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getstate();

    let config = {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`/api/users/${id}`, config);
    dispatch({
      type: userConstants.USER_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: userConstants.USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const updateUserByAdmin = (user) => async (dispatch, getstate) => {
  try {
    dispatch({
      type: userConstants.USER_UPDATE_BY_ADMIN_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getstate();

    let config = {
      headers: {
        'Content-Type':'application/json',
        authorization: `Bearer ${userInfo.token}`,
      },
    };
    const {data} = await axios.put(`/api/users/${user._id}`,user, config);
    dispatch({
      type: userConstants.USER_UPDATE_BY_ADMIN_SUCCESS,
    });

    dispatch({
      type:userConstants.USER_DETAILS_SUCCESS, payload:data
    })
  } catch (error) {
    dispatch({
      type: userConstants.USER_UPDATE_BY_ADMIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

import { authAxios } from "../../Utils/Axios/axios.js";
import { saveLocalStorage } from "../../Utils/LocalStorage/saveLocalStorage.js";
import axios from "axios";

export const reqLoginUser = (email, password) => async (dispatch) => {


  /**
   * ? login user action
   */
  try {
    dispatch({ type: "LOGIN_REQ" })
    const { data } = await authAxios.post(`/api/v1/login`,
      { email, password }
    )
    saveLocalStorage("token", data.token, 2)

    dispatch({ type: "LOGIN_SUCCESS", payload: data })
  } catch (error) {
    console.log(error)
    dispatch({ type: "LOGIN_FAILED", payload: error.response.data.message || error })
  }
}

export const clearError = () => async (dispatch) => {
  dispatch({ type: "CLEAR_ERRORS" })
}
/**
 * ?Regiester User Actions
 */
export const reqRegister = (userForm) => async (dispatch) => {
  try {
    dispatch({ type: "REG_REQ" })
    console.log('got form', userForm)
    const { data } = await authAxios.post(`/api/v1/register`,
      userForm,
    )
    saveLocalStorage("token", data.token, 2)
    dispatch({ type: "REG_SUCCESS", payload: data })
  } catch (error) {
    dispatch({ type: "REG_FAILED", payload: error.response.data.message || error })
  }
}

/**
 * ? load user action
 */

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "LOAD_USER_REQ" })
    const { data } = await authAxios.get(`/api/v1/me`)
    dispatch({ type: "LOAD_USER_SUCCESS", payload: data })
  } catch (error) {
    dispatch({ type: "LOAD_USER_FAILED", payload: error.message || error })
    console.log(error)
  }
}


//logout user

export const logoutUser = () => (dispatch) => {
  dispatch({ type: "LOGOUT_REQ" })
  localStorage.removeItem("token")
  dispatch({ type: "LOGOUT_SUCCESS" })
}


// edit user profile
//sending data in form format
export const editUserProfile = (editDataForm) => async (dispatch) => {
  try {
    if (localStorage.token) {
      const { token, expiry } = JSON.parse(localStorage.token)
      console.log(token, expiry)
      dispatch({ type: "EDIT_PROFILE_REQ" })

      const { data } = await authAxios.put(`/api/v1/update-userprofile`, editDataForm)
      if (data.success) {
        dispatch({ type: "EDIT_PROFILE_SUCCESS", payload: 'Profile Updated Successfullyy' })
      }
    }
  } catch (error) {
    dispatch({ type: "EDIT_PROFILE_FAILED", payload: error.message || error })

  }
}

export const changePassword = (password) => async (dispatch) => {
  try {
    dispatch({ type: 'CHANGE_PASSWORD_REQ' })
    const { data } = await authAxios.put(`/api/v1/change-password`, password)
    dispatch({ type: 'CHANGE_PASSWORD_SUCCESS', payload: data.success })

  } catch (error) {
    console.log(error.response.data.message)
    dispatch({ type: "CHANGE_PASSWORD_FAILED", payload: error.response.data.message })
  }
}

/**
 * ? forget password
 */
export const forgetPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: 'FORGET_PASSWORD_REQ' })
    const { data } = await authAxios.post(`/api/v1/forget-password`, { email })
    dispatch({ type: 'FORGET_PASSWORD_SUCCESS', payload: data.success })

  } catch (error) {
    console.log(error.response.data.message)
    dispatch({ type: "FORGET_PASSWORD_FAILED", payload: error.response.data.message })
  }
}

/** 
 * reset password 
*/
export const resetPassword = (passwords, token) => async (dispatch) => {
  try {
    await dispatch({ type: 'RESET_PASSWORD_REQ' })
    const { data } = await authAxios.put(`/api/v1/reset-password/${token}`, passwords)
    saveLocalStorage('token', data.token, 2)
    await dispatch({ type: 'RESET_PASSWORD_SUCCESS', payload: data.success })
    await dispatch(loadUser());


  } catch (error) {
    console.log(error.response.data.message)
    dispatch({ type: "RESET_PASSWORD_FAILED", payload: error.response.data.message })
  }
}
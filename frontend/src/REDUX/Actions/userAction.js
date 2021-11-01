import { Server, loginReq, regUserReq } from "../../Utils/Axios/axios.js";
import { saveLocalStorage } from "../../Utils/LocalStorage/saveLocalStorage.js";

export const reqLoginUser = (email, password) => async (dispatch) => {


  /**
   * ? login user action
   */
  try {
    dispatch({ type: "LOGIN_REQ" })
    const { data } = await loginReq.post(`/api/v1/login`,
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
  dispatch({ type: "CLEAR_ERROR" })
}
/**
 * ?Regiester User Actions
 */
export const reqRegister = (userForm) => async (dispatch) => {
  try {
    dispatch({ type: "REG_REQ" })
    console.log('got form', userForm)

    const { data } = await regUserReq.post(`/api/v1/register`,
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
    const { token, expiry } = JSON.parse(localStorage.getItem("token"))
    console.log('got the value...', token)
    const { data } = await Server.get(`/api/v1/me?token=${token}&expiry=${expiry}`)
    dispatch({ type: "LOAD_USER_SUCCESS", payload: data })
  } catch (error) {
    dispatch({ type: "LOAD_USER_FAILED", payload: error.message || error })
    console.log(error)
  }
}

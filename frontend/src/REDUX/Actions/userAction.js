import { Server } from "../../Utils/Axios/axios.js";

export const reqLoginUser = (email, password) => async (dispatch) => {


  try {
    dispatch({ type: "LOGIN_REQ" })

    const { data } = await Server.post(`/api/v1/login`,
      { email, password }
    )
    dispatch({ type: "LOGIN_SUCCESS", payload: data })
  } catch (error) {
    console.log(error)
    dispatch({ type: "LOGIN_FAILED", payload: error.response.data.message })
  }
}

export const clearError = () => async (dispatch) => {
  dispatch({ type: "CLEAR_ERROR" })
}

export const reqRegister = (name, email, password, avatar) => async (dispatch) => {
  try {
    console.log('credentials', name, email, password)
    dispatch({ type: "REG_REQ" })
    console.log(name, email, password, 'credentials')
    const { data } = await Server.post(`/api/v1/register`,
      { name, email, password, avatar }
    )
    dispatch({ type: "REG_SUCCESS", payload: data })
  } catch (error) {
    dispatch({ type: "REG_FAILED", payload: error.response.data.message })
  }
}
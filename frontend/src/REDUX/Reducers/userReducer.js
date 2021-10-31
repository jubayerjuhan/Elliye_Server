export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case "LOGIN_REQ":
    case "REG_REQ":
      return {
        ...state,
        loading: true,
      }
    case "LOGIN_SUCCESS":
    case "REG_SUCCESS":
      return {
        loading: false,
        isAuthenticated: true,
        user: action.payload.user
      }
    case "LOGIN_FAILED":
    case "REG_FAILED":
      return {
        loading: false,
        isAuthenticated: false,
        error: action.payload
      }
    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      }


    default:
      return state
  }
}
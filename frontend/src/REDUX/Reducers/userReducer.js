export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case "LOGIN_REQ":
    case "REG_REQ":
    case "LOAD_USER_REQ":
      return {
        ...state,
        loading: true,
      }
    case "LOGIN_SUCCESS":
    case "REG_SUCCESS":
    case "LOAD_USER_SUCCESS":
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user
      }
    case "LOGIN_FAILED":
    case "REG_FAILED":
      return {
        ...state,
        user: null,
        loading: false,
        isAuthenticated: false,
        error: action.payload
      }
    case "LOAD_USER_FAILED":
      return {
        user: null,
        loading: false,
        isAuthenticated: false,
      }
    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      }
    case "LOGOUT_REQ":
      return {
        ...state,
        loading: true
      }
    case "LOGOUT_SUCCESS":
      return {
        ...state,
        loading: false,
        user: null,
        isAuthenticated: false,
      }

    default:
      return state
  }
}


export const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case "EDIT_PROFILE_REQ":
      return {
        loading: true,
        isUpdated: false,
      }
    case "EDIT_PROFILE_SUCCESS":
      return {
        loading: false,
        isUpdated: true,
        success: action.payload
      }
    case "EDIT_PROFILE_FAILED":
      return {
        loading: false,
        isUpdated: false,
      }
    case "CLEAR_SUCCESS":
      return {
        ...state,
        success: null,
      }
    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      }

    default:
      return state;
  }
}
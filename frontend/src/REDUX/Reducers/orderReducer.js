export const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case "ORDER_REQ":
    case "GET_ORDER_REQ":
      return {
        ...state,
        loading: true,
      }
    case "ORDER_SUCCESS":
    case "GET_ORDER_SUCCESS":
      return {
        ...state,
        loading: false,
        orders: action.payload ? action.payload : "",
      }
    case "ORDER_FAILED":
    case "GET_ORDER_FAILED":
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case "CLEAR_ERRORS":
      return {
        ...state,
        error: null
      }

    default:
      return state;
  }
}

export const singleOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case "SINGLE_ORDER_REQ":
      return {
        ...state,
        loading: true,
      }
    case "SINGLE_ORDER_SUCCESS":
      return {
        ...state,
        loading: false,
        order: action.payload
      }
    case "SINGLE_ORDER_FAILED":
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    default:
      return state;
  }
}

export const productReducer = (state = {}, action) => {
  switch (action.type) {
    case
      "ALL_PRODUCTS_REQ":
      return {
        loading: true,
        products: []
      }
    case
      "ALL_PRODUCTS_SUCCESS":
      return {
        loading: false,
        products: action.payload.products,

      }
    case "ALL_PRODUCTS_FAIL":
      return {
        loading: false,
        error: action.payload
      }
    case "CLEAR_ERRORS":
      return {
        ...state,
        error: null
      }
    default:
      return {
        ...state
      }
  }
}


//Single Product Req
export const singleProductReducer = (state = {}, action) => {
  switch (action.type) {
    case
      "SINGLE_PRODUCT_REQ":
      return {
        loading: true,
        singleProduct: {}
      }
    case
      "SINGLE_PRODUCT_SUCCESS":
      return {
        loading: false,
        singleProduct: action.payload,

      }
    case "ALL_PRODUCTS_FAIL":
      return {
        loading: false,
        error: action.payload
      }
    case "CLEAR_ERRORS":
      return {
        ...state,
        error: null
      }
    default:
      return {
        ...state
      }
  }
}
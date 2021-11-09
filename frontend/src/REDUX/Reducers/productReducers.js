
export const productReducer = (state = {}, action) => {
  switch (action.type) {
    case
      "ALL_PRODUCTS_REQ":
    case
      "ADMIN_ALL_PRODUCTS_REQ":
      return {
        loading: true,
        products: []
      }
    case
      "ALL_PRODUCTS_SUCCESS":
    case
      "ADMIN_ALL_PRODUCTS_SUCCESS":
      return {
        loading: false,
        allProducts: action.payload,
      }
    case "ALL_PRODUCTS_FAIL":
      return {
        loading: false,
        error: action.payload.message
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
        error: action.payload.message
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


export const addReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_REVIEW_REQ':
      return {
        ...state,
        loading: true,
      }
    case 'ADD_REVIEW_SUCCESS':
      return {
        ...state,
        loading: false,
        isAdded: action.payload,
      }
    case 'ADD_REVIEW_RESET':
      return {
        ...state,
        isAdded: null,
      }
    case 'ADD_REVIEW_FAILED':
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    default:
      return state;
  }
}

export const deleteProductReducer = (state = {}, action) => {
  switch (action.type) {
    case "DELETE_PRODUCT_SUCCESS":
      return {
        ...state,
        success: action.payload
      }
    case "DELETE_PRODUCT_FAILED":
      return {
        ...state,
        success: false,
        error: action.payload
      }
    case "DELETE_PRODUCT_RESET":
      return {
        ...state,
        success: null
      }
    default:
      return state;
  }
}
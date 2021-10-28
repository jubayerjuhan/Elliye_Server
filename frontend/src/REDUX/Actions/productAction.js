import { Server } from "./../../Utils/Axios/axios";
export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({ type: 'ALL_PRODUCTS_REQ' })
    const { data } = await Server.get("/api/v1/products")
    console.log(data)

    dispatch({ type: 'ALL_PRODUCTS_SUCCESS', payload: data })

  } catch (error) {
    dispatch({
      type: 'ALL_PRODUCTS_FAIL',
      payload: error.response.data.message,
    })
  }
}

export const clearError = () => async (dispatch) => {
  dispatch({ type: 'CLEAR_ERRORS' })
}


export const getSingleProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'SINGLE_PRODUCT_REQ' })
    const { data } = await Server.get(`/api/v1/product/${id}`)
    console.log(data)

    dispatch({ type: 'SINGLE_PRODUCT_SUCCESS', payload: data.product })

  } catch (error) {
    dispatch({
      type: 'SINGLE_PRODUCT_FAIL',
      payload: error.response.data.message,
    })
  }
}

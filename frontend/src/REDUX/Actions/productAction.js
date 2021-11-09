import { authAxios, Server } from "./../../Utils/Axios/axios";
export const getAllProducts = (keyword = '', page = 1, priceValue = [0, 25000], category, rating = 0) => async (dispatch) => {
  try {
    dispatch({ type: 'ALL_PRODUCTS_REQ' })

    let link = `/api/v1/products?page=${page}&keyword=${keyword}&price[gte]=${priceValue[0]}&price[lte]=${priceValue[1]}&ratings[gte]=${rating}`
    console.log(category)
    if (category) {
      link = `/api/v1/products?page=${page}&keyword=${keyword}&price[gte]=${priceValue[0]}&price[lte]=${priceValue[1]}&category=${category}&ratings[lte]=${rating}`
    }
    console.log(link)
    const { data } = await Server.get(link)
    console.log('got', data)

    dispatch({ type: 'ALL_PRODUCTS_SUCCESS', payload: data })

  } catch (error) {
    dispatch({
      type: 'ALL_PRODUCTS_FAIL',
      payload: error,
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
      payload: error
    })
  }
}

export const addReview = (rating) => async (dispatch) => {
  console.log(rating)
  try {
    dispatch({ type: 'ADD_REVIEW_REQ' })
    const { data } = await authAxios.put(`/api/v1/review`, rating)
    dispatch({ type: 'ADD_REVIEW_SUCCESS', payload: data.success })
  } catch (error) {
    dispatch({ type: 'ADD_REVIEW_ERROR', payload: error.response.data.message })
  }
}


// fetching products to show on the admin dashboard
export const allAdminProducts = () => async (dispatch) => {
  try {
    dispatch({ type: 'ADMIN_ALL_PRODUCTS_REQ' })
    const { data } = await authAxios.get('/api/v1/admin/allProducts')
    dispatch({ type: 'ADMIN_ALL_PRODUCTS_SUCCESS', payload: data.products })
  }
  catch (err) {
    dispatch({
      type: 'ALL_PRODUCTS_FAIL',
      payload: err,
    })
  }
}

// delete product from the Database
export const deleteProduct = (id) => async (dispatch) => {
  try {
    const { data } = await authAxios.delete(`/api/v1/admin/product/${id}`)
    dispatch({ type: 'DELETE_PRODUCT_SUCCESS', payload: data.success })
  } catch (error) {
    dispatch({ type: 'DELETE_PRODUCT_FAILED', payload: error })
  }
}
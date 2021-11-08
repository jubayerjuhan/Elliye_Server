import { authAxios } from '../../Utils/Axios/axios.js'
export const createOrder = (orderData) => async (dispatch) => {
  console.log('Order Data', orderData)
  try {
    dispatch({ type: 'ORDER_REQ' })
    const { data } = await authAxios.post('/api/v1/order/new', orderData)
    console.log(data)
    dispatch({ type: 'ORDER_SUCCESS', payload: data })

  } catch (error) {
    dispatch({ type: 'ORDER_FAILED', payload: error.response.data.message })
  }
}

/**
 * get order to show on profile
 */
export const getMyOrders = () => async (dispatch) => {
  try {
    dispatch({ type: 'GET_ORDER_REQ' })
    const { data } = await authAxios.get('/api/v1/my-orders')
    dispatch({ type: 'GET_ORDER_SUCCESS', payload: data.orders })
  } catch (error) {
    dispatch({ type: 'GET_ORDER_FAILED', payload: error || error.response.data.message })
  }
}

/**
 * get single order by id
 */
export const getSingleOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'SINGLE_ORDER_REQ' })
    const { data } = await authAxios.get(`/api/v1/order/${id}`)
    dispatch({ type: 'SINGLE_ORDER_SUCCESS', payload: data.order })
  } catch (error) {
    console.log(error)
    dispatch({ type: 'SINGLE_ORDER_FAILED', payload: error })

  }
}

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: 'CLEAR_ERRORS' })
}
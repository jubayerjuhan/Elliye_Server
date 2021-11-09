import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { addReviewReducer, deleteProductReducer, productReducer, singleProductReducer } from './Reducers/productReducers.js'
import logger from 'redux-logger'
import { changePasswordReducer, profileReducer, userReducer } from './Reducers/userReducer.js'
import { cartReducer } from "./Reducers/cartReducer";
import { orderReducer, singleOrderReducer } from './Reducers/orderReducer.js'
const reducer = combineReducers({
  user: userReducer,
  products: productReducer,
  singleProduct: singleProductReducer,
  profile: profileReducer,
  changePassword: changePasswordReducer,
  cart: cartReducer,
  orders: orderReducer,
  singleOrder: singleOrderReducer,
  addReview: addReviewReducer,
  deleteProduct: deleteProductReducer
})
const initialState = {
  cart: {
    cartItems: localStorage.cart ? JSON.parse(localStorage.cart) : [],
    shippingInfo: localStorage.shipping ? JSON.parse(localStorage.shipping) : {}
  }
}
const middlewares = [thunk, logger]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middlewares)))

export default store;
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { productReducer, singleProductReducer } from './Reducers/productReducers.js'
import logger from 'redux-logger'
import { changePasswordReducer, profileReducer, userReducer } from './Reducers/userReducer.js'
import { cartReducer } from "./Reducers/cartReducer";
const reducer = combineReducers({
  user: userReducer,
  products: productReducer,
  singleProduct: singleProductReducer,
  profile: profileReducer,
  changePassword: changePasswordReducer,
  cart: cartReducer,
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
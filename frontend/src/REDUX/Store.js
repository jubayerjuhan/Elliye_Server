import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { productReducer, singleProductReducer } from './Reducers/productReducers.js'
import logger from 'redux-logger'
import { profileReducer, userReducer } from './Reducers/userReducer.js'
const reducer = combineReducers({
  user: userReducer,
  products: productReducer,
  singleProduct: singleProductReducer,
  profile: profileReducer,
})
const initialState = {}
const middlewares = [thunk, logger]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middlewares)))

export default store;
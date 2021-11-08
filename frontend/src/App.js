import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Homepage from './PAGES/Homepage/Homepage.jsx';
import Navbar from './Components/Navbar/Navbar.jsx';
import Footer from "./Components/Footer/Footer";
import ProductDetail from './PAGES/Product Detail Page/ProductDetail.jsx';
import Products from './PAGES/Products/Products.jsx';
import Search from './Components/Search/Search.jsx';
import Login from './PAGES/Login/Login.jsx';
import Register from "./PAGES/Register/Register";
import { useEffect } from "react";
import store from './REDUX/Store.js';
import { loadUser } from './REDUX/Actions/userAction.js';
import { useSelector } from "react-redux";
import SpeedDial from './Components/Navbar/SpeedDial.jsx';
import MyProfile from './PAGES/MyProfile/MyProfile.jsx';
import Protectedroute from "./Components/ProtectedRoute/Protectedroute";
import EditProfile from "./PAGES/EditProfile/EditProfile";
import ChangePassword from "./PAGES/Change Password/ChangePassword";
import ForgetPassword from "./PAGES/ForgetPassword/ForgetPassword";
import PasswordReset from './PAGES/Password Reset/PasswordReset.jsx';
import Cart from "./PAGES/Cart/Cart";
import Shipping from "./PAGES/Shipping/Shipping";
import ConfirmOrder from './PAGES/Confirm Order/ConfirmOrder.jsx';
import Payment from "./PAGES/Payment/Payment";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { authAxios } from './Utils/Axios/axios.js';
import { useState } from 'react';
import OrderSuccess from './PAGES/Order Success/Ordersuccess';
import MyOrders from './PAGES/View All Orders/MyOrders.jsx';
import OrderDetails from './PAGES/OrderDetail/OrderDetail'


function App() {
  const [stripeKey, setStripeKey] = useState()
  const { isAuthenticated } = useSelector(state => state.user)
  useEffect(() => {
    store.dispatch(loadUser());
    const loadStripeKey = async () => {
      const { data } = await authAxios.get(`/api/v1/getStipePubKey`)
      setStripeKey(data.key)
    }
    loadStripeKey()
  }, [])
  console.log(stripeKey)
  return (
    <Router>
      <Navbar></Navbar>
      {isAuthenticated && <SpeedDial />}
      <Switch>
        <Route exact path='/' component={Homepage}></Route>
        <Route path='/product/:id' component={ProductDetail}></Route>
        <Route exact path='/products' component={Products}></Route>
        <Route path='/products/:keyword' component={Products}></Route>
        <Route exact path='/search' component={Search}></Route>
        <Route exact path='/login' component={Login}></Route>
        <Route exact path='/register' component={Register}></Route>
        <Route exact path='/forget-password' component={ForgetPassword}></Route>
        <Route exact path='/cart' component={Cart}></Route>
        <Route exact path='/password/reset/:resetToken' component={PasswordReset}></Route>
        <Protectedroute exact path='/account' component={MyProfile}></Protectedroute>
        <Protectedroute exact path='/profile/edit-profile' component={EditProfile}></Protectedroute>
        <Protectedroute exact path='/profile/change-password' component={ChangePassword}></Protectedroute>
        <Protectedroute exact path='/shipping' component={Shipping}></Protectedroute>
        <Protectedroute exact path='/order/confirmation' component={ConfirmOrder}></Protectedroute>
        <Protectedroute exact path='/order/success' component={OrderSuccess}></Protectedroute>
        <Protectedroute exact path='/orders' component={MyOrders}></Protectedroute>
        <Protectedroute exact path='/orders/:id' component={OrderDetails}></Protectedroute>
        {stripeKey &&
          <Elements stripe={loadStripe(stripeKey)}>
            <Protectedroute exact path='/order/payment' component={Payment}></Protectedroute>
          </Elements>
        }
        <Route path='*'>
          404 Not Found
        </Route>
      </Switch>
      <Footer />
    </Router >

  );
}

export default App;

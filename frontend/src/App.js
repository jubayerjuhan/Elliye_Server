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
import { Fragment, useEffect } from "react";
import store from './REDUX/Store.js';
import { loadUser } from './REDUX/Actions/userAction.js';
import { useSelector } from "react-redux";
import SpeedDial from './Components/Navbar/SpeedDial.jsx';
import MyProfile from './PAGES/MyProfile/MyProfile.jsx';
import Protectedroute from "./Components/ProtectedRoute/Protectedroute";
import EditProfile from "./PAGES/EditProfile/EditProfile";


function App() {
  const { isAuthenticated } = useSelector(state => state.user)
  useEffect(() => {
    store.dispatch(loadUser());
  }, [])
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
        <Protectedroute exact path='/account' component={MyProfile}></Protectedroute>
        <Protectedroute exact path='/profile/edit-profile' component={EditProfile}></Protectedroute>
        <Route path='*'>
          404 Not Found
        </Route>
      </Switch>
      <Footer />
    </Router >

  );
}

export default App;

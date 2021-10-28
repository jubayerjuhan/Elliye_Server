import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Homepage from './PAGES/Homepage/Homepage.jsx';
import Navbar from './Components/Navbar/Navbar.jsx';
import Footer from "./Components/Footer/Footer";
import ProductDetail from './PAGES/Product Detail Page/ProductDetail.jsx';


function App() {
  return (
    <Router>
      <Navbar></Navbar>
      <Switch>
        <Route exact path='/' component={Homepage}></Route>
        <Route path='/product/:id' component={ProductDetail}></Route>
        <Route path='*'>
          404 Not Found
        </Route>
      </Switch>
      <Footer />
    </Router >
  );
}

export default App;

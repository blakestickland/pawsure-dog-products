import './App.scss';
import "bootstrap/dist/css/bootstrap.min.css";

import Header from './containers/Header';
import Home from './containers/Home';
import ProductList from './containers/ProductList';
import Product from "./containers/Product";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/products/:id">
            <Product />
          </Route>
          <Route path="/products">
            <ProductList />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

import './App.scss';
import "bootstrap/dist/css/bootstrap.min.css";

import Header from './containers/Header';
import Product from "./containers/Product";
import ProductList from './containers/ProductList/ProductList';

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
          <Route>
            <h1>This is the home page.</h1>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

import './App.scss';
import "bootstrap/dist/css/bootstrap.min.css";

import Header from './containers/Header';
import Home from './containers/Home';
import ProductList from './containers/ProductList';
import Product from "./containers/Product";
import Favorites from './containers/Favorites';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProducts, updateProduct } from "./services/products";


function App() {
  // When page is loaded, retrieve the Products from Firestore
  // Store the data in the state "products"
  // Pass the state down the tree for use

  const [products, setProducts] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const populateProducts = async () => {
    const data = await getProducts();
    setProducts(data);
    console.log("populateProducts data, called in App.js: ", data);
  };

  useEffect(() => {
    populateProducts();
  }, []);

  const onAdd = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };

  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };

  // Toggle Favorite
  const toggleFavorite = async (product) => {
    const partial = {
      favorite: !product.favorite,
    };
    await updateProduct(product.id, partial);
    populateProducts();
  };

  return (
    <div className="App">
      <Router>
        <Header countCartItems={cartItems.length} />
        <Switch>
          <Route path="/featured">
            <Favorites />
          </Route>
          <Route path="/products/:id">
            <Product cartItems={cartItems} onAdd={onAdd} onRemove={onRemove} />
          </Route>
          <Route path="/products">
            <ProductList
              products={products}
              cartItems={cartItems}
              onAdd={onAdd}
              onRemove={onRemove}
              toggleFavorite={toggleFavorite}
              populateProducts={populateProducts}
            />
          </Route>
          <Route path="/">
            <Home products={products} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;

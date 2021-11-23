import { createContext } from "react";
import { useState, useEffect } from "react";

import { getProducts, updateProduct } from "../services/products";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [test, setTest] = useState({
    people: "Hello",
  });

  const populateProducts = async () => {
    const data = await getProducts();
    console.log("this is second");
    setProducts(data);
    console.log(
      "3rd populateProducts data, called in ProductsContext.js: ",
      data
    );
  };

  useEffect(() => {
    console.log("this is first");
    populateProducts();
    setTest({ people: "Goodbye" });
  }, []);

  const test2 = "This is test2 default test";

  // Toggle Favorite
  const toggleFavorite = async (product) => {
    const partial = {
      favorite: !product.favorite,
    };
    await updateProduct(product.id, partial);
    populateProducts();
  };

  return (
    // <ProductsContext.Provider value={ { test, setTest } }>
    <ProductsContext.Provider value={{ products, test, toggleFavorite }}>
      {children}
    </ProductsContext.Provider>
  );
}
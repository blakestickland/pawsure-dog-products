import { createContext } from "react";
import { useState, useEffect } from "react";
import { getProducts, updateProduct } from "../services/products";

export const ProductsContext = createContext();


export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const populateProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  useEffect(() => {
    populateProducts();
  }, []);

  const toggleFavorite = async (product) => {
    const partial = {
      favorite: !product.favorite,
    };
    await updateProduct(product.id, partial);
    populateProducts();
  };

  return (
    <ProductsContext.Provider value={{ products, toggleFavorite }}>
      {children}
    </ProductsContext.Provider>
  );
}
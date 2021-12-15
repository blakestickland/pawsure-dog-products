import styles from "./ProductList.module.scss";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import ProductCard from "../../components/ProductCard";
import Cart from "../../components/Cart";

import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";

import { ProductsContext } from "../../context/ProductsContext";

// const useQuery = () => {
//   const location = useLocation();
//   return new URLSearchParams(location.search);
// };

const ProductList = ({ cartItems, onAdd, onRemove }) => {

  const { products, toggleFavorite } = useContext(ProductsContext);

  const { search } = useContext(SearchContext);

  const searchResults = products.filter(product => 
      product.productName.includes(search) 
    );
    
    // const query = useQuery();
    // const name = query.get("name") ?? "";
    // const limit = query.get("limit")
    //     ? parseInt(query.get("limit"))
    //     : 10;
    
    // const filteredProducts = products.filter((product) => {
        //     return `${product.productName}
        //         ${product.productType}`
        //         .includes(name);
        // }).slice(0, limit);

        // const [products, setProducts] = useState(null);
        useEffect(() => {
          console.log("cartItems from ProductList page: ", cartItems);
        }, [cartItems])

    return (
      <Container className={styles.ProductList}>
        <div>
          {/* {filteredProducts.map((product, index) => (
            <ProductCard product={product} key={index} />
          ))} */}
          <Row xs={1} md={2} lg={3} className="mb-4">
            {products && searchResults &&
              searchResults.map((product, index) => (
                <Col key={index} className="d-flex justify-content-around">
                  <ProductCard
                    product={product}
                    key={product.id}
                    onAdd={onAdd}
                    toggleFavorite={toggleFavorite}
                  />
                </Col>
              ))}
          </Row>
          <Cart cartItems={cartItems} onAdd={onAdd} onRemove={onRemove} />
        </div>
      </Container>
    );
};

export default ProductList;

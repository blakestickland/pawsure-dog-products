import styles from "./ProductList.module.scss";
// import products from "../../services/products";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import Cart from "../../components/Cart";


// const useQuery = () => {
//   const location = useLocation();
//   return new URLSearchParams(location.search);
// };

const ProductCard = ({ product, onAdd }) => {
  return (
    <div className={styles.ProductCard}>
      <img src={product.image} alt={product.productName} width="100%" />
      <h4>{product.productName}</h4>
      <p>Size: {product.size[0]}</p>
      <p>Price: ${product.price[0]}</p>
      <p>
        <Link to={`/products/${product.id}`}>More details...</Link>
      </p>
      <div className="d-grid gap-2">
        <Button variant="primary" size="md" onClick={() => onAdd(product)}>
          Add To Cart
        </Button>
      </div>
    </div>
  );
};

const ProductList = ({ products, cartItems, onAdd, onRemove }) => {
    
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
          <Row xs={1} md={2} lg={3}>
            {products &&
              products.map((product, index) => (
                <Col key={index}>
                  <ProductCard
                    product={product}
                    key={product.id}
                    onAdd={onAdd}
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

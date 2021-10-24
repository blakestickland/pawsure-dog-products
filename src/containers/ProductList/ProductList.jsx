import styles from './ProductList.module.scss';
// import products from "../../services/products";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProducts } from "../../services/products";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";



// const useQuery = () => {
//   const location = useLocation();
//   return new URLSearchParams(location.search);
// };

const ProductCard = ({ product }) => {
  return (
    <div className={styles.ProductCard}>
      <img
        src={product.image}
        alt={product.productName}
        width="400"
        height="300"
      />
      <p>Size: {product.size}</p>
      <p>Price: ${product.price}</p>
      <p>Type: {product.productType}</p>
      <p>
        <Link to={`/products/${product.id}`}>Go to</Link>
      </p>
    </div>
  );
};

const ProductList = () => {
    
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

        const [products, setProducts] = useState(null);
        
        const populateProducts = async () => {
            const data = await getProducts();
            setProducts(data);
        };

        useEffect(() => {
            populateProducts();
        }, []);

    return (
      <Container className={styles.ProductList}>
        {/* // <div className={styles.ProductList}> */}
        {/* {filteredProducts.map((product, index) => (
            <ProductCard product={product} key={index} />
          ))} */}
        <Row xs={1} md={2} lg={3}>
          {products &&
            products.map((product, index) => (
              <Col>
                <ProductCard product={product} key={index} />
              </Col>
            ))}
        </Row>
        {/* // </div> */}
      </Container>
    );
};

export default ProductList;

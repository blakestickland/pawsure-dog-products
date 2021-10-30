import styles from "./ProductList.module.scss";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ToggleButton from "react-bootstrap/ToggleButton";
import Card from "react-bootstrap/Card";

import Cart from "../../components/Cart";

import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";

// const useQuery = () => {
//   const location = useLocation();
//   return new URLSearchParams(location.search);
// };

const ProductCard = ({ product, onAdd, toggleFavorite }) => {

  return (
    <Card className="text-center mb-3 rounded shadow-sm" style={{ width: "18rem" }}>
      {/* <Card.Header>Featured</Card.Header> */}
      <Card.Img variant="top" src={product.image}  style={{ height: "12rem" }} />
      <Card.Body>
        <Card.Title>{product.productName}</Card.Title>
        <Card.Text>Size: {product.size[0]}</Card.Text>
        <Card.Text>Price: ${product.price[0].toFixed(2)}</Card.Text>
        <Card.Text>
          <Link to={`/products/${product.id}`} style={{  textDecoration: "none" }}>More details &gt;</Link>
        </Card.Text>
        <ToggleButton
          className="mb-2"
          // id="toggle-check"
          type="checkbox"
          variant="outline-success"
          checked={product.favorite}
          onClick={() => toggleFavorite(product)}
        >
          {product.favorite ? "Favorited" : "Add to Favorites"}
          {/* Favorite */}
        </ToggleButton>
        <Button variant="primary" size="md" onClick={() => onAdd(product)} className="w-100">
          Add To Cart
        </Button>
      </Card.Body>
      {/* <Card.Footer className="text-muted">2 days ago</Card.Footer> */}
    </Card>
  );
};

const ProductList = ({ products, cartItems, onAdd, onRemove, toggleFavorite, populateProducts }) => {
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
            {searchResults &&
              searchResults.map((product, index) => (
                <Col key={index} className="d-flex justify-content-around">
                  <ProductCard
                    product={product}
                    key={product.id}
                    onAdd={onAdd}
                    toggleFavorite={toggleFavorite}
                    populateProducts={populateProducts}
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

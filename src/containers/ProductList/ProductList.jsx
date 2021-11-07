import styles from "./ProductList.module.scss";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ToggleButton from "react-bootstrap/ToggleButton";
import Card from "react-bootstrap/Card";

import { useContext } from "react";
import { Context, CartState } from "../../context/Context";

import { updateProduct } from "../../services/products";

const ProductCard = ({ product, toggleFavorite }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const {
    state: { cart },
    dispatch,
  } = CartState();

  return (
    <Card
      className="text-center mb-3 rounded shadow-sm"
      style={{ width: "18rem" }}
    >
      <Card.Img variant="top" src={product.image} style={{ height: "12rem" }} />
      <Card.Body>
        <Card.Title>{product.productName}</Card.Title>
        <Card.Text>Size: {product.size[0]}</Card.Text>
        <Card.Text>Price: ${product.price[0].toFixed(2)}</Card.Text>
        <Card.Text>
          <Link
            to={`/products/${product.id}`}
            style={{ textDecoration: "none" }}
          >
            More details &gt;
          </Link>
        </Card.Text>
        <ToggleButton
          className="mb-2"
          // id="toggle-check"
          type="checkbox"
          variant="outline-info"
          checked={product.favorite}
          onClick={() => toggleFavorite(product)}
        >
          {product.favorite ? "Favorited" : "Add to Favorites"}
          {/* Favorite */}
        </ToggleButton>
        {cart.some((p) => p.id === product.id) ? (
          <Button
            variant="danger"
            className="w-100"
            onClick={() => {
              dispatch({
                type: "REMOVE_FROM_CART",
                payload: product,
              });
            }}
          >
            Remove from Cart
          </Button>
        ) : (
          <Button
            variant="primary"
            size="md"
            // onClick={() => onAdd(product)}
            onClick={() => {
              dispatch({
                type: "ADD_TO_CART",
                payload: product,
              });
            }}
            className="w-100"
            disabled={!product.stock} // this will disable the button if no stock left
          >
            {!product.stock ? "Out of Stock" : "Add To Cart"}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

const ProductList = ({ cartItems, onAdd, onRemove }) => {
  const { search } = useContext(Context);
  const {
    state: { products, cart }, populateProducts
  } = CartState();

  console.log("products in ProducList.jsx functional component: ", products);
  console.log("cart in ProducList.jsx functional component: ", cart);

  const searchResults = products.filter((product) =>
    product.productName.includes(search)
  );

  // const populateProducts = async () => {
  //   const productData = await getProducts();
  //   state.products = productData;
  // };

  // Toggle Favorite -- this updates the favorite field but does not re-render page
  const toggleFavorite = async (product) => {
    const partial = {
      favorite: !product.favorite,
    };
    await updateProduct(product.id, partial);
    populateProducts();
  };

  return (
    <Container className={styles.ProductList}>
      <div>
        <Row xs={1} md={2} lg={3} className="mb-4">
          {searchResults &&
            searchResults.map((product, index) => (
              <Col key={index} className="d-flex justify-content-around">
                <ProductCard
                  product={product}
                  key={product.id}
                  onAdd={onAdd}
                  toggleFavorite={toggleFavorite}
                  // populateProducts={populateProducts}
                />
              </Col>
            ))}
        </Row>
      </div>
    </Container>
  );
};

export default ProductList;

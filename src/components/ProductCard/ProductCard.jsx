import styles from "./ProductCard.module.scss";
import { Link, useLocation } from "react-router-dom";

import Button from "react-bootstrap/Button";
import ToggleButton from "react-bootstrap/ToggleButton";
import Card from "react-bootstrap/Card";


const ProductCard = ({ product, onAdd, toggleFavorite }) => {
  return (
    <Card
      className="text-center mb-3 rounded shadow-sm"
      style={{ width: "18rem" }}
    >
      {/* <Card.Header>Featured</Card.Header> */}
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
        <Button
          variant="primary"
          size="md"
          onClick={() => onAdd(product)}
          className="w-100"
        >
          Add To Cart
        </Button>
      </Card.Body>
      {/* <Card.Footer className="text-muted">2 days ago</Card.Footer> */}
    </Card>
  );
};

export default ProductCard

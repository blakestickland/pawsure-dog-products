import style from "./Product.module.scss";
import { useParams } from "react-router"; // This might be "react-router-dom"
import { getCartItems, createCartItem, updateCartItem } from "../../services/cart";
import { findProduct, updateProduct } from "../../services/products";
import { useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import ToggleButton from "react-bootstrap/ToggleButton";
import { Row, Col } from "react-bootstrap";

import { ProductsContext } from "../../context/ProductsContext";

const Product = ({ cartItems, onAdd, onRemove }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [sizeState, setSizeState] = useState("small");
  const [priceState, setPriceState] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { products, toggleFavorite } = useContext(ProductsContext);


  const productContext = products.find((product) => {
      return product.id === id;
  });
  
  const populateProduct = async () => {
    const data =  await productContext;
    if (!data) {
      return <h2>Product with Id: {id} not found.</h2>;
    } else {
      console.log("productContext: ", products, id, productContext);
      setProduct(data);
      setSelectedProduct({ ...data, size: data.size[0], price: data.price[0] });
      setPriceState(data.price[0].toFixed(2));
    }
  };

  useEffect(() => {
    populateProduct();
  }, [id, products]);

  useEffect(() => {
    if (selectedProduct) {
      switch (sizeState) {
        case product.size[0]:
          setPriceState(product.price[0].toFixed(2));
          setSelectedProduct({
            ...selectedProduct,
            size: sizeState,
            price: product.price[0],
          });
          break;
        case product.size[1]:
          setPriceState(product.price[1].toFixed(2));
          setSelectedProduct({
            ...selectedProduct,
            size: sizeState,
            price: product.price[1],
          });
          break;
        case product.size[2]:
          setPriceState(product.price[2].toFixed(2));
          setSelectedProduct({
            ...selectedProduct,
            size: sizeState,
            price: product.price[2],
          });
          break;

        default:
          break;
      }
    }
  }, [sizeState, product]);

  if (!product) {
    return <h2>Product with Id: {id} not found.</h2>;
  }

  const handleSizeStateSelection = (event) => {
    event.preventDefault();
    setSizeState(event.target.value);
  };

  return (
    <>
      <Container className={style.Product}>
        <img
          src={product.image}
          alt={product.productName}
          width="100%"
          height="300px"
          className={style.Product__img}
        />
        <h2>{product.productName}</h2>
        <div>
          <Row className="mb-2">
            <Col className="d-flex justify-content-center">
              <Form.Label column sm="2" className="px-3">
                Size:
              </Form.Label>
              <div className={style.Product__selector}>
                <Form.Select
                  aria-label="Select size of product"
                  onChange={handleSizeStateSelection}
                >
                  {product.size &&
                    product.size.map((size, index) => (
                      <option value={size} key={index}>
                        {size}
                      </option>
                    ))}
                </Form.Select>
              </div>
            </Col>
          </Row>
        </div>
        <p>Price: ${priceState}</p>
        <p>Type: {product.productType}</p>
        <p>Stock Amount: {product.stock}</p>
        <ToggleButton
          className="mb-2"
          // id="toggle-check"
          type="checkbox"
          variant="outline-success"
          checked={product.favorite}
          onClick={() => toggleFavorite(product)}
        >
          {product.favorite ? "Favorited" : "Add to Favorites"}
        </ToggleButton>
        <Button
          variant="primary"
          size="md"
          onClick={() => onAdd(selectedProduct)}
        >
          Add To Cart
        </Button>
      </Container>
      <Container>
        <Cart cartItems={cartItems} onAdd={onAdd} onRemove={onRemove} />
      </Container>
    </>
  );
};

export default Product;

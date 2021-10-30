import style from "./Product.module.scss";
import { useParams } from "react-router"; // This might be "react-router-dom"
import { findProduct } from "../../services/products";
import Cart from "../../components/Cart";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import ToggleButton from "react-bootstrap/ToggleButton";

const Product = ({ cartItems, onAdd, onRemove, toggleFavorite }) => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [sizeState, setSizeState] = useState("small");
    const [priceState, setPriceState] = useState(10);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // const product = products.find((product) => {
    //     return product.id === parseInt(id);
    // })

    useEffect(() => {
        const populateProduct = async () => {
            const data = await findProduct(id);
            setProduct(data);
            setSelectedProduct({...data, size: data.size[0], price: data.price[0]});
        };
        populateProduct();
    }, [id])
    
  useEffect(() => {
    if (selectedProduct) {
      switch (sizeState) {
        case product.size[0]:
          setPriceState(product.price[0]);
          setSelectedProduct({
            ...selectedProduct,
            size: sizeState,
            price: product.price[0],
          });
          break;
          case product.size[1]:
            setPriceState(product.price[1]);
            setSelectedProduct({
              ...selectedProduct,
              size: sizeState,
              price: product.price[1],
            });
            break;
            case product.size[2]:
              setPriceState(product.price[2]);
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
      return <h2>Product with Id: { id } not found.</h2>
  };

  const handleSizeStateSelection = (event) => {
    event.preventDefault();
    setSizeState(event.target.value);
  };

  return (
    <>
      <Card
        className="text-center mb-3 rounded shadow-sm"
        style={{ width: "18rem" }}
      >
        {/* <Card.Header>Featured</Card.Header> */}
        <Card.Img
          variant="top"
          src={product.image}
          // style={{ height: "12rem" }}
        />
        <Card.Body>
          <Card.Title>{product.productName}</Card.Title>
          <Card.Text>Size: {product.size[0]}</Card.Text>
          <Card.Text>Price: ${product.price[0].toFixed(2)}</Card.Text>
          <Card.Text>
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
      <Container className={style.Product}>
        <h2>
          {product.productName} [{product.productType}]
        </h2>
        <img
          src={product.image}
          alt={product.productName}
          width="100%"
          height="300px"
        />
        <p>size: {sizeState}</p>
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
        <p>Price: ${priceState}</p>
        <p>Type: {product.productType}</p>
        <div className="d-grid gap-2">
          <Button
            variant="primary"
            size="md"
            onClick={() => onAdd(selectedProduct)}
          >
            Add To Cart
          </Button>
        </div>
      </Container>
      <Container>
        <Cart cartItems={cartItems} onAdd={onAdd} onRemove={onRemove} />
      </Container>
    </>
  );
};

export default Product;

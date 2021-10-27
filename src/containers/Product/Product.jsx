import style from "./Product.module.scss";
import { useParams } from "react-router"; // This might be "react-router-dom"
import { findProduct } from "../../services/products";
import Cart from "../../components/Cart";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

const Product = ({ cartItems, onAdd, onRemove }) => {
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
            setSelectedProduct(data);
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
          <Button variant="primary" size="md" onClick={() => onAdd(selectedProduct)}>
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

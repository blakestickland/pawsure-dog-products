import styles from "./Product.module.scss";
import { useParams } from "react-router"; // This might be "react-router-dom"
import { findProduct } from "../../services/products";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";


const Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [size, setSize] = useState("small");
    const [priceState, setPriceState] = useState(10);

    // const product = products.find((product) => {
    //     return product.id === parseInt(id);
    // })

    useEffect(() => {
        const populateProduct = async () => {
            const data = await findProduct(id);
            setProduct(data);
        };
        populateProduct();
    }, [id])
    
    useEffect(() => {
      if (product) {
        console.log(product.price);
        switch (size) {
          case product.size[0]:
            setPriceState(product.price[0]);
            break;
          case product.size[1]:
            setPriceState(product.price[1]);
            break;
          case product.size[2]:
            setPriceState(product.price[2]);
            break;

          default:
            break;
        }
      }
    }, [size, product]);

    if (!product) {
        return <h2>Product with Id: { id } not found.</h2>
    }

    const handleSizeSelection = (event) => {
      event.preventDefault();
      setSize(event.target.value);
    }

  return (
    <Container className={styles}>
      <h2>
        {product.productName} [{product.productType}]
      </h2>
      <img
        src={product.image}
        alt={product.productName}
        width="400"
        height="300"
      />
      <p>Size: {product.size[0]}</p>
      <Form.Select
        aria-label="Select size of product"
        onChange={handleSizeSelection}
      >
        {product.size &&
          product.size.map((size, index) => (
            <option value={size} key={index}>
              {size}
            </option>
          ))}
      </Form.Select>
      <p>Price: ${priceState}</p>
      <p>Type: {product.productType}</p>
    </Container>
  );
};

export default Product;

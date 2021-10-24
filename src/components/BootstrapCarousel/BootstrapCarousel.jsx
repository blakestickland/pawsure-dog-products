import { useState, useEffect } from "react";
import { getProducts } from "../../services/products";
import "bootstrap/dist/css/bootstrap.css";
import Carousel from "react-bootstrap/Carousel";
import styles from "./BootstrapCarousel.module.scss";


const BootstrapCarousel = ({ product }) => {
  const [products, setProducts] = useState(null);

  const populateProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  useEffect(() => {
    populateProducts();
  }, []);

  return (
    <Carousel className={styles}>
        {products &&
            products.map((product, index) => (
            <Carousel.Item interval={2500} key={index}>
                <img
                className="d-block w-100"
                src={product.image}
                alt={product.productName}
                />
                <Carousel.Caption>
                <h3>{product.productName}</h3>
                <p>{product.productType}</p>
                </Carousel.Caption>
            </Carousel.Item>
        ))}
    </Carousel>
  );
};

export default BootstrapCarousel;

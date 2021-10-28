import "bootstrap/dist/css/bootstrap.css";
import Carousel from "react-bootstrap/Carousel";
import styles from "./BootstrapCarousel.module.scss";


const BootstrapCarousel = ({products}) => {
  // filter out the products for .featured=true
  // feed the filtered results into the Carousel.
  // need to wait for products to be returned from API call so, lazy evaluation used.
  const featuredProducts = (products && products.filter((product) => product.featured));
  

  return (
    <Carousel className={styles}>
      {featuredProducts &&
        featuredProducts.map((product, index) => (
          <Carousel.Item interval={2500} key={index}>
            <img
              className="d-block w-100"
              src={product.image}
              alt={product.productName}
            />
            <Carousel.Caption>
              <h3>{product.productName}</h3>
              <p>{product.type}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
    </Carousel>
  );
};

export default BootstrapCarousel;

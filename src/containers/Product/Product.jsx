import styles from "./Product.module.scss";
import { useParams } from "react-router"; // This might be "react-router-dom"
import products from "../../services/products";

const Product = () => {
    const { id } = useParams();
    const product = products.find((product) => {
        return product.id === parseInt(id);
    })
    if (!product) {
        return <h2>Product with Id: { id} not found.</h2>
    }

  return (
    <div className={styles}>
      <h2>
          {product.productName} [{product.productType}]
      </h2>
      <p>Size: {product.size}</p>
      <p>Price: ${product.price}</p>
      <p>Type: {product.productType}</p>
    </div>
  );
};

export default Product;

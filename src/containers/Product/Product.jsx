import styles from "./Product.module.scss";
import { useParams } from "react-router"; // This might be "react-router-dom"
import { findProduct } from "../../services/products";
import { useState, useEffect } from "react";

const Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

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

    if (!product) {
        return <h2>Product with Id: { id } not found.</h2>
    };

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

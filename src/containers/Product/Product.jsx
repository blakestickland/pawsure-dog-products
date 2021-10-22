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
    // let prepImage = product.image.slice(5);
    // let image = 
    //     "https://firebasestorage.googleapis.com/v0/b/" +
    //     prepImage +
    //     product.mediaToken;

  return (
    <div className={styles}>
      <h2>
        {product.productName} [{product.productType}]
      </h2>
      <img
        // href="https://firebasestorage.googleapis.com/v0/b/pawsure-firestore.appspot.com/o/images%2Fchicken-jerky-100g.JPG?alt=media&token=9ebd8ab2-2b83-4637-8027-5cda5ffd38c6"
        src={product.image}
        alt={product.productName}
        width="400"
        height="300"
      />
      <p>Size: {product.size}</p>
      <p>Price: ${product.price}</p>
      <p>Type: {product.productType}</p>
    </div>
  );
};

export default Product;

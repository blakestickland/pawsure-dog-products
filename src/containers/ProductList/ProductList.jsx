import styles from './ProductList.module.scss';
// import products from "../../services/products";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProducts } from "../../services/products";


// const useQuery = () => {
//   const location = useLocation();
//   return new URLSearchParams(location.search);
// };

const ProductCard = ({ product }) => {
  return (
    <div className={styles.ProductCard}>
      <p>ID: {product.id}</p>
      <p>
        Name: {product.productName}
      </p>
      <p>
        <Link to={`/products/${product.id}`}>Go to</Link>
      </p>
    </div>
  );
};

const ProductList = () => {
    
    // const query = useQuery();
    // const name = query.get("name") ?? "";
    // const limit = query.get("limit")
    //     ? parseInt(query.get("limit"))
    //     : 10;
    
    // const filteredProducts = products.filter((product) => {
        //     return `${product.productName}
        //         ${product.productType}`
        //         .includes(name);
        // }).slice(0, limit);

        const [products, setProducts] = useState(null);
        
        const populateProducts = async () => {
            const data = await getProducts();
            setProducts(data);
        };

        useEffect(() => {
            populateProducts();
        }, []);

    return (
      <div className={styles.ProductList}>
        {/* {filteredProducts.map((product, index) => (
          <ProductCard product={product} key={index} />
        ))} */}
        {products && 
        products.map((product, index) => (
            <ProductCard 
                product={product}
                key={index}
            />
        ))};
      </div>
    );
};

export default ProductList;

import styles from "./Home.module.scss";
import BootstrapCarousel from "../../components/BootstrapCarousel";
import { useContext } from "react";
import { ProductsContext } from "../../context/ProductsContext";

const Home = () => {
  const { products } = useContext(ProductsContext);

    return (
      <div className={styles}>
        <BootstrapCarousel products={products} />
      </div>
    );
}

export default Home

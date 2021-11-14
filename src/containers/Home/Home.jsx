import styles from "./Home.module.scss";
import BootstrapCarousel from "../../components/BootstrapCarousel";
import { CartState } from "../../context/Context";

const Home = () => {
  const {
    state: { products },
  } = CartState();

  return (
    <div className={styles}>
      <BootstrapCarousel products={products}/>
    </div>
  );
}

export default Home

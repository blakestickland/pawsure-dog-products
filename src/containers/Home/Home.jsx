import styles from "./Home.module.scss";
import BootstrapCarousel from "../../components/BootstrapCarousel";

const Home = ({products}) => {
          console.log(("products from Home page: ", products));

    return (
      <div className={styles}>
        <BootstrapCarousel products={products}/>
      </div>
    );
}

export default Home

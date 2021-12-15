import styles from "./Home.module.scss";
import BootstrapCarousel from "../../components/BootstrapCarousel";

const Home = () => {
    return (
      <div className={styles}>
        <BootstrapCarousel />
      </div>
    );
}

export default Home

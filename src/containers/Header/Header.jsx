import Navigation from "../../components/Nav";
import styles from "./Header.module.scss";

const Header = () => {
    return (
      <div className={styles.Header}>
        <img src="https://firebasestorage.googleapis.com/v0/b/pawsure-firestore.appspot.com/o/images%2Fpawsure_logo.jpeg?alt=media&token=43254094-2228-44e1-9bfb-10acb024d882" alt="Pawsure company logo" />
        <Navigation />
      </div>
    );
};

export default Header;

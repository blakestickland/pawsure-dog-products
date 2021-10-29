import Navigation from "../../components/Nav";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import  Container  from "react-bootstrap/Container";


const Header = ({ countCartItems }) => {
    return (
      <Container>

      <div className={styles.Header}>
        <Link to="/">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/pawsure-firestore.appspot.com/o/images%2Fpawsure_logo.jpeg?alt=media&token=43254094-2228-44e1-9bfb-10acb024d882"
            alt="Pawsure company logo"
            className={styles.Header__img}
          />
        </Link>
        <div className={styles.Header__Navigation}>
          <Navigation />
        </div>
        <div className={styles.Header__cartDiv}>
          Cart{" "}
          {countCartItems ? (
            <button className="badge">{countCartItems}</button>
          ) : (
            ""
          )}
        </div>
      </div>
      </Container>
    );
};

export default Header;

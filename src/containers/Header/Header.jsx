import Navigation from "../../components/Nav";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import  Container  from "react-bootstrap/Container";
import { CartState } from "../../context/Context";


const Header = ({ countCartItems }) => {

  const {
    state: { cart }
  } = CartState();

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
          <Link to="/cart">
            <i className="fas fa-shopping-cart fa-lg text-info"></i>{" "}
            {/* {countCartItems ? (
              <button className="badge">{countCartItems}</button>
            ) : (
              ""
            )} */}
            {cart.length > 0 ? (
              <button className="badge">{cart.length}</button>
            ) : (
              ""
            )}
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default Header;
